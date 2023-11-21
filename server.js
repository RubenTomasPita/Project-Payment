const express = require("express");
const dotenv = require("dotenv");
const stripe = require("stripe");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

//Aqui llame la API de Stripe
let stripeGateway = stripe(process.env.stripe_api);


//Realizamos el pago por medio de esta ruta
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Received items:", req.body.items);
    if (!req.body.items) {
      throw new Error("No items in the request body");
    }
    const lineItems = req.body.items.map((item) => {
      const unitAmount = parseInt(String(item.price).replace(/[^0-9.-]+/g, "") * 100);
    
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.imageSrc],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });
    
    //Constante para que queremos que haga despues de realizar el pago
    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.DOMAIN}/completado.html`,
      cancel_url: `${process.env.DOMAIN}/error.html`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error in the creation of line items:', error);
    res.status(500).json({ success: false, message: 'Error on the server' });
  }
});

app.listen(port, () => {
  console.log(`El servidor se está escuchando en el puerto ${port}`);
});
