const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Payment } = require('mercadopago');
const { gerarIdempotencyKey } = require('../util/util');
require('dotenv').config();


router.post('/pix', async (req, res) => {
    const { transaction_amount, description, paymentMethodId, payer } = req.body;
    try {
      
        const client = new MercadoPagoConfig({
            accessToken: `${process.env.TOKEN_MERCADO_PAGO}`,
            options: { timeout: 5000, idempotencyKey: gerarIdempotencyKey() }
        });

        const payment = new Payment(client);
        const requestOptions = { idempotencyKey: gerarIdempotencyKey() };
        const body = {
                transaction_amount,
                description,
                payment_method_id: paymentMethodId,
                payer: {
                    first_name: payer.name.split(' ')[0],
                    last_name: payer.name.split(' ').slice(1).join(' '),
                    email: payer.email,
                    identification: payer.identification,
                    address: payer.address,
                },
            };


        const result = await payment.create({ body, requestOptions });
        // Se a resposta for bem-sucedida, retornamos o resultado
            res.status(200).json({
                success: true,
                status: result.status,
                point_of_interaction: result.point_of_interaction,
                result:result
            });
    } catch (error) {
        // Log de erro detalhado
        console.error("Erro ao criar o pagamento PIX:", error);

        // Se o erro for específico do Mercado Pago, logamos mais detalhes
        if (error.response) {
            console.error('Detalhes da resposta do Mercado Pago:', error.response.body);
        }

        res.status(500).json({ success: false, error: error.message });
    }
});



module.exports = router;
