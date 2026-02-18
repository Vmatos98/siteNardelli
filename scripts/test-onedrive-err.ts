import { getAccessToken } from '../src/lib/onedrive';

async function testFilter() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        console.error("No access token");
        return;
    }

    const folderId = '9965AD22FCE819D3!sf7cb5b0a48de447696e46da3d4eaf0e7'; // From user error

    // Test 1: With Filter (Current implementation)
    console.log("Testing WITH filter...");
    const filter = 'image ne null or video ne null';
    const query = new URLSearchParams({
        '$select': 'id,name,image,video',
        '$top': '10',
        '$filter': filter
    });
    const urlWithFilter = `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children?${query.toString()}`;

    try {
        const res = await fetch(urlWithFilter, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (!res.ok) {
            console.error("❌ Filter Test Failed:", res.status, await res.text());
        } else {
            console.log("✅ Filter Test Success");
        }
    } catch (e) { console.error(e); }

    // Test 2: Without Filter
    console.log("\nTesting WITHOUT filter...");
    const queryNoFilter = new URLSearchParams({
        '$select': 'id,name,image,video',
        '$top': '10'
    });
    const urlNoFilter = `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children?${queryNoFilter.toString()}`;

    try {
        const res = await fetch(urlNoFilter, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (!res.ok) {
            console.error("❌ No-Filter Test Failed:", res.status, await res.text());
        } else {
            console.log("✅ No-Filter Test Success");
        }
    } catch (e) { console.error(e); }
}

testFilter();
