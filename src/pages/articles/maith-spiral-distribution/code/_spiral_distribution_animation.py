import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import rcParams
import matplotlib.font_manager as fm
import os

# 設置中文字體
rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'DejaVu Sans']
rcParams['axes.unicode_minus'] = False

def spiral_function(t):
    """
    根據 logo.md 中定義的螺旋函數
    """
    # 極座標範圍
    theta = np.pi + t * (2.5 * 2 * np.pi - np.pi/4)
    
    # 半徑成長函數（softplus 型態）
    r_0 = 0.001
    scale = 1.5
    k = 5
    delta = 0.2
    
    r = r_0 + scale * (np.log(1 + np.exp(k * (t - delta))) / 
                       np.log(1 + np.exp(k * (1 - delta))))
    
    # 轉為直角座標
    x = r * np.cos(theta)
    y = r * np.sin(theta)
    
    return x, y

def generate_point_with_noise(t, sigma=0.05):
    """
    生成帶有高斯噪聲的螺旋點
    """
    x, y = spiral_function(t)
    
    # 添加高斯噪聲
    noise_x = np.random.normal(0, sigma)
    noise_y = np.random.normal(0, sigma)
    
    return x + noise_x, y + noise_y

def exponential_timing(frame_idx, total_frames, base=5.0):
    """
    指數速度控制：一開始慢，後來快
    """
    # 使用指數函數，讓前面的點出現得慢，後面快
    if frame_idx >= total_frames:
        return total_points  # 確保最後顯示所有點
    progress = frame_idx / total_frames
    return int((np.exp(base * progress) - 1) / (np.exp(base) - 1) * total_points)

# 確保 images 目錄存在
images_dir = '../images'
if not os.path.exists(images_dir):
    os.makedirs(images_dir)
    print(f"✅ 創建目錄：{images_dir}")

# 動畫參數
total_frames = 120  # 減少幀數讓動畫更快完成
total_points = 300  # 減少點數降低文件大小
sigma = 0.05  # 高斯噪聲標準差

# 預生成所有點
np.random.seed(42)  # 為了可重現性
all_points = []
for i in range(total_points):
    t = np.random.uniform(0, 1)
    x, y = generate_point_with_noise(t, sigma)
    all_points.append((x, y))

# 設置圖形
fig, ax = plt.subplots(figsize=(10, 10), facecolor='black')
ax.set_facecolor('black')
ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)
ax.set_aspect('equal')

# 移除坐標軸
ax.axis('off')

# 設置標題
title = ax.text(0.5, 0.95, 'MAiTH LAB 螺旋分布生成過程', 
                transform=ax.transAxes, fontsize=16, color='white',
                ha='center', va='top', weight='bold')

subtitle = ax.text(0.5, 0.05, '每個點都添加了高斯噪聲 σ=0.05', 
                   transform=ax.transAxes, fontsize=12, color='gray',
                   ha='center', va='bottom')

# 初始化散點圖
scat = ax.scatter([], [], c=[], s=30, alpha=0.8, cmap='hsv', vmin=0, vmax=1)

def animate(frame):
    if frame == 0:
        # 清空
        scat.set_offsets(np.empty((0, 2)))
        scat.set_array(np.array([]))
        return scat,
    
    # 使用指數速度控制
    num_points = exponential_timing(frame, total_frames)
    
    if num_points > len(all_points):
        num_points = len(all_points)
    
    # 獲取當前要顯示的點
    current_points = all_points[:num_points]
    
    if current_points:
        x_coords = [p[0] for p in current_points]
        y_coords = [p[1] for p in current_points]
        
        # 根據半徑著色（內圈到外圈顏色變化）
        colors = []
        for x, y in current_points:
            radius = np.sqrt(x*x + y*y)
            # 將半徑標準化到 0-1 範圍
            normalized_radius = min(radius / 2.5, 1.0)
            colors.append(normalized_radius)
        
        # 更新散點圖
        scat.set_offsets(np.column_stack([x_coords, y_coords]))
        scat.set_array(np.array(colors))
    
    # 更新進度資訊
    progress = frame / total_frames * 100
    if progress > 100:
        progress = 100
    
    subtitle.set_text(f'已生成 {num_points}/{total_points} 個點 ({progress:.1f}%)')
    
    return scat,

# 創建動畫
print("正在生成螺旋分布動畫...")
anim = animation.FuncAnimation(fig, animate, frames=total_frames+20, 
                             interval=50, blit=False, repeat=True)

# 保存 MP4 到 images 目錄（大幅壓縮文件大小）
mp4_path = os.path.join(images_dir, 'spiral_distribution.mp4')
print(f"正在保存 MP4 到 {mp4_path}...")

# 設置 FFmpeg writer（比 GIF 壓縮率高很多）
writer = animation.FFMpegWriter(fps=20, metadata=dict(artist='MAiTH LAB'), 
                                bitrate=800, extra_args=['-vcodec', 'libx264', '-pix_fmt', 'yuv420p'])
anim.save(mp4_path, writer=writer, dpi=80)

print(f"✅ MP4 已保存：{mp4_path}")
print(f"📏 檔案大小：{os.path.getsize(mp4_path) / 1024:.1f} KB")

# 同時保存 GIF 備用（但用更激進的壓縮）
gif_path = os.path.join(images_dir, 'spiral_distribution.gif')
print(f"正在保存壓縮 GIF 到 {gif_path}...")

# 更激進的 GIF 壓縮
gif_writer = animation.PillowWriter(fps=15, metadata=dict(artist='MAiTH LAB'))
anim.save(gif_path, writer=gif_writer, dpi=60)

print(f"✅ GIF 已保存：{gif_path}")
print(f"📏 檔案大小：{os.path.getsize(gif_path) / 1024:.1f} KB")

# 保存最後一張圖片
print("正在保存最後一張圖片...")

# 顯示所有點的最終狀態
if all_points:
    x_coords = [p[0] for p in all_points]
    y_coords = [p[1] for p in all_points]
    
    colors = []
    for x, y in all_points:
        radius = np.sqrt(x*x + y*y)
        # 將半徑標準化到 0-1 範圍
        normalized_radius = min(radius / 2.5, 1.0)
        colors.append(normalized_radius)
    
    scat.set_offsets(np.column_stack([x_coords, y_coords]))
    scat.set_array(np.array(colors))
    
    # 更新最終標題
    subtitle.set_text(f'完整的螺旋分布：{len(all_points)} 個點')

# 保存最終圖片
final_image_path = os.path.join(images_dir, 'spiral_distribution_final.jpg')
fig.savefig(final_image_path, facecolor='black', dpi=150, bbox_inches='tight')

print(f"✅ 最終圖片已保存：{final_image_path}")
print(f"📏 檔案大小：{os.path.getsize(final_image_path) / 1024:.1f} KB")

plt.close() 