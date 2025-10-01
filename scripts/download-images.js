#!/usr/bin/env node

/**
 * Image Download Script for Duet Night Abyss Characters
 * Downloads character images from various sources
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const imageUrls = {
  // Add official image URLs here when available
  // 'calcharo': 'https://example.com/calcharo.png',
  // 'kalka': 'https://example.com/kalka.png',
  // ... etc
};

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  const charactersDir = path.join(__dirname, '../public/characters');
  const splashDir = path.join(__dirname, '../public/characters/splash');
  
  // Ensure directories exist
  if (!fs.existsSync(charactersDir)) {
    fs.mkdirSync(charactersDir, { recursive: true });
  }
  if (!fs.existsSync(splashDir)) {
    fs.mkdirSync(splashDir, { recursive: true });
  }
  
  console.log('🖼️  Starting image downloads...');
  
  for (const [characterId, url] of Object.entries(imageUrls)) {
    try {
      const filename = path.join(charactersDir, `${characterId}.png`);
      const splashFilename = path.join(splashDir, `${characterId}_big.png`);
      
      console.log(`📥 Downloading ${characterId}...`);
      await downloadImage(url, filename);
      await downloadImage(url, splashFilename);
      
      console.log(`✅ Downloaded ${characterId}`);
    } catch (error) {
      console.error(`❌ Failed to download ${characterId}:`, error.message);
    }
  }
  
  console.log('🎉 Image download complete!');
}

downloadAllImages().catch(console.error);
