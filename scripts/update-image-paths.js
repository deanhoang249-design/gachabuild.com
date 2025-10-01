const fs = require('fs');
const path = require('path');

const charactersFile = path.join(__dirname, '../src/data/characters.ts');

// Read the characters file
let content = fs.readFileSync(charactersFile, 'utf8');

// Function to update image paths to WebP
function updateImagePaths(content) {
  // Update .jpg to .webp
  content = content.replace(/\/characters\/([^"']+)\.jpg/g, '/characters/webp/$1.webp');
  
  // Update .png to .webp (for splash images that are PNG)
  content = content.replace(/\/characters\/([^"']+)\.png/g, '/characters/webp/$1.webp');
  
  return content;
}

// Update the content
const updatedContent = updateImagePaths(content);

// Write back to file
fs.writeFileSync(charactersFile, updatedContent, 'utf8');

console.log('✓ Updated character image paths to use WebP format');
console.log('✓ All .jpg and .png references have been updated to .webp');
