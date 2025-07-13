"""
MAiTH LAB 螺旋分布分析
將螺旋曲線轉換為機率分布並進行擬合分析
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from scipy.optimize import curve_fit
import seaborn as sns
from spiral_generator import MAiTHSpiralGenerator

class SpiralDistributionAnalyzer:
    def __init__(self, spiral_generator):
        """
        初始化分布分析器
        
        Args:
            spiral_generator: MAiTHSpiralGenerator 實例
        """
        self.spiral_gen = spiral_generator
        self.x = None
        self.y = None
        self.theta = None
        self.r = None
        
    def load_spiral_data(self):
        """載入螺旋數據"""
        self.x, self.y, self.theta, self.r = self.spiral_gen.generate_spiral()
        
    def radius_to_distribution(self, bins=50):
        """
        將半徑數據轉換為機率分布
        
        Args:
            bins: 直方圖的bin數量
            
        Returns:
            tuple: (bin_centers, probabilities) 分布數據
        """
        if self.r is None:
            self.load_spiral_data()
            
        # 計算半徑分布的直方圖
        hist, bin_edges = np.histogram(self.r, bins=bins, density=True)
        bin_centers = (bin_edges[:-1] + bin_edges[1:]) / 2
        
        return bin_centers, hist
    
    def fit_exponential_distribution(self, bin_centers, probabilities):
        """
        擬合指數分布
        
        Args:
            bin_centers: 分布的中心點
            probabilities: 機率密度值
            
        Returns:
            tuple: (fitted_params, fitted_curve) 擬合結果
        """
        def exponential_func(x, a, b, c):
            return a * np.exp(-b * x) + c
            
        # 進行曲線擬合
        try:
            popt, pcov = curve_fit(exponential_func, bin_centers, probabilities, 
                                 p0=[1, 0.1, 0], maxfev=10000)
            fitted_curve = exponential_func(bin_centers, *popt)
            return popt, fitted_curve
        except:
            return None, None
    
    def plot_distribution_analysis(self, save_path=None):
        """
        繪製分布分析圖
        
        Args:
            save_path: 保存圖片的路徑
        """
        # 獲取分布數據
        bin_centers, probabilities = self.radius_to_distribution()
        
        # 擬合分布
        fitted_params, fitted_curve = self.fit_exponential_distribution(
            bin_centers, probabilities)
        
        # 創建子圖
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 12))
        
        # 1. 原始螺旋
        ax1.plot(self.x, self.y, 'b-', linewidth=2, alpha=0.8)
        ax1.set_title('MAiTH LAB 螺旋曲線')
        ax1.set_xlabel('X')
        ax1.set_ylabel('Y')
        ax1.grid(True, alpha=0.3)
        ax1.axis('equal')
        
        # 2. 半徑隨角度變化
        ax2.plot(self.theta, self.r, 'g-', linewidth=2)
        ax2.set_title('半徑隨角度變化')
        ax2.set_xlabel('角度 θ')
        ax2.set_ylabel('半徑 r')
        ax2.grid(True, alpha=0.3)
        
        # 3. 半徑分布直方圖
        ax3.hist(self.r, bins=50, density=True, alpha=0.7, color='skyblue', 
                edgecolor='black')
        ax3.plot(bin_centers, probabilities, 'ro-', linewidth=2, 
                label='觀測分布')
        
        if fitted_curve is not None:
            ax3.plot(bin_centers, fitted_curve, 'r--', linewidth=2, 
                    label=f'指數擬合')
            
        ax3.set_title('半徑機率分布')
        ax3.set_xlabel('半徑 r')
        ax3.set_ylabel('機率密度')
        ax3.legend()
        ax3.grid(True, alpha=0.3)
        
        # 4. KL散度分析（如果有擬合結果）
        if fitted_curve is not None:
            kl_divergence = stats.entropy(probabilities + 1e-10, 
                                        fitted_curve + 1e-10)
            
            ax4.bar(['觀測分布', '指數擬合'], 
                   [np.sum(probabilities), np.sum(fitted_curve)], 
                   color=['skyblue', 'salmon'], alpha=0.7)
            ax4.set_title(f'分布比較 (KL散度: {kl_divergence:.4f})')
            ax4.set_ylabel('總機率密度')
            
            # 添加參數信息
            if fitted_params is not None:
                param_text = f'擬合參數:\na={fitted_params[0]:.3f}\nb={fitted_params[1]:.3f}\nc={fitted_params[2]:.3f}'
                ax4.text(0.02, 0.98, param_text, transform=ax4.transAxes, 
                        verticalalignment='top', fontsize=10,
                        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
        else:
            ax4.text(0.5, 0.5, '擬合失敗', ha='center', va='center', 
                    transform=ax4.transAxes, fontsize=16)
            ax4.set_title('擬合結果')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            
        plt.show()

if __name__ == "__main__":
    # 創建螺旋生成器和分析器
    spiral_gen = MAiTHSpiralGenerator()
    analyzer = SpiralDistributionAnalyzer(spiral_gen)
    
    # 進行分布分析
    analyzer.load_spiral_data()
    analyzer.plot_distribution_analysis('../images/distribution_analysis.png') 