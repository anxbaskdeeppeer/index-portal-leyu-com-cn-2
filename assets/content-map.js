// assets/content-map.js
// 站点内容分区与搜索过滤模块

const siteConfig = {
  baseUrl: "https://index-portal-leyu.com.cn",
  primaryKeyword: "乐鱼体育",
  version: "2.0.1",
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["首页", "乐鱼体育", "推荐"],
    pages: ["/", "/index", "/home"],
  },
  {
    id: "sports",
    title: "体育赛事",
    tags: ["足球", "篮球", "网球", "乐鱼体育"],
    pages: ["/sports", "/soccer", "/basketball"],
  },
  {
    id: "live",
    title: "直播",
    tags: ["直播", "体育直播", "乐鱼体育"],
    pages: ["/live", "/live-stream"],
  },
  {
    id: "news",
    title: "新闻资讯",
    tags: ["新闻", "体育新闻", "乐鱼体育"],
    pages: ["/news", "/breaking"],
  },
  {
    id: "esports",
    title: "电竞",
    tags: ["电竞", "英雄联盟", "Dota2", "乐鱼体育"],
    pages: ["/esports", "/lol", "/dota2"],
  },
  {
    id: "promotions",
    title: "优惠活动",
    tags: ["优惠", "奖金", "乐鱼体育"],
    pages: ["/promotions", "/bonus"],
  },
  {
    id: "help",
    title: "帮助中心",
    tags: ["帮助", "FAQ", "客服", "乐鱼体育"],
    pages: ["/help", "/faq", "/contact"],
  },
];

const keywordIndex = {};

function buildKeywordIndex() {
  for (const section of contentSections) {
    const allTerms = [section.title.toLowerCase(), ...section.tags.map(t => t.toLowerCase())];
    for (const term of allTerms) {
      if (!keywordIndex[term]) {
        keywordIndex[term] = [];
      }
      if (!keywordIndex[term].includes(section.id)) {
        keywordIndex[term].push(section.id);
      }
    }
  }
}

function searchSections(query) {
  if (!query || typeof query !== "string") return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const resultSet = new Set();
  for (const word of words) {
    for (const key of Object.keys(keywordIndex)) {
      if (key.includes(word) || word.includes(key)) {
        for (const id of keywordIndex[key]) {
          resultSet.add(id);
        }
      }
    }
  }
  return contentSections.filter(s => resultSet.has(s.id));
}

function getSectionById(id) {
  return contentSections.find(s => s.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(s => s.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet);
}

function getPagesForSection(sectionId) {
  const section = getSectionById(sectionId);
  return section ? section.pages.map(p => siteConfig.baseUrl + p) : [];
}

(function init() {
  buildKeywordIndex();
  console.log("[Content Map] 初始化完成，共 " + contentSections.length + " 个分区，关键词索引条目: " + Object.keys(keywordIndex).length);
})();

function demoUsage() {
  const testQueries = ["乐鱼体育", "电竞", "篮球", "直播", "help"];
  for (const q of testQueries) {
    const results = searchSections(q);
    console.log(`搜索 "${q}" 匹配到 ${results.length} 个分区:`, results.map(r => r.title));
  }
}

demoUsage();