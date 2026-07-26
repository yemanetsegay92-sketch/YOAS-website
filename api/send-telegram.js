export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = "676479181";

    const order = req.body;

    const message =
`🛒 New YOAS Order

👤 Customer: ${order.name}
📞 Phone: ${order.phone}
📍 Address: ${order.address}

🛍 Items:
${order.items}

💰 Total: ${order.total} Birr`;

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );

        const data = await response.json();

if (!response.ok) {
    return res.status(500).json(data);
}

return res.status(200).json({
    success: true
});

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

}
