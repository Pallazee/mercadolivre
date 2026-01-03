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

// rota de teste (pra saber se o backend tá vivo)
app.get('/test', (req, res) => {
  res.send('🔥 Backend funcionando');
});

// cria preferência de pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const frete = req.body.frete || 0;

    const preference = {
      items: [
        {
          title: "Kit 05 Espuma de Carnaval 400ml",
          unit_price: 79.90 + frete,
          quantity: 1
        }
      ],
      back_urls: {
        success: "https://mercadolivre-zlq8.onrender.com",
        failure: "https://mercadolivre-zlq8.onrender.com",
        pending: "https://mercadolivre-zlq8.onrender.com"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no pagamento" });
  }
});
