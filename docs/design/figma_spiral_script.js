// MAiTH LAB Logo 螺旋曲線生成器
// 在 Figma Scripter 中使用
// 
// 🎨 主題模式：包含明亮和暗黑兩套顏色主題
// 📝 快速使用：
// 1. 複製此腳本到 Figma Scripter 插件中
// 2. 點擊 Run 執行（預設：明亮藍綠色 + 白色發光 + 立體陰影 + 左上反光）
// 3. 要切換主題：取消註釋對應的 STYLE_CONFIG.strokeColor = COLOR_THEMES.xxx 行
// 4. 要切換高光效果：取消註釋對應的高光風格組合
// 5. 要創建全部主題比較圖：取消註釋最後的 createThemeComparison()
// 
// 🔧 功能特色：
// - 自動清除所有之前的螺旋曲線物件
// - 主題比較模式顯示所有 14 種顏色（明亮7種 + 暗黑7種）
// - 自動排列成兩行：上排明亮主題，下排暗黑主題
// - ✨ 內建高光效果：白色發光、彩色發光、立體陰影、內部高光、左上反光、強化反光
// 
// 🌈 推薦配色：
// 明亮模式：tealBright (藍綠), purpleBright (紫色), lavender (薰衣草)
// 暗黑模式：tealDark (暗藍綠), purpleDark (暗紫), deepTeal (深藍綠)
// 
// ✨ 高光效果說明：
// - 白色發光：柔和的白色光暈，增加視覺焦點
// - 彩色發光：匹配描邊顏色的發光效果
// - 立體陰影：添加深度和立體感
// - 內部高光：線條內部的微妙高光效果
// - 左上反光：模擬光線從左上方照射的邊緣反光
// - 強化反光：更強烈的左上邊緣反光效果

// 數學參數定義
const r0 = 0.001;     // 初始半徑
const scale = 1.5;    // 最大放大尺度
const k = 5;          // 曲線平滑程度
const delta = 0.2;    // 開始放大的偏移點

// 🌈 顏色主題配置 - 適配個人網站的明亮/暗黑模式
const COLOR_THEMES = {
    // 🌟 明亮主題
    light: {
        // 藍綠色系
        tealBright: { r: 0.14, g: 0.78, b: 0.71 },        // Bright Teal #24C6B6
        cyanBright: { r: 0.2, g: 0.8, b: 0.9 },           // Bright Cyan #33CCE6
        turquoise: { r: 0.25, g: 0.88, b: 0.82 },         // Turquoise #40E0D0
        
        // 紫色系  
        purpleBright: { r: 0.6, g: 0.4, b: 0.9 },         // Bright Purple #9966E6
        lavender: { r: 0.7, g: 0.6, b: 0.9 },             // Lavender #B399E6
        violetBright: { r: 0.54, g: 0.17, b: 0.89 },      // Bright Violet #8A2BE2
        
        // 混合色
        tealPurple: { r: 0.4, g: 0.7, b: 0.85 },          // Teal-Purple Mix #66B3D9
    },
    
    // 🌙 暗黑主題
    dark: {
        // 暗藍綠色系
        tealDark: { r: 0.1, g: 0.5, b: 0.5 },             // Dark Teal #1A8080
        cyanDark: { r: 0.0, g: 0.4, b: 0.5 },             // Dark Cyan #006680
        emeraldDark: { r: 0.08, g: 0.52, b: 0.42 },       // Dark Emerald #15856B
        
        // 暗紫色系
        purpleDark: { r: 0.35, g: 0.2, b: 0.6 },          // Dark Purple #592099
        indigoDark: { r: 0.29, g: 0.0, b: 0.51 },         // Dark Indigo #4B0082
        plumDark: { r: 0.42, g: 0.28, b: 0.64 },          // Dark Plum #6B47A3
        
        // 混合色
        deepTeal: { r: 0.2, g: 0.45, b: 0.55 },           // Deep Teal #33728C
    }
};

