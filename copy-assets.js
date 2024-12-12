import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.resolve(__dirname, '笔记');
const TARGET_DIR = path.resolve(__dirname, '.vitepress/dist/笔记');

async function copyAssets(srcDir, destDir) {
  try {
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else if (entry.isFile() && (entry.name.endsWith('.pdf') || entry.name.endsWith('.html'))) {
        await fs.ensureDir(destDir);
        await fs.copyFile(srcPath, destPath);
        console.log(`Copied: ${srcPath} -> ${destPath}`);
      }
    }
  } catch (err) {
    console.error(`Error copying assets: ${err}`);
  }
}

copyAssets(SOURCE_DIR, TARGET_DIR);
