
import * as dotenv from 'dotenv';
import { getAlbums } from '../src/lib/onedrive';
import path from 'path';

// Load env from .env file in root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
    console.log('Fetching OneDrive folders (Authenticated)...');

    // Check for new env vars
    const required = ['MS_CLIENT_ID', 'MS_CLIENT_SECRET', 'MS_REFRESH_TOKEN', 'MS_GALLERY_FOLDER_ID'];
    const missing = required.filter(k => !process.env[k]);

    if (missing.length > 0) {
        console.error('❌ Missing environment variables:', missing.join(', '));
        return;
    }


    try {
        const folders = await getAlbums();

        if (folders.length === 0) {
            console.log('No folders found or error occurred (check logs).');
        } else {
            console.log('\nFound Folders:');
            folders.forEach(folder => {
                console.log(`📁 ${folder.title} (Items: ${folder.itemsCount})`);
                console.log(`   ID: ${folder.id}`);
                console.log('---');
            });
        }


    } catch (error) {
        console.error('Error:', error);
    }
}

main();
