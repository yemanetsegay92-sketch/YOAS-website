export default async function handler(req, res) {

    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    const product = {
        name: "Potato / ድንሽ",
        brand: "Fresh",
        prices: "1 kg - 50 Birr\n2 kg - 100 Birr"
    };

    const message =
`🥔 ${product.name}

🏷 Brand: ${product.brand}

💰 Prices:
${product.prices}

🛒 Order now:
https://yoas-website.vercel.app/`;

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: "@yoasmarketanddelivery",
                    text: message
                })
            }
        );

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
}
