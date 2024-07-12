const Redis = require('ioredis');
const redis = new Redis();

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }

  res.sendResponse = res.json;
  res.json = (data) => {
    redis.setex(cacheKey, 60, JSON.stringify(data)); // Cache for 60 seconds
    res.sendResponse(data);
  };

  next();
};

module.exports = cacheMiddleware;
