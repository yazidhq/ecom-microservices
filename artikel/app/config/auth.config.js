const { getConfig } = require("../controllers/helpers");

const loadSecret = async () => {
  const secret = await getConfig();
  return secret;
};

module.exports = {
  loadSecret,
};
