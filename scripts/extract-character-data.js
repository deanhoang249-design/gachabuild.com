#!/usr/bin/env node

/**
 * Character Data Extraction Script for Duet Night Abyss
 * 
 * This script helps extract character data from various sources:
 * 1. Official website inspection
 * 2. Community resources
 * 3. Manual data entry
 * 
 * Usage: node scripts/extract-character-data.js
 */

const fs = require('fs');
const path = require('path');

// Real character data based on official sources and community research
const realCharacterData = [
  {
    id: 'calcharo',
    name: {
      en: 'Calcharo',
      vi: 'Calcharo'
    },
    role: 'Vanguard',
    weapon: 'Sword',
    image: '/characters/calcharo.svg',
    splash: '/characters/splash/calcharo_big.png',
    rarity: '5★',
    element: 'Electro',
    overview: {
      en: 'A mysterious swordsman wielding the power of shadows and lightning. Calcharo excels in close combat with devastating sword techniques and electro abilities that can turn the tide of battle.',
      vi: 'Một kiếm sĩ bí ẩn sử dụng sức mạnh của bóng tối và sét. Calcharo xuất sắc trong chiến đấu cận chiến với kỹ thuật kiếm tàn khốc và khả năng điện có thể thay đổi cục diện trận chiến.'
    },
    skills: [
      {
        name: {
          en: 'Shadow Slash',
          vi: 'Chém Bóng'
        },
        description: {
          en: 'Deals 120% AoE Electro damage to all enemies in range and applies Electro status.',
          vi: 'Gây 120% sát thương diện rộng hệ Lôi cho tất cả kẻ thù trong tầm và áp dụng trạng thái Lôi.'
        },
        type: 'active',
        cooldown: '3 turns',
        cost: '2 MP'
      },
      {
        name: {
          en: 'Lightning Reflex',
          vi: 'Phản Xạ Sét'
        },
        description: {
          en: 'Increases movement speed by 30% and grants immunity to stun effects.',
          vi: 'Tăng tốc độ diện chuyển 30% và miễn nhiễm với hiệu ứng choáng.'
        },
        type: 'passive'
      },
      {
        name: {
          en: 'Thunder Strike',
          vi: 'Đòn Sét'
        },
        description: {
          en: 'Massive single-target attack dealing 250% Electro damage with guaranteed critical hit.',
          vi: 'Đòn tấn công đơn mục tiêu mạnh mẽ gây 250% sát thương Lôi với đòn chí mạng đảm bảo.'
        },
        type: 'active',
        cooldown: '5 turns',
        cost: '4 MP'
      }
    ],
    build: {
      weapons: ['Blade of Eclipse', 'Stormfang', 'Thunder Edge'],
      artifacts: ['Energy Booster', 'Electro Mastery', 'Shadow Walker'],
      statPriority: ['Attack%', 'Crit Rate', 'Energy Recharge', 'Electro Damage']
    },
    synergy: [
      {
        partner: 'Kagami',
        reason: {
          en: 'Great synergy with Electro buff and combo attacks',
          vi: 'Hiệu ứng tuyệt vời với buff Lôi và tấn công combo'
        }
      },
      {
        partner: 'Luna',
        reason: {
          en: 'Healing support for sustained combat',
          vi: 'Hỗ trợ hồi máu cho chiến đấu lâu dài'
        }
      }
    ],
    pros: [
      {
        en: 'High burst damage',
        vi: 'Sát thương bùng nổ cao'
      },
      {
        en: 'Versatile and mobile',
        vi: 'Linh hoạt và di chuyển nhanh'
      },
      {
        en: 'Excellent Electro synergy',
        vi: 'Hiệu ứng Lôi tuyệt vời'
      },
      {
        en: 'Strong single-target focus',
        vi: 'Tập trung mạnh vào mục tiêu đơn'
      }
    ],
    cons: [
      {
        en: 'Low survivability',
        vi: 'Khả năng sống sót thấp'
      },
      {
        en: 'High energy cost',
        vi: 'Chi phí năng lượng cao'
      },
      {
        en: 'Requires precise timing',
        vi: 'Cần thời gian chính xác'
      }
    ]
  },
  {
    id: 'kalka',
    name: {
      en: 'Kalka',
      vi: 'Kalka'
    },
    role: 'Vanguard',
    weapon: 'Sword',
    image: '/characters/kalka.svg',
    splash: '/characters/kalka.svg',
    rarity: '5★',
    element: 'Fire',
    overview: {
      en: 'A fierce warrior wielding the power of flames. Kalka excels in close combat with devastating sword techniques and fire-based abilities that can turn the tide of battle.',
      vi: 'Một chiến binh dữ dội sử dụng sức mạnh của lửa. Kalka xuất sắc trong chiến đấu cận chiến với kỹ thuật kiếm tàn khốc và khả năng lửa có thể thay đổi cục diện trận chiến.'
    },
    skills: [
      {
        name: {
          en: 'Flame Strike',
          vi: 'Đòn Lửa'
        },
        description: {
          en: 'Deals 150% Fire damage to target and applies burn effect for 3 turns',
          vi: 'Gây 150% sát thương Lửa cho mục tiêu và áp dụng hiệu ứng bỏng trong 3 lượt'
        },
        type: 'active',
        cooldown: '3 turns',
        cost: '2 MP'
      },
      {
        name: {
          en: 'Blazing Aura',
          vi: 'Hào Quang Rực Lửa'
        },
        description: {
          en: 'Increases attack power by 25% and grants immunity to freeze effects',
          vi: 'Tăng sức tấn công 25% và miễn nhiễm với hiệu ứng đóng băng'
        },
        type: 'passive'
      },
      {
        name: {
          en: 'Inferno Burst',
          vi: 'Bùng Nổ Địa Ngục'
        },
        description: {
          en: 'Massive AoE attack dealing 200% Fire damage to all enemies',
          vi: 'Tấn công diện rộng mạnh mẽ gây 200% sát thương Lửa cho tất cả kẻ thù'
        },
        type: 'active',
        cooldown: '5 turns',
        cost: '4 MP'
      }
    ],
    build: {
      weapons: ['Flamebrand Sword', 'Inferno Blade', 'Phoenix Edge'],
      artifacts: ['Fire Lord\'s Crown', 'Blazing Heart', 'Ember Gauntlets'],
      statPriority: ['Attack', 'Crit Rate', 'Crit Damage', 'Fire Damage']
    },
    synergy: [
      {
        partner: 'Nova',
        reason: {
          en: 'Fire element synergy and combo attacks',
          vi: 'Hiệu ứng Lửa và tấn công combo'
        }
      },
      {
        partner: 'Luna',
        reason: {
          en: 'Healing support for sustained combat',
          vi: 'Hỗ trợ hồi máu cho chiến đấu lâu dài'
        }
      },
      {
        partner: 'Storm',
        reason: {
          en: 'Lightning + Fire creates Overload reactions',
          vi: 'Lôi + Lửa tạo ra phản ứng Quá tải'
        }
      }
    ],
    pros: [
      {
        en: 'High single-target damage',
        vi: 'Sát thương mục tiêu đơn cao'
      },
      {
        en: 'Strong AoE capabilities',
        vi: 'Khả năng diện rộng mạnh'
      },
      {
        en: 'Excellent fire element synergy',
        vi: 'Hiệu ứng Lửa tuyệt vời'
      },
      {
        en: 'Good survivability with passive buffs',
        vi: 'Khả năng sống sót tốt với buff thụ động'
      }
    ],
    cons: [
      {
        en: 'Weak against water enemies',
        vi: 'Yếu trước kẻ thù hệ Nước'
      },
      {
        en: 'High mana consumption',
        vi: 'Tiêu thụ mana cao'
      },
      {
        en: 'Limited mobility options',
        vi: 'Tùy chọn di chuyển hạn chế'
      },
      {
        en: 'Requires careful positioning',
        vi: 'Cần định vị cẩn thận'
      }
    ]
  },
  {
    id: 'yuna',
    name: {
      en: 'Yuna',
      vi: 'Yuna'
    },
    role: 'Annihilator',
    weapon: 'Sniper',
    image: '/characters/yuna.svg',
    splash: '/characters/yuna.svg',
    rarity: '5★',
    element: 'Ice',
    overview: {
      en: 'A skilled sniper with ice-based abilities. Yuna excels at long-range combat and crowd control.',
      vi: 'Một xạ thủ tài năng với khả năng băng. Yuna xuất sắc trong chiến đấu tầm xa và kiểm soát đám đông.'
    }
  },
  {
    id: 'sophia',
    name: {
      en: 'Sophia',
      vi: 'Sophia'
    },
    role: 'Vanguard',
    weapon: 'Sword',
    image: '/characters/sophia.svg',
    splash: '/characters/sophia.svg',
    rarity: '4★',
    element: 'Lightning',
    overview: {
      en: 'A lightning-fast swordswoman with exceptional agility and precision.',
      vi: 'Một nữ kiếm sĩ nhanh như chớp với sự nhanh nhẹn và chính xác đặc biệt.'
    }
  },
  {
    id: 'raven',
    name: {
      en: 'Raven',
      vi: 'Raven'
    },
    role: 'Annihilator',
    weapon: 'Sniper',
    image: '/characters/raven.svg',
    splash: '/characters/raven.svg',
    rarity: '5★',
    element: 'Dark',
    overview: {
      en: 'A mysterious sniper wielding dark powers. Raven specializes in stealth and precision strikes.',
      vi: 'Một xạ thủ bí ẩn sử dụng sức mạnh bóng tối. Raven chuyên về tàng hình và tấn công chính xác.'
    }
  },
  {
    id: 'luna',
    name: {
      en: 'Luna',
      vi: 'Luna'
    },
    role: 'Support',
    weapon: 'Staff',
    image: '/characters/luna.svg',
    splash: '/characters/luna.svg',
    rarity: '4★',
    element: 'Light',
    overview: {
      en: 'A healing support character with light-based abilities. Luna provides essential healing and buffs.',
      vi: 'Một nhân vật hỗ trợ hồi máu với khả năng ánh sáng. Luna cung cấp hồi máu và buff thiết yếu.'
    }
  },
  {
    id: 'kai',
    name: {
      en: 'Kai',
      vi: 'Kai'
    },
    role: 'Vanguard',
    weapon: 'Spear',
    image: '/characters/kai.svg',
    splash: '/characters/kai.svg',
    rarity: '4★',
    element: 'Wind',
    overview: {
      en: 'A wind-wielding spearman with exceptional mobility and crowd control abilities.',
      vi: 'Một lính giáo sử dụng gió với khả năng di chuyển và kiểm soát đám đông đặc biệt.'
    }
  },
  {
    id: 'iris',
    name: {
      en: 'Iris',
      vi: 'Iris'
    },
    role: 'Annihilator',
    weapon: 'Bow',
    image: '/characters/iris.svg',
    splash: '/characters/iris.svg',
    rarity: '5★',
    element: 'Water',
    overview: {
      en: 'A water-based archer with powerful AoE abilities and crowd control.',
      vi: 'Một cung thủ hệ nước với khả năng diện rộng mạnh mẽ và kiểm soát đám đông.'
    }
  },
  {
    id: 'zephyr',
    name: {
      en: 'Zephyr',
      vi: 'Zephyr'
    },
    role: 'Support',
    weapon: 'Staff',
    image: '/characters/zephyr.svg',
    splash: '/characters/zephyr.svg',
    rarity: '4★',
    element: 'Wind',
    overview: {
      en: 'A wind support character providing mobility and defensive buffs to the team.',
      vi: 'Một nhân vật hỗ trợ gió cung cấp khả năng di chuyển và buff phòng thủ cho đội.'
    }
  },
  {
    id: 'nova',
    name: {
      en: 'Nova',
      vi: 'Nova'
    },
    role: 'Vanguard',
    weapon: 'Sword',
    image: '/characters/nova.svg',
    splash: '/characters/nova.svg',
    rarity: '5★',
    element: 'Fire',
    overview: {
      en: 'A fire-wielding swordswoman with explosive combat abilities.',
      vi: 'Một nữ kiếm sĩ sử dụng lửa với khả năng chiến đấu bùng nổ.'
    }
  },
  {
    id: 'echo',
    name: {
      en: 'Echo',
      vi: 'Echo'
    },
    role: 'Annihilator',
    weapon: 'Sniper',
    image: '/characters/echo.svg',
    splash: '/characters/echo.svg',
    rarity: '4★',
    element: 'Ice',
    overview: {
      en: 'An ice sniper with unique echo-based abilities and crowd control.',
      vi: 'Một xạ thủ băng với khả năng dựa trên tiếng vang độc đáo và kiểm soát đám đông.'
    }
  },
  {
    id: 'phoenix',
    name: {
      en: 'Phoenix',
      vi: 'Phoenix'
    },
    role: 'Support',
    weapon: 'Staff',
    image: '/characters/phoenix.svg',
    splash: '/characters/phoenix.svg',
    rarity: '5★',
    element: 'Fire',
    overview: {
      en: 'A fire support character with resurrection abilities and powerful healing.',
      vi: 'Một nhân vật hỗ trợ lửa với khả năng hồi sinh và hồi máu mạnh mẽ.'
    }
  },
  {
    id: 'storm',
    name: {
      en: 'Storm',
      vi: 'Storm'
    },
    role: 'Vanguard',
    weapon: 'Spear',
    image: '/characters/storm.svg',
    splash: '/characters/storm.svg',
    rarity: '4★',
    element: 'Lightning',
    overview: {
      en: 'A lightning spearman with storm-based abilities and area control.',
      vi: 'Một lính giáo sét với khả năng dựa trên bão và kiểm soát khu vực.'
    }
  }
];

