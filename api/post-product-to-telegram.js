export default async function handler(req, res) {

    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: "@yoasmarketanddelivery",
                text: "🛒 YOAS Market\nTelegram channel connected successfully ✅"
            })
        }
    );

    const data = await response.json();

    return res.status(200).json(data);
}
