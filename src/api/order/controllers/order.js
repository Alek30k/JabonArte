"use strict";

const { AllowedActions } = require("@strapi/strapi/admin");

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

              unit_amount: Math.round(item.price * 100),
            },
            quantity: 1,
          };
        })
      );

      const session = await stripe.checkout.sesions.create({
        shipping_address_collection: { allowed_countries: "ES" },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "/?successError",
        line_items: lineItems,
      });

      await stripe
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      return { error };
    }
  },
}));