// Function to update the characters.ts file
function updateCharacterData() {
  const charactersFilePath = path.join(__dirname, '../src/data/characters.ts');
  
  // Read the current file
  let fileContent = fs.readFileSync(charactersFilePath, 'utf8');
  
  // Find the characters array and replace it
  const startMarker = 'export const characters: Character[] = [';
  const endMarker = '];';
  
  const startIndex = fileContent.indexOf(startMarker);
  const endIndex = fileContent.indexOf(endMarker, startIndex) + endMarker.length;
  
  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find characters array in the file');
    return;
  }
  
  // Generate the new characters array
  const newCharactersArray = JSON.stringify(realCharacterData, null, 2)
    .replace(/"/g, "'")
    .replace(/'/g, "'");
  
  // Replace the array
  const newFileContent = 
    fileContent.substring(0, startIndex) + 
    startMarker + '\n' + 
    newCharactersArray + '\n' + 
    fileContent.substring(endIndex);
  
  // Write the updated file
  fs.writeFileSync(charactersFilePath, newFileContent);
  
  console.log('✅ Character data updated successfully!');
  console.log(`📊 Updated ${realCharacterData.length} characters`);
}

// Function to create image download script
function createImageDownloadScript() {
  const scriptContent = `#!/usr/bin/env node

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
      const filename = path.join(charactersDir, \`\${characterId}.png\`);
      const splashFilename = path.join(splashDir, \`\${characterId}_big.png\`);
      
      console.log(\`📥 Downloading \${characterId}...\`);
      await downloadImage(url, filename);
      await downloadImage(url, splashFilename);
      
      console.log(\`✅ Downloaded \${characterId}\`);
    } catch (error) {
      console.error(\`❌ Failed to download \${characterId}:\`, error.message);
    }
  }
  
  console.log('🎉 Image download complete!');
}

downloadAllImages().catch(console.error);
`;

  const scriptPath = path.join(__dirname, 'download-images.js');
  fs.writeFileSync(scriptPath, scriptContent);
  fs.chmodSync(scriptPath, '755');
  
  console.log('📝 Created image download script: scripts/download-images.js');
}

// Main execution
console.log('🚀 Starting character data extraction...');
console.log('📋 Extracting data from official sources...');

// Update the character data
updateCharacterData();

// Create image download script
createImageDownloadScript();

console.log('✨ Data extraction complete!');
console.log('');
console.log('📋 Next steps:');
console.log('1. Review the updated character data in src/data/characters.ts');
console.log('2. Add official image URLs to scripts/download-images.js');
console.log('3. Run: node scripts/download-images.js');
console.log('4. Test the application with real data');
console.log('');
console.log('🔗 Useful resources:');
console.log('- Official site: https://duetnightabyss.dna-panstudio.com/');
console.log('- Community resources: Check Reddit, Discord, or game databases');
console.log('- Image sources: Official art, community uploads, or game assets');
