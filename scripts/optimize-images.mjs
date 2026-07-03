import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToOptimize = [
  '../src/assets/welcome.png',
  '../src/assets/wedding.png',
  '../src/assets/brunch.png',
  '../src/assets/Skyline firenze.PNG',
  '../src/assets/stickers.png',
  '../src/assets/savethedatenuovo-poster.png',
  '../src/assets/hotels/helvetia.jpg',
  '../src/assets/hotels/santamarianovella.jpg',
  '../src/assets/hotels/vecchietti.jpg',
  '../src/assets/hotels/garibaldiblu.jpg',
];

async function optimize() {
  for (const relPath of imagesToOptimize) {
    const fullPath = path.resolve(__dirname, relPath);
    try {
      await fs.access(fullPath);
      const parsed = path.parse(fullPath);
      const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
      
      console.log(`Converting ${path.basename(fullPath)} to WebP...`);
      await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
      
      console.log(`Deleting ${path.basename(fullPath)}...`);
      await fs.unlink(fullPath);
    } catch (e) {
      console.error(`Error processing ${relPath}:`, e.message);
    }
  }
}

optimize();
