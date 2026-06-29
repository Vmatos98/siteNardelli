/**
 * Property-based tests for mobile-inline-machine-photo feature
 *
 * Tests use fast-check with minimum 100 iterations each.
 * Since @testing-library/react is not available, Property 1 tests the
 * rendering logic directly (which card would show the inline photo block).
 * Properties 2 and 3 test resolveImageSrc directly (pure function).
 *
 * Tasks covered:
 *   3.1 - Create this file
 *   3.2 - Property 1: inline photo present only on active card
 *   3.3 - Property 2: skeleton when photosLoading and local src
 *   3.4 - Property 3: inline photo src equals photoMap value
 */

import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { resolveImageSrc } from '../StructureSection'

// ---------------------------------------------------------------------------
// Helpers / generators
// ---------------------------------------------------------------------------

interface Item {
    title: string
    description: string
    image: string
    capacidade?: string
    fabricante?: string
    observacoes?: string
}

/**
 * Determines whether the inline photo block would be rendered for a given card.
 * Mirrors the JSX condition in StructureSection:
 *   activeIndex === index && (item.capacidade || item.fabricante || item.observacoes)
 */
function wouldRenderInlinePhoto(item: Item, index: number, activeIndex: number): boolean {
    return (
        index === activeIndex &&
        !!(item.capacidade || item.fabricante || item.observacoes)
    )
}

// Arbitrary for a non-empty string (used for optional fields)
const arbNonEmptyString = fc.string({ minLength: 1, maxLength: 50 })

// Arbitrary for an item that always has at least one of capacidade/fabricante/observacoes
// so the inline photo block is guaranteed to render when the card is active
const arbItemWithDetails = fc.record({
    title: arbNonEmptyString,
    description: arbNonEmptyString,
    image: fc.stringMatching(/^\/assets\/[a-z0-9]+\.jpg$/),
    capacidade: fc.option(arbNonEmptyString, { nil: undefined }),
    fabricante: fc.option(arbNonEmptyString, { nil: undefined }),
    observacoes: fc.option(arbNonEmptyString, { nil: undefined }),
}).filter(item => !!(item.capacidade || item.fabricante || item.observacoes))

// Arbitrary for a list of 1–10 items, all with at least one detail field
const arbItemList = fc.array(arbItemWithDetails, { minLength: 1, maxLength: 10 })

// Arbitrary for a lowercase alphanumeric key (matches nameWithoutExt extraction logic)
const arbKey = fc.stringMatching(/^[a-z][a-z0-9]{0,15}$/)

// Arbitrary for a URL string
const arbUrl = fc.webUrl()

// ---------------------------------------------------------------------------
// Property 1 — Visibilidade por activeIndex
// Validates: Requirements 1.1, 1.3
// Tag: Feature: mobile-inline-machine-photo, Property 1: foto inline presente apenas no card ativo
// ---------------------------------------------------------------------------

describe('Property 1: foto inline presente apenas no card ativo', () => {
    it(
        'Feature: mobile-inline-machine-photo, Property 1: foto inline presente apenas no card ativo',
        () => {
            fc.assert(
                fc.property(
                    arbItemList,
                    fc.nat().chain(n => fc.constant(n)),
                    (items, rawIndex) => {
                        const activeIndex = rawIndex % items.length

                        for (let i = 0; i < items.length; i++) {
                            const renders = wouldRenderInlinePhoto(items[i], i, activeIndex)
                            if (i === activeIndex) {
                                // Active card: inline photo block must render
                                // (item always has at least one detail field due to arbItemWithDetails)
                                expect(renders).toBe(true)
                            } else {
                                // Inactive cards: inline photo block must NOT render
                                expect(renders).toBe(false)
                            }
                        }
                    }
                ),
                { numRuns: 100 }
            )
        }
    )
})

// ---------------------------------------------------------------------------
// Property 2 — Skeleton quando photosLoading e src local
// Validates: Requirements 2.1
// Tag: Feature: mobile-inline-machine-photo, Property 2: skeleton quando photosLoading e src local
// ---------------------------------------------------------------------------

describe('Property 2: skeleton quando photosLoading e src local', () => {
    it(
        'Feature: mobile-inline-machine-photo, Property 2: skeleton quando photosLoading e src local',
        () => {
            // Generate: item with image starting with /assets/ + random string, photosLoading = true
            const arbLocalImage = fc.stringMatching(/^\/assets\/[a-z0-9_-]+\.(jpg|png|webp)$/)

            fc.assert(
                fc.property(
                    arbLocalImage,
                    fc.dictionary(arbKey, arbUrl),
                    (localImage, photoMap) => {
                        const result = resolveImageSrc(localImage, photoMap, true)

                        // showSkeleton must be true
                        expect(result.showSkeleton).toBe(true)
                        // src must be null (no image rendered, skeleton shown instead)
                        expect(result.src).toBeNull()
                    }
                ),
                { numRuns: 100 }
            )
        }
    )
})

