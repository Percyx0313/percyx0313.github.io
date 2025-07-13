# 🎨 MAiTH LAB 設計檔案

這個目錄包含了 MAiTH LAB 品牌視覺設計的相關檔案和說明。

## 📁 檔案說明

### `logo.md`
- **用途**: MAiTH LAB Logo 的數學原理和機率分布說明
- **內容**: 
  - 螺旋生成函數的數學公式
  - 極座標範圍定義
  - 半徑成長函數（softplus 型態）
  - 機率分布生成方法
  - Logo 的數學意涵與視覺化潛力

### `figma_spiral_script.js`
- **用途**: 在 Figma Scripter 中生成螺旋 Logo 的腳本
- **功能**:
  - 14 種顏色主題（明亮7種 + 暗黑7種）
  - 6 種高光效果（白色發光、彩色發光、立體陰影等）
  - 7 種預設風格（經典、霓虹、立體、發光、極致、反光、質感）
  - 自動清除、智能佈局、主題比較模式
  - 完全參數化，可自定義所有視覺效果

## 🎯 使用方式

1. **數學理解**: 閱讀 `logo.md` 了解 Logo 背後的數學原理
2. **視覺生成**: 在 Figma 中使用 `figma_spiral_script.js` 生成不同風格的 Logo
3. **設計調整**: 根據需要修改腳本中的參數來調整視覺效果

## 🔗 相關檔案

生成的 Logo 檔案位於：
- `public/images/logos/logo-light.svg` - 明亮模式 Logo
- `public/images/logos/logo-dark.svg` - 深色模式 Logo  
- `public/images/logos/icon-light.svg` - 明亮模式 Icon
- `public/images/logos/icon-dark.svg` - 深色模式 Icon

## 📝 版本記錄

- **2025-01**: 初始版本，包含數學公式和 Figma 腳本
- **2025-01**: 完成 SVG 格式轉換和網站整合 