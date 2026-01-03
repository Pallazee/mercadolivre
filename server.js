console.log("🟡 Iniciando servidor...");

const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config();

console.log("🟢 Dependências carregadas");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

if (!process.env.MP_ACCESS_TOKEN) {
  console.error("❌ MP_ACCESS_TOKEN NÃO DEFINIDO");
} else {
  mercadopago.configure({
    access_token: process.env.MP_ACCESS_TOKEN
  });
  console.log("🔑 Mercado Pago token OK");
}

// rota de teste
app.get('/test', (req, res) => {
  res.send('🔥 Backend funcionando');
});

// rota de pagamento
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
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      init_point: response.body.init_point
    });

  } catch (error) {
    console.error("❌ Erro MP:", error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