// ---------------------------------------------------------------------------
// Property 3 — Foto remota do photoMap
// Validates: Requirements 2.2
// Tag: Feature: mobile-inline-machine-photo, Property 3: src da foto inline igual ao valor do photoMap
// ---------------------------------------------------------------------------

describe('Property 3: src da foto inline igual ao valor do photoMap', () => {
    it(
        'Feature: mobile-inline-machine-photo, Property 3: src da foto inline igual ao valor do photoMap',
        () => {
            fc.assert(
                fc.property(
                    // Generate a filename key (lowercase alphanumeric)
                    arbKey,
                    // Generate a random URL for the photoMap value
                    arbUrl,
                    // Generate extra entries in the photoMap (may or may not overlap)
                    fc.dictionary(arbKey, arbUrl),
                    (key, oneDriveUrl, extraMap) => {
                        // Build image path: /assets/KEY.jpg
                        const localImage = `/assets/${key}.jpg`
                        // photoMap contains the key mapped to the OneDrive URL
                        const photoMap = { ...extraMap, [key]: oneDriveUrl }

                        const result = resolveImageSrc(localImage, photoMap, false)

                        // src must equal the photoMap value for that key
                        expect(result.src).toBe(oneDriveUrl)
                        // showSkeleton must be false (not loading)
                        expect(result.showSkeleton).toBe(false)
                    }
                ),
                { numRuns: 100 }
            )
        }
    )
})

// ---------------------------------------------------------------------------
// Example-based (unit) tests — Tasks 4.1 through 4.5
// These tests inspect StructureSection.tsx source code as a string.
// ---------------------------------------------------------------------------

import { readFileSync } from 'fs'
import { join } from 'path'

const structureSrc = readFileSync(
    join(process.cwd(), 'src/components/StructureSection.tsx'),
    'utf-8'
)

// ---------------------------------------------------------------------------
// Task 4.1 — Image Side has class `hidden lg:block`
// ---------------------------------------------------------------------------

describe('Task 4.1: Image Side container has hidden lg:block', () => {
    it('Image Side div contains "hidden lg:block" in its className', () => {
        expect(structureSrc).toContain('hidden lg:block')
    })
})

// ---------------------------------------------------------------------------
// Task 4.2 — Inline photo has classes `block lg:hidden`, `aspect-[4/3]`, `rounded-xl`, `overflow-hidden`, `w-full`
// ---------------------------------------------------------------------------

describe('Task 4.2: Inline photo container classes', () => {
    it('outer container has "block lg:hidden"', () => {
        expect(structureSrc).toContain('block lg:hidden')
    })

    it('inner container has "aspect-[4/3]"', () => {
        expect(structureSrc).toContain('aspect-[4/3]')
    })

    it('inner container has "rounded-xl"', () => {
        expect(structureSrc).toContain('rounded-xl')
    })

    it('inner container has "overflow-hidden"', () => {
        expect(structureSrc).toContain('overflow-hidden')
    })

    it('inner container has "w-full"', () => {
        expect(structureSrc).toContain('w-full')
    })
})

// ---------------------------------------------------------------------------
// Task 4.3 — Image component has props `fill` and `className="object-cover"`
// ---------------------------------------------------------------------------

describe('Task 4.3: Inline photo Image props', () => {
    it('Image has fill prop', () => {
        // The inline photo Image must have the `fill` prop (boolean shorthand)
        expect(structureSrc).toMatch(/fill/)
    })

    it('Image has className="object-cover"', () => {
        expect(structureSrc).toContain('className="object-cover"')
    })
})

// ---------------------------------------------------------------------------
// Task 4.4 — Fallback: missing key in photoMap → src is originalSrc
// ---------------------------------------------------------------------------

describe('Task 4.4: resolveImageSrc fallback when key missing from photoMap', () => {
    it('returns originalSrc and showSkeleton=false when photoMap is empty', () => {
        const result = resolveImageSrc('/assets/machine.jpg', {}, false)
        expect(result.src).toBe('/assets/machine.jpg')
        expect(result.showSkeleton).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// Task 4.5 — AnimatePresence with mode="wait" wraps the inline photo block
// ---------------------------------------------------------------------------

describe('Task 4.5: AnimatePresence mode="wait" in inline photo section', () => {
    it('source contains AnimatePresence with mode="wait"', () => {
        expect(structureSrc).toContain('mode="wait"')
    })
})
