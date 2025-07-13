import { motion } from 'framer-motion';
import type { Article } from '../lib/articles';
import { getTagColors } from '../lib/articles';

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const isComingSoon = article.slug.includes('coming-soon') || article.id.includes('coming-soon');
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* 背景光暈效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 主卡片 */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 hover:from-blue-500/15 hover:to-purple-500/15 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
        
        {/* Featured 徽章 */}
        {article.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          >
            ⭐ 精選
          </motion.div>
        )}

        {/* Coming Soon 覆蓋層 */}
        {isComingSoon && (
          <div className="absolute inset-0 backdrop-blur-sm bg-black/50 rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-white font-semibold text-lg mb-1">敬請期待</div>
              <div className="text-gray-300 text-sm">Coming Soon</div>
            </div>
          </div>
        )}

        {/* 封面圖片 */}
        {article.coverImage && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <motion.img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        )}

        {/* 發布日期和閱讀時間 */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            📅 {new Date(article.date).toLocaleDateString('zh-TW')}
          </span>
          <span className="flex items-center gap-1">
            ⏱️ {article.readTime}
          </span>
        </div>

        {/* 標題 */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
          {article.title}
        </h3>

        {/* 描述 */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
          {article.description}
        </p>

        {/* 標籤 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getTagColors(tag)}`}
            >
              {tag}
            </motion.span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium border bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        {/* 閱讀按鈕 */}
        <motion.a
          href={isComingSoon ? '#' : `/${article.slug}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            isComingSoon 
              ? 'bg-gradient-to-r from-gray-600/50 to-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/30' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
          }`}
          whileHover={!isComingSoon ? { scale: 1.05 } : {}}
          whileTap={!isComingSoon ? { scale: 0.95 } : {}}
          onClick={(e) => isComingSoon && e.preventDefault()}
        >
          {isComingSoon ? (
            <>
              🔒 敬請期待
            </>
          ) : (
            <>
              📖 閱讀文章
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </>
          )}
        </motion.a>
      </div>
    </motion.article>
  );
} 