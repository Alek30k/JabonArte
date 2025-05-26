module.exports = {
  "strapi-neon-tech-db-branches": {
    enabled: true,
    config: {
      neonApiKey:
        "napi_b2s9s8kx7gjz5yx5wlypd1nc18j8swqqeeg948da5pgm2jpdsx24i5fhe2aofmu2", // get it from here: https://console.neon.tech/app/settings/api-keys
      neonProjectName: "ecommerce", // the neon project under wich your DB runs
      neonRole: "neondb_owner", // create it manually under roles for your project first
      gitBranch: "main", // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
    },
  },
};