// ✨ 高光效果配置
const HIGHLIGHT_EFFECTS = {
    // 發光效果
    glow: {
        type: "DROP_SHADOW",
        color: { r: 1, g: 1, b: 1, a: 0.8 },          // 白色發光
        offset: { x: 0, y: 0 },                        // 無偏移
        radius: 8,                                      // 發光半徑
        spread: 0,                                      // 擴散
        visible: true,
        blendMode: "NORMAL"
    },
    
    // 彩色發光（會動態匹配描邊顏色）
    colorGlow: {
        type: "DROP_SHADOW",
        offset: { x: 0, y: 0 },
        radius: 12,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
    },
    
    // 立體陰影
    shadow: {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.3 },          // 半透明黑色
        offset: { x: 2, y: 2 },                        // 右下偏移
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
    },
    
    // 內部高光
    innerGlow: {
        type: "INNER_SHADOW",
        color: { r: 1, g: 1, b: 1, a: 0.6 },          // 白色內發光
        offset: { x: 0, y: 0 },
        radius: 3,
        spread: 0,
        visible: true,
        blendMode: "NORMAL"
    },
    
    // 左上邊緣反光
    topLeftHighlight: {
        type: "DROP_SHADOW",
        color: { r: 1, g: 1, b: 1, a: 0.8 },          // 白色反光
        offset: { x: -1, y: -1 },                      // 左上方偏移
        radius: 2,                                      // 反光半徑
        spread: 0.5,                                    // 反光擴散
        visible: true,
        blendMode: "OVERLAY"                           // 覆蓋混合模式增強效果
    },
    
    // 強化左上邊緣反光（可選）
    topLeftHighlightStrong: {
        type: "DROP_SHADOW",
        color: { r: 1, g: 1, b: 1, a: 0.9 },          // 更強的白色反光
        offset: { x: -2, y: -2 },                      // 更大的左上偏移
        radius: 1,                                      // 更銳利的反光
        spread: 0,                                      // 無擴散
        visible: true,
        blendMode: "OVERLAY"
    }
};

// 視覺樣式參數
const STYLE_CONFIG = {
    strokeWidth: 50,                                   // 線條粗細
    strokeColor: COLOR_THEMES.light.tealBright,       // 預設：明亮藍綠色
    strokeCap: "ROUND",                                // 線條端點樣式
    strokeJoin: "ROUND",                               // 線條連接樣式
    opacity: 1,                                        // 透明度 (0-1)
    
    // ✨ 高光效果設定
    effects: {
        enableGlow: true,
        enableColorGlow: false,
        enableShadow: true,
        enableInnerGlow: true,
        enableTopLeftHighlight: false,
        enableTopLeftHighlightStrong: false
    }
};

// 🎨 快速切換主題（取消註釋來使用）
// ===== 明亮主題 =====
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.tealBright;    // 明亮藍綠色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.cyanBright;    // 明亮青色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.purpleBright;  // 明亮紫色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.lavender;      // 薰衣草色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.tealPurple;    // 藍綠紫混合

// ===== 暗黑主題 =====
// STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.tealDark;       // 暗藍綠色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.cyanDark;       // 暗青色
STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.purpleDark;     // 暗紫色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.indigoDark;     // 暗靛色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.deepTeal;       // 深藍綠色

// 🎯 快速測試特定顏色（取消註釋來使用）
// STYLE_CONFIG.strokeColor = COLOR_THEMES.light.tealBright;    // 測試明亮藍綠色
// STYLE_CONFIG.strokeColor = COLOR_THEMES.dark.purpleDark;     // 測試暗紫色

// ✨ 快速切換高光效果（取消註釋來使用）
// STYLE_CONFIG.effects.enableGlow = false;                    // 關閉白色發光
// STYLE_CONFIG.effects.enableColorGlow = true;                // 開啟彩色發光
// STYLE_CONFIG.effects.enableShadow = false;                  // 關閉立體陰影
// STYLE_CONFIG.effects.enableInnerGlow = true;                // 開啟內部高光
// STYLE_CONFIG.effects.enableTopLeftHighlight = false;        // 關閉左上反光
// STYLE_CONFIG.effects.enableTopLeftHighlightStrong = true;   // 開啟強化反光

// 🎨 預設高光風格組合（取消註釋來使用）
// === 經典風格 ===
// STYLE_CONFIG.effects = { enableGlow: true, enableColorGlow: false, enableShadow: true, enableInnerGlow: false, enableTopLeftHighlight: false, enableTopLeftHighlightStrong: false };

// === 霓虹風格 ===
// STYLE_CONFIG.effects = { enableGlow: false, enableColorGlow: true, enableShadow: false, enableInnerGlow: true, enableTopLeftHighlight: false, enableTopLeftHighlightStrong: false };

// === 立體風格 ===
// STYLE_CONFIG.effects = { enableGlow: false, enableColorGlow: false, enableShadow: true, enableInnerGlow: true, enableTopLeftHighlight: true, enableTopLeftHighlightStrong: false };

// === 發光風格 ===
// STYLE_CONFIG.effects = { enableGlow: true, enableColorGlow: true, enableShadow: false, enableInnerGlow: false, enableTopLeftHighlight: false, enableTopLeftHighlightStrong: false };

