import db from "./firebase-admin.js";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const update = req.body;

    try {

        // Check if Telegram sent a message
        if (update.message) {

            const chatId = update.message.chat.id;
            const text = update.message.text;

            if (text === "/start") {

                const productsSnapshot = await db.collection("products").limit(10).get();

                let message = "🛒 Welcome to YOAS\n\nAvailable Products:\n\n";

                productsSnapshot.forEach((doc) => {

                    const product = doc.data();

                    message += `🛍 ${product.name}\n`;

                    if (product.options && product.options.length > 0) {
                        message += `Price: ${product.options[0].price} Birr\n`;
                    }

                    message += "\n";
                });

                message += "👇 Order here:\n";
                message += "https://yoas-website.vercel.app/shop.html";


                await fetch(
                    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message
                        })
                    }
                );

            }

        }

        return res.status(200).json({
            success: true
        });


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}
