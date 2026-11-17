import { NextResponse } from 'next/server';
import { getAllOneDrivePhotos } from '@/app/estrutura/actions';

// Revalidar cache a cada 1 hora
export const revalidate = 3600;

export async function GET() {
  try {
    const photos = await getAllOneDrivePhotos();
    return NextResponse.json(photos, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar fotos da estrutura para API:', error);
    return NextResponse.json([], { status: 500 });
  }
}