// === 極致風格 ===
// STYLE_CONFIG.effects = { enableGlow: true, enableColorGlow: true, enableShadow: true, enableInnerGlow: true, enableTopLeftHighlight: true, enableTopLeftHighlightStrong: false };

// === 反光風格 ===
// STYLE_CONFIG.effects = { enableGlow: false, enableColorGlow: false, enableShadow: true, enableInnerGlow: false, enableTopLeftHighlight: true, enableTopLeftHighlightStrong: true };

// === 質感風格 ===
// STYLE_CONFIG.effects = { enableGlow: true, enableColorGlow: false, enableShadow: true, enableInnerGlow: true, enableTopLeftHighlight: true, enableTopLeftHighlightStrong: false };

// 🔧 進階自定義高光參數（可修改 HIGHLIGHT_EFFECTS 中的數值）
// 例如：調整發光半徑、陰影偏移、透明度等
// HIGHLIGHT_EFFECTS.glow.radius = 12;                         // 增加發光半徑
// HIGHLIGHT_EFFECTS.shadow.offset = { x: 3, y: 3 };           // 增加陰影偏移
// HIGHLIGHT_EFFECTS.colorGlow.radius = 16;                    // 增加彩色發光半徑
// HIGHLIGHT_EFFECTS.glow.color = { r: 1, g: 0.9, b: 0.8, a: 0.9 };  // 暖色調發光
// HIGHLIGHT_EFFECTS.topLeftHighlight.offset = { x: -2, y: -2 }; // 調整反光偏移
// HIGHLIGHT_EFFECTS.topLeftHighlight.radius = 3;              // 調整反光半徑
// HIGHLIGHT_EFFECTS.topLeftHighlightStrong.color = { r: 1, g: 1, b: 0.9, a: 1 };  // 暖白色強化反光

// 🎯 功能總結：
// ✅ 14 種顏色主題（明亮7種 + 暗黑7種）
// ✅ 6 種高光效果（白色發光、彩色發光、立體陰影、內部高光、左上反光、強化反光）
// ✅ 7 種預設風格（經典、霓虹、立體、發光、極致、反光、質感）
// ✅ 自動清除、智能佈局、主題比較
// ✅ 完全參數化，可自定義所有視覺效果
// ✅ 左上邊緣反光效果，模擬真實光線照射

// ✨ 應用高光效果的函數
function applyHighlightEffects(vectorNode, strokeColor) {
    const effects = [];
    
    // 白色發光效果
    if (STYLE_CONFIG.effects.enableGlow) {
        effects.push({...HIGHLIGHT_EFFECTS.glow});
    }
    
    // 彩色發光效果（匹配描邊顏色）
    if (STYLE_CONFIG.effects.enableColorGlow) {
        const colorGlow = {...HIGHLIGHT_EFFECTS.colorGlow};
        colorGlow.color = {
            r: strokeColor.r,
            g: strokeColor.g,
            b: strokeColor.b,
            a: 0.6  // 彩色發光透明度
        };
        effects.push(colorGlow);
    }
    
    // 立體陰影效果
    if (STYLE_CONFIG.effects.enableShadow) {
        effects.push({...HIGHLIGHT_EFFECTS.shadow});
    }
    
    // 內部高光效果
    if (STYLE_CONFIG.effects.enableInnerGlow) {
        effects.push({...HIGHLIGHT_EFFECTS.innerGlow});
    }
    
    // 左上邊緣反光效果
    if (STYLE_CONFIG.effects.enableTopLeftHighlight) {
        effects.push({...HIGHLIGHT_EFFECTS.topLeftHighlight});
    }
    
    // 強化左上邊緣反光效果
    if (STYLE_CONFIG.effects.enableTopLeftHighlightStrong) {
        effects.push({...HIGHLIGHT_EFFECTS.topLeftHighlightStrong});
    }
    
    vectorNode.effects = effects;
    
    return effects.length;
}

// 計算螺旋點的函數
function calculateSpiralPoint(t) {
    // 1. 極座標範圍
    const theta = Math.PI - t * (2.5 * 2 * Math.PI - Math.PI / 4);
    
    // 2. 半徑成長函數 (softplus 型態)
    const numerator = Math.log(1 + Math.exp(k * (t - delta)));
    const denominator = Math.log(1 + Math.exp(k * (1 - delta)));
    const r = r0 + scale * (numerator / denominator);
    
    // 3. 轉為直角座標
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    
    return { x, y };
}

