const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "santosmarco",
        mongodb_password: "1234",
        mongodb_database: "mysite_dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "santosmarco",
      mongodb_password: "1234",
      mongodb_database: "mysite",
    },
  };
};
