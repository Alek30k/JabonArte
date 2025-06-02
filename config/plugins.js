module.exports = ({ env }) => ({
  upload: {
    "response-cache": {
      enabled: true,
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
              transformation: [
                { quality: "auto", fetch_format: "auto", width: 500 }, // Optimiza calidad y ancho
              ],
            },
          },
        },
        maxAge: 300000, // 5 minutos
      },
    },
  },
});