// 生成螺旋曲線
function generateSpiralCurve() {
    const points = [];
    const numPoints = 200; // 曲線精度，可以調整
    
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints; // t 從 0 到 1
        const point = calculateSpiralPoint(t);
        
        // 放大係數 (Figma 中需要更大的尺寸)
        const scaleFactor = 200;
        points.push({
            x: point.x * scaleFactor,
            y: point.y * scaleFactor
        });
    }
    
    return points;
}

// 清除之前的螺旋曲線
function clearPreviousSpirals() {
    const nodesToRemove = [];
    
    // 遍歷當前頁面的所有節點
    function findSpiralNodes(node) {
        // 清除所有包含 "MAiTH LAB Spiral" 的節點
        if (node.name && node.name.includes("MAiTH LAB Spiral")) {
            nodesToRemove.push(node);
        }
        
        // 如果是容器節點，遞歸搜索子節點
        if ('children' in node) {
            for (const child of node.children) {
                findSpiralNodes(child);
            }
        }
    }
    
    // 搜索所有節點
    for (const node of figma.currentPage.children) {
        findSpiralNodes(node);
    }
    
    // 移除找到的節點
    nodesToRemove.forEach(node => {
        node.remove();
    });
    
    if (nodesToRemove.length > 0) {
        console.log(`🗑️ 已移除 ${nodesToRemove.length} 個之前的螺旋曲線物件`);
    } else {
        console.log("🆕 沒有找到之前的螺旋曲線，創建新的");
    }
}

// 在 Figma 中創建向量路徑
function createSpiralInFigma() {
    // 首先清除之前的螺旋曲線
    clearPreviousSpirals();
    
    const points = generateSpiralCurve();
    
    // 創建路徑數據
    const pathData = [];
    
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        if (i === 0) {
            // 第一個點：移動到起點
            pathData.push(`M ${point.x} ${point.y}`);
        } else {
            // 後續點：畫線到該點
            pathData.push(`L ${point.x} ${point.y}`);
        }
    }
    
    // 創建向量節點
    const vectorNode = figma.createVector();
    vectorNode.name = "MAiTH LAB Spiral";
    
    // 設置路徑
    const pathString = pathData.join(' ');
    vectorNode.vectorPaths = [{
        windingRule: "NONZERO",
        data: pathString
    }];
    
    // 設置樣式（使用配置參數）
    vectorNode.strokes = [{
        type: "SOLID",
        color: STYLE_CONFIG.strokeColor,
        opacity: STYLE_CONFIG.opacity
    }];
    vectorNode.strokeWeight = STYLE_CONFIG.strokeWidth;
    vectorNode.strokeCap = STYLE_CONFIG.strokeCap;
    vectorNode.strokeJoin = STYLE_CONFIG.strokeJoin;
    
    // ✨ 應用高光效果
    const effectsCount = applyHighlightEffects(vectorNode, STYLE_CONFIG.strokeColor);
    
    // 添加到當前頁面
    figma.currentPage.appendChild(vectorNode);
    
    // 選中創建的向量
    figma.currentPage.selection = [vectorNode];
    
    // 縮放到適合視窗
    figma.viewport.scrollAndZoomIntoView([vectorNode]);
    
    console.log("✅ 螺旋曲線創建完成！");
    console.log(`📊 生成了 ${points.length} 個點`);
    console.log(`✨ 應用了 ${effectsCount} 個高光效果`);
}

// 執行腳本
console.log("🚀 開始執行 MAiTH LAB 螺旋曲線生成器...");
console.log("⚙️ 數學參數：");
console.log(`r0 = ${r0}`);
console.log(`scale = ${scale}`);
console.log(`k = ${k}`);
console.log(`delta = ${delta}`);

