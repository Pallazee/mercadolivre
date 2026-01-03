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
    console.log("🟡 Criando pagamento...");

    const frete = req.body.frete || 0;
    console.log("🚚 Frete recebido:", frete);

    const preference = {
  items: [
    {
      title: "Kit 05 Espuma de Carnaval 400ml",
      unit_price: Number(79.90 + frete),
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


    console.log("📦 Preferência:", preference);

    const response = await mercadopago.preferences.create(preference);

    console.log("✅ Resposta Mercado Pago:", response.body);

    res.json({
      init_point: response.body.init_point
    });

  } catch (error) {
    console.error("❌ ERRO AO CRIAR PAGAMENTO:", error);
    res.status(500).json({
      error: "Falha ao criar pagamento",
      details: error.message
    });
  }
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
