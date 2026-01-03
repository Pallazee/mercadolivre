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
    const preference = {
      items: [
        {
          title: "Kit 05 Espuma de Carnaval 400ml",
          unit_price: 79.90,
          quantity: 1
        }
      ],
      back_urls: {
        success: "https://SEU_SITE_RENDER.onrender.com/success",
        failure: "https://SEU_SITE_RENDER.onrender.com/failure",
        pending: "https://SEU_SITE_RENDER.onrender.com/pending"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    // 🔥 AQUI É O PONTO CRÍTICO
    res.json({
      init_point: response.body.init_point
    });

  } catch (error) {
    console.error("Erro MP:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

app.listen(process.env.PORT || 3333, () => {
  console.log("🚀 Servidor rodando");
});
