"""
MAiTH LAB 螺旋生成器
生成用於分析的螺旋曲線數據
"""

import numpy as np
import matplotlib.pyplot as plt

class MAiTHSpiralGenerator:
    def __init__(self, r0=0.001, scale=1.5, k=5, delta=0.2):
        """
        初始化螺旋參數
        
        Args:
            r0: 初始半徑
            scale: 縮放因子
            k: 曲率參數
            delta: 增長速率
        """
        self.r0 = r0
        self.scale = scale
        self.k = k
        self.delta = delta
    
    def generate_spiral(self, n_points=1000, max_angle=10*np.pi):
        """
        生成螺旋曲線座標
        
        Returns:
            tuple: (x, y, theta, r) 螺旋座標數據
        """
        theta = np.linspace(0, max_angle, n_points)
        r = self.r0 + self.scale * theta**self.k * np.exp(self.delta * theta)
        
        x = r * np.cos(theta)
        y = r * np.sin(theta)
        
        return x, y, theta, r
    
    def plot_spiral(self, save_path=None):
        """
        繪製螺旋曲線
        
        Args:
            save_path: 保存圖片的路徑
        """
        x, y, theta, r = self.generate_spiral()
        
        plt.figure(figsize=(10, 10))
        plt.plot(x, y, 'b-', linewidth=2, alpha=0.8)
        plt.title('MAiTH LAB 螺旋曲線')
        plt.xlabel('X')
        plt.ylabel('Y')
        plt.grid(True, alpha=0.3)
        plt.axis('equal')
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        plt.show()

if __name__ == "__main__":
    # 創建螺旋生成器
    spiral_gen = MAiTHSpiralGenerator()
    
    # 生成並繪製螺旋
    spiral_gen.plot_spiral('../images/maith_spiral.png') 