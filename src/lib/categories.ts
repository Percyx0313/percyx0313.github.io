export interface Category {
  id: string;
  name: string;
  description: string;
  path: string;
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface CategoryTree {
  [key: string]: Category & {
    children?: CategoryTree;
  };
}

export const categories: Category[] = [
  // 主分類
  {
    id: "tutorials",
    name: "教程",
    description: "深入淺出的技術教學文章",
    path: "/articles/tutorials",
    icon: "📚",
    color: "bg-blue-500"
  },
  {
    id: "research",
    name: "研究",
    description: "學術研究和深度分析",
    path: "/articles/research",
    icon: "🔬",
    color: "bg-purple-500"
  },
  {
    id: "notes",
    name: "筆記",
    description: "技術隨筆和想法分享",
    path: "/articles/notes",
    icon: "✍️",
    color: "bg-green-500"
  },
  
  // 教程子分類
  {
    id: "tutorials-mathematics",
    name: "數學",
    description: "數學理論和應用",
    path: "/articles/tutorials/mathematics",
    parentId: "tutorials",
    icon: "📐",
    color: "bg-orange-500"
  },
  {
    id: "tutorials-machine-learning",
    name: "機器學習",
    description: "機器學習基礎和實踐",
    path: "/articles/tutorials/machine-learning",
    parentId: "tutorials",
    icon: "🤖",
    color: "bg-cyan-500"
  },
  {
    id: "tutorials-deep-learning",
    name: "深度學習",
    description: "深度神經網路和架構",
    path: "/articles/tutorials/deep-learning",
    parentId: "tutorials",
    icon: "🧠",
    color: "bg-indigo-500"
  }
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getCategoryByPath(path: string): Category | undefined {
  return categories.find(cat => cat.path === path);
}

export function getMainCategories(): Category[] {
  return categories.filter(cat => !cat.parentId);
}

export function getSubCategories(parentId: string): Category[] {
  return categories.filter(cat => cat.parentId === parentId);
}

export function getCategoryTree(): CategoryTree {
  const tree: CategoryTree = {};
  
  // 先建立主分類
  categories.filter(cat => !cat.parentId).forEach(cat => {
    tree[cat.id] = { ...cat, children: {} };
  });
  
  // 再建立子分類
  categories.filter(cat => cat.parentId).forEach(cat => {
    if (cat.parentId && tree[cat.parentId]) {
      tree[cat.parentId].children![cat.id] = { ...cat };
    }
  });
  
  return tree;
}

export function getBreadcrumbs(path: string): Category[] {
  const breadcrumbs: Category[] = [];
  const parts = path.split('/').filter(Boolean);
  
  if (parts.length >= 2 && parts[0] === 'articles') {
    const mainCategory = getCategoryById(parts[1]);
    if (mainCategory) {
      breadcrumbs.push(mainCategory);
      
      if (parts.length >= 3) {
        const subCategory = getCategoryById(`${parts[1]}-${parts[2]}`);
        if (subCategory) {
          breadcrumbs.push(subCategory);
        }
      }
    }
  }
  
  return breadcrumbs;
} 