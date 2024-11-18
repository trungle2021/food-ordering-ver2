const { isArray } = require("util");

const DEFAULT_CACHE_DISH_TTL = 60 * 60 * 24 * 10; // 10 days
const DISH_CACHE_PREFIX = 'dish';

const buildCacheKey = (queryString) => {
    const { page = 1, limit = 10, category, sort = 'asc' } = queryString;
    const parts = [DISH_CACHE_PREFIX];
    if (category) {
        parts.push(`cat:${Array.isArray(category) ? category.join('|') : category}`);
    }
    if (sort) {
        parts.push(`sort:${sort}`);
    }
    parts.push(`page:${page}`);
    parts.push(`limit:${limit}`);
    return parts.join(':');
}

const getCacheKey = (queryString) => {
    return buildCacheKey(queryString);
}

const cacheKey = getCacheKey({ category: ['beef', 'chicken'], sort: 'asc', page: 1, limit: 10 });
console.log(cacheKey);


module.exports = {
  DEFAULT_CACHE_DISH_TTL,
};
