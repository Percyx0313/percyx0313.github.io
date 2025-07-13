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
  hasCode?: boolean;
  hasImages?: boolean;
  projectPath?: string;
}

export const articles: Article[] = [
  {
    id: "maith-spiral-distribution",
    title: "MAiTH LAB 螺旋：從幾何到機率分布的奇妙旅程",
    description: "探索如何將數學函數轉換為機率分布，以MAiTH LAB logo的螺旋曲線為例，深入理解distribution variable和distribution fitting的核心概念。",
    slug: "articles/maith-spiral-distribution",
    date: "2024-01-15",
    readTime: "12 分鐘",
    tags: ["教程", "數學", "機率論", "Distribution Fitting", "MAiTH LAB"],
    featured: true,
    coverImage: "/images/logos/logo-light.svg",
    hasCode: true,
    hasImages: true,
    projectPath: "/articles/maith-spiral-distribution"
  },
  {
    id: "coming-soon-1",
    title: "深度學習中的注意力機制",
    description: "探索 Transformer 架構的核心：注意力機制如何革命性地改變了自然語言處理領域。",
    slug: "articles/attention-mechanism",
    date: "2024-02-01",
    readTime: "12 分鐘",
    tags: ["教程", "深度學習", "Transformer", "注意力機制", "NLP"],
    featured: true,
    hasCode: true,
    hasImages: true
  },
  {
    id: "coming-soon-2", 
    title: "從零開始理解卷積神經網路",
    description: "用直觀的方式解釋 CNN 的工作原理，包含卷積、池化和特徵提取的視覺化演示。",
    slug: "articles/cnn-from-scratch",
    date: "2024-02-15",
    readTime: "15 分鐘",
    tags: ["教程", "深度學習", "CNN", "電腦視覺", "神經網路"],
    featured: false,
    hasCode: true,
    hasImages: true
  },
  {
    id: "coming-soon-3",
    title: "生成對抗網路 (GANs) 入門指南",
    description: "了解 GANs 如何生成逼真的圖像，從基礎概念到實際應用的完整介紹。",
    slug: "articles/gans-introduction", 
    date: "2024-03-01",
    readTime: "10 分鐘",
    tags: ["教程", "深度學習", "GANs", "生成模型", "電腦視覺"],
    featured: false,
    hasCode: true,
    hasImages: true
  },
  {
    id: "coming-soon-4",
    title: "強化學習：讓AI學會玩遊戲",
    description: "從Q-Learning到Deep Q-Network，探索強化學習如何讓AI掌握遊戲策略。",
    slug: "articles/reinforcement-learning",
    date: "2024-03-15", 
    readTime: "14 分鐘",
    tags: ["教程", "機器學習", "強化學習", "Q-Learning", "遊戲AI"],
    featured: true,
    hasCode: true,
    hasImages: true
  }
];

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => article.tags.includes(tag));
}

export function getArticlesWithCode(): Article[] {
  return articles.filter(article => article.hasCode);
}

export function getArticlesWithImages(): Article[] {
  return articles.filter(article => article.hasImages);
}

export function getTagColors(tag: string): string {
  const tagColorMap: Record<string, string> = {
    // 內容類型標籤
    "教程": "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
    "研究": "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30", 
    "筆記": "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
    
    // 技術領域標籤
    "數學": "bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
    "機器學習": "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    "深度學習": "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
    "機率論": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    "統計學": "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    
    // 具體技術標籤
    "Distribution Fitting": "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
    "Transformer": "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/30",
    "注意力機制": "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30",
    "NLP": "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30",
    "CNN": "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
    "RNN": "bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30",
    "強化學習": "bg-lime-500/20 text-lime-700 dark:text-lime-300 border-lime-500/30",
    "Q-Learning": "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
    "遊戲AI": "bg-fuchsia-500/20 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/30"
  };
  
  return tagColorMap[tag] || "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30";
} 