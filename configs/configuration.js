const configs = {
  mongodbURL:
    "mongodb+srv://chandant225:mongochandant225@cluster0.wsxca.mongodb.net/nibc?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3001,
  BASE_PATH: "/V1/nibc/api",
  JWT_SECRET: "khuljaasimsim",
};

module.exports = { configs };
