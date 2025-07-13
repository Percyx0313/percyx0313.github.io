export interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export const articles: Article[] = [
  {
    id: "maith-spiral-distribution",
    title: "MAiTH LAB 螺旋：從幾何到機率分布的奇妙旅程",
    description: "探索如何將數學函數轉換為機率分布，以MAiTH LAB logo的螺旋曲線為例，深入理解distribution variable和distribution fitting的核心概念。",
    slug: "test",
    date: "2024-01-15",
    readTime: "12 分鐘",
    tags: ["機器學習", "數學", "機率論", "Distribution Fitting", "MAiTH LAB"],
    featured: true,
    coverImage: "/images/logos/logo-light.svg"
  },
  {
    id: "coming-soon-1",
    title: "深度學習中的注意力機制",
    description: "探索 Transformer 架構的核心：注意力機制如何革命性地改變了自然語言處理領域。",
    slug: "attention-mechanism",
    date: "2024-02-01",
    readTime: "12 分鐘",
    tags: ["深度學習", "Transformer", "注意力機制", "NLP"],
    featured: true
  },
  {
    id: "coming-soon-2", 
    title: "從零開始理解卷積神經網路",
    description: "用直觀的方式解釋 CNN 的工作原理，包含卷積、池化和特徵提取的視覺化演示。",
    slug: "cnn-from-scratch",
    date: "2024-02-15",
    readTime: "15 分鐘",
    tags: ["深度學習", "CNN", "電腦視覺", "神經網路"],
    featured: false
  },
  {
    id: "coming-soon-3",
    title: "生成對抗網路 (GANs) 入門指南",
    description: "了解 GANs 如何生成逼真的圖像，從基礎概念到實際應用的完整介紹。",
    slug: "gans-introduction", 
    date: "2024-03-01",
    readTime: "10 分鐘",
    tags: ["深度學習", "GANs", "生成模型", "電腦視覺"],
    featured: false
  },
  {
    id: "coming-soon-4",
    title: "強化學習：讓AI學會玩遊戲",
    description: "從Q-Learning到Deep Q-Network，探索強化學習如何讓AI掌握遊戲策略。",
    slug: "reinforcement-learning",
    date: "2024-03-15", 
    readTime: "14 分鐘",
    tags: ["強化學習", "Q-Learning", "遊戲AI", "策略優化"],
    featured: true
  }
];

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getTagColors(tag: string): string {
  const tagColorMap: Record<string, string> = {
    "機器學習": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "深度學習": "bg-purple-500/20 text-purple-300 border-purple-500/30", 
    "數學": "bg-green-500/20 text-green-300 border-green-500/30",
    "機率論": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "Distribution Fitting": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "MAiTH LAB": "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "Transformer": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "注意力機制": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "NLP": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "CNN": "bg-red-500/20 text-red-300 border-red-500/30",
    "電腦視覺": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "神經網路": "bg-rose-500/20 text-rose-300 border-rose-500/30",
    "GANs": "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "生成模型": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "強化學習": "bg-lime-500/20 text-lime-300 border-lime-500/30",
    "Q-Learning": "bg-sky-500/20 text-sky-300 border-sky-500/30",
    "遊戲AI": "bg-stone-500/20 text-stone-300 border-stone-500/30",
    "策略優化": "bg-slate-500/20 text-slate-300 border-slate-500/30"
  };
  
  return tagColorMap[tag] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
} 