import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = './public';
const srcDir = './src';
const indexHtml = './index.html';

async function compressImages(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await compressImages(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const ext = path.extname(file);
      const webpPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
      
      console.log(`Compressing ${file}...`);
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(webpPath);
        fs.unlinkSync(fullPath);
      } catch (e) {
        console.error(`Failed to compress ${file}:`, e.message);
      }
    }
  }
}

function updateCodeReferences(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateCodeReferences(fullPath);
    } else if (/\.(tsx|ts|jsx|js|css)$/i.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/\.png|\.jpg|\.jpeg/gi, '.webp');
      
      if (/\.(tsx|jsx)$/i.test(file)) {
         content = content.replace(/<img(?=\s)/gi, '<img loading="lazy"');
         content = content.replace(/loading="lazy"\s*loading="lazy"/gi, 'loading="lazy"');
      }
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

async function main() {
  console.log('Starting optimization...');
  await compressImages(publicDir);
  
  console.log('Updating src directory references...');
  updateCodeReferences(srcDir);
  
  console.log('Updating index.html references...');
  if (fs.existsSync(indexHtml)) {
    let html = fs.readFileSync(indexHtml, 'utf8');
    html = html.replace(/\.png|\.jpg|\.jpeg/gi, '.webp');
    fs.writeFileSync(indexHtml, html);
  }
  
  console.log('Optimization complete!');
}

main();
