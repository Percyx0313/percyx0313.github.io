
# 🧬 MAiTH LAB Logo 與機率分布介紹

---

## 🔖 MAiTH LAB 是什麼？

**MAiTH LAB** 是一個融合 **Mathematics (Math)**、**Artificial Intelligence (AI)** 與 **Thought (思辨/理解)** 的個人知識與教育品牌。  
它代表一種實驗室精神：在數學與機器學習之間探索背後的結構、直覺與邏輯。

---

## 🌀 Logo 幾何：螺旋生成函數

這個 Logo 是由一條參數化的螺旋曲線所構成，幾何定義如下：

### 1. 極座標範圍

$$
\theta(t) = \pi + t \cdot \left(2.5 \cdot 2\pi - \frac{\pi}{4}\right), \quad t \in [0, 1]
$$

### 2. 半徑成長函數（使用 softplus 型態）

$$
r(t) = r_0 + \text{scale} \cdot \frac{\log(1 + e^{k(t - \delta)})}{\log(1 + e^{k(1 - \delta)})}
$$

其中：

- $r_0 = 0.001$：初始半徑  
- $\text{scale} = 1.5$：最大放大尺度  
- $k = 5$：曲線平滑程度  
- $\delta = 0.2$：開始放大的偏移點  

### 3. 螺旋座標表示（轉為直角座標）

$$
\begin{aligned}
x(t) &= r(t) \cdot \cos(\theta(t)) \\
y(t) &= r(t) \cdot \sin(\theta(t))
\end{aligned}
$$

---

## 📊 如何讓它變成機率分布

我們將螺旋視為「生成資料的幾何骨架」，透過加上隨機擾動，得到一個連續的 2D 機率分布：

### 資料生成方式：

$$
\begin{aligned}
t &\sim \mathcal{U}(0, 1) \\
\boldsymbol{z} &= \begin{bmatrix} x(t) \\ y(t) \end{bmatrix} + \boldsymbol{\varepsilon}, \quad \boldsymbol{\varepsilon} \sim \mathcal{N}(0, \sigma^2 I)
\end{aligned}
$$

這樣就能得到在螺旋附近浮動的資料點，用於：

- 機率密度估計（KDE）
- Flow-based Model / Diffusion
- 教學視覺範例

---

## 🧪 Logo 不只是圖，而是一個數學實驗裝置！

透過這個幾何函數與分布化方法，**MAiTH LAB** 的 logo 具備：

- 數學意涵  
- 視覺風格  
- 可視化潛力  
- 可互動展示潛能  

你看到的每個圖形與樣本點，背後都有明確的參數化公式可解釋與重現。

---
