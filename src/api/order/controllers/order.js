"use strict";

//@ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::order.order');
module.exports = createCoreController("api::order.order", ({ stripe }) => ({
  async create(ctx) {
    //@ts-ignore

    const { products } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await stripe
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "ARS",
              product_data: {
                name: item.productName,
              },
            },
          };
        })
      );
    } catch (error) {}
  },
}));
