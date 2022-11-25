const stripe = require("stripe")(process.env.SECRET_KEY);

const calculateOrderAmount = (items) => {
  const { total_amount, shipping_fee } = items;
  return total_amount + shipping_fee;
};

const stripeController = async (req, res) => {
  const { items } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
