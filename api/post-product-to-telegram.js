import db from "./firebase-admin.js";

export default async function handler(req, res) {

    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

    const productId = req.query.id;

    if (!productId) {
        return res.status(400).json({
            error: "Product ID is required"
        });
    }


    try {

        const productSnap = await db
            .collection("products")
            .doc(productId)
            .get();


        if (!productSnap.exists) {

            return res.status(404).json({
                error: "Product not found"
            });

        }


        const product = productSnap.data();


        let prices = "";

        product.options.forEach(option => {

            prices += `${option.unit} - ${option.price} Birr\n`;

        });


        const message =
`🛒 ${product.name} / ${product.tigrinya || ""}

🏷 Brand: ${product.brand}

💰 Prices:
${prices}

📦 Category: ${product.category}

Order now:
https://yoas-website.vercel.app/`;


        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    chat_id:"@yoasmarketanddelivery",
                    text:message
                })
            }
        );


        const data = await response.json();


        return res.status(200).json(data);


    } catch(error){

        console.error(error);

        return res.status(500).json({
            error:error.message
        });

    }

}
