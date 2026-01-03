const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

// cria o pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Kit 05 Espuma de Carnaval 400ml",
          unit_price: 79.90,
          quantity: 1
        }
      ],
      back_urls: {
        success: "http://localhost:3333/success.html",
        failure: "http://localhost:3333/failure.html",
        pending: "http://localhost:3333/pending.html"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (err) {
    res.status(500).json({ error: "Erro no Mercado Pago" });
  }
});

app.listen(3333, () => {
  console.log("🔥 Servidor rodando em http://localhost:3333");
});