console.log("🎨 視覺樣式：");
console.log(`線條粗細: ${STYLE_CONFIG.strokeWidth}px`);
console.log(`顏色: RGB(${Math.round(STYLE_CONFIG.strokeColor.r * 255)}, ${Math.round(STYLE_CONFIG.strokeColor.g * 255)}, ${Math.round(STYLE_CONFIG.strokeColor.b * 255)})`);
console.log(`透明度: ${STYLE_CONFIG.opacity}`);
console.log(`當前主題: 明亮藍綠色 (Light Teal)`);
console.log("");
console.log("✨ 高光效果：");
console.log(`白色發光: ${STYLE_CONFIG.effects.enableGlow ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`彩色發光: ${STYLE_CONFIG.effects.enableColorGlow ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`立體陰影: ${STYLE_CONFIG.effects.enableShadow ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`內部高光: ${STYLE_CONFIG.effects.enableInnerGlow ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`左上反光: ${STYLE_CONFIG.effects.enableTopLeftHighlight ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`強化反光: ${STYLE_CONFIG.effects.enableTopLeftHighlightStrong ? '✅ 開啟' : '❌ 關閉'}`);
console.log(`當前風格: 經典風格 + 左上反光`);
console.log("");
console.log("🌈 可用主題：");
console.log(`明亮主題 (${Object.keys(COLOR_THEMES.light).length}種): ${Object.keys(COLOR_THEMES.light).join(', ')}`);
console.log(`暗黑主題 (${Object.keys(COLOR_THEMES.dark).length}種): ${Object.keys(COLOR_THEMES.dark).join(', ')}`);
console.log("");
console.log("💡 提示：取消註釋 createThemeComparison() 可同時查看所有 14 種顏色主題！");
console.log("🔧 功能升級：自動清除所有相關物件，比較模式顯示全部顏色");
console.log("🎯 佈局：明亮主題上排，暗黑主題下排，自動排列");
console.log("✨ 高光特色：預設開啟白色發光、立體陰影和左上反光，可自定義其他效果");
console.log("🎛️ 自定義高光：修改 STYLE_CONFIG.effects 的開關來調整效果");
console.log("🎨 高光風格：經典、霓虹、立體、發光、極致、反光、質感 - 7種預設風格可選");
console.log("💡 新增反光效果：左上邊緣白色反光，模擬真實光線照射質感");

// 執行主要功能
createSpiralInFigma();

// 🎨 可選：創建主題比較圖
// 取消註釋下面的代碼來同時創建所有顏色主題的比較圖

function createThemeComparison() {
    clearPreviousSpirals(); // 確保清除所有之前的螺旋曲線
    
    const themes = [];
    const offsetX = 350; // 水平間距
    const offsetY = 400; // 垂直間距
    
    // 生成所有明亮主題
    let index = 0;
    Object.keys(COLOR_THEMES.light).forEach(colorName => {
        themes.push({
            name: `Light ${colorName}`,
            color: COLOR_THEMES.light[colorName],
            offsetX: index * offsetX,
            offsetY: 0
        });
        index++;
    });
    
    // 生成所有暗黑主題
    index = 0;
    Object.keys(COLOR_THEMES.dark).forEach(colorName => {
        themes.push({
            name: `Dark ${colorName}`,
            color: COLOR_THEMES.dark[colorName],
            offsetX: index * offsetX,
            offsetY: offsetY
        });
        index++;
    });
    
    console.log(`🎨 創建 ${themes.length} 個主題比較圖...`);
    
    themes.forEach(theme => {
        const originalColor = STYLE_CONFIG.strokeColor;
        STYLE_CONFIG.strokeColor = theme.color;
        
        const points = generateSpiralCurve();
        points.forEach(point => {
            point.x += theme.offsetX;
            point.y += theme.offsetY;
        });
        
        const pathData = [];
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (i === 0) {
                pathData.push(`M ${point.x} ${point.y}`);
            } else {
                pathData.push(`L ${point.x} ${point.y}`);
            }
        }
        
        const vectorNode = figma.createVector();
        vectorNode.name = `MAiTH LAB Spiral (${theme.name})`;
        vectorNode.vectorPaths = [{ windingRule: "NONZERO", data: pathData.join(' ') }];
        vectorNode.strokes = [{ type: "SOLID", color: theme.color, opacity: 1 }];
        vectorNode.strokeWeight = STYLE_CONFIG.strokeWidth;
        vectorNode.strokeCap = STYLE_CONFIG.strokeCap;
        vectorNode.strokeJoin = STYLE_CONFIG.strokeJoin;
        
        // ✨ 應用高光效果
        applyHighlightEffects(vectorNode, theme.color);
        
        figma.currentPage.appendChild(vectorNode);
        
        STYLE_CONFIG.strokeColor = originalColor;
    });
    
    // 選中所有創建的螺旋曲線
    const allSpirals = figma.currentPage.children.filter(node => 
        node.name && node.name.includes("MAiTH LAB Spiral")
    );
    figma.currentPage.selection = allSpirals;
    
    // 縮放到適合視窗
    figma.viewport.scrollAndZoomIntoView(allSpirals);
    
    console.log("✅ 主題比較圖創建完成！");
    console.log(`📊 明亮主題: ${Object.keys(COLOR_THEMES.light).length} 個`);
    console.log(`📊 暗黑主題: ${Object.keys(COLOR_THEMES.dark).length} 個`);
    console.log(`🎨 總計: ${themes.length} 個螺旋曲線`);
    console.log(`✨ 每個螺旋曲線都包含完整的高光效果`);
}

// 取消註釋這行來創建所有主題比較：
// createThemeComparison();
