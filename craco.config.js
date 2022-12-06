const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@simplimods": path.resolve(__dirname, "src"),
    },
  },
};
