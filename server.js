const express = require("express");
const multer = require("multer");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());

app.post("/pay", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // $50 in cents
            currency: "usd",
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/upload", upload.single("video"), (req, res) => {
    res.send({ message: "File uploaded successfully!" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});