module.exports = ({ env }) => ({
  "strapi-neon-tech-db-branches": {
    enabled: false,
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          params: {
            transformation: "q_auto,w_500", // Calidad automática y ancho máximo de 500px
          },
        },
        delete: {},
      },
    },
  },
});
