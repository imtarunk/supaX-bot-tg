import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
dotenv.config();
const app = express();
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
    throw new Error("bot id not set in .env file");
}
const url = "https://d2da-146-196-36-113.ngrok-free.app"; // Replace with your actual ngrok/render URL
const port = Number(process.env.PORT) || 3000;
// Initialize bot with no polling (we're using webhook)
const bot = new TelegramBot(TOKEN, { polling: false }); // Change to polling: false
// Set webhook with Telegram
bot.setWebHook(`${url}/bot${TOKEN}`);
// Parse incoming updates
app.use(express.json());
// Endpoint that Telegram sends updates to
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});
// Just to ping!
bot.on("message", (msg) => {
    bot.sendMessage(msg.chat.id, "I am alive!");
});
const miniAppUrl = "https://www.facebook.com/"; // replace with my next app mini app url
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! Click below to launch the app:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🚀 Open Mini App",
                        web_app: { url: miniAppUrl },
                    },
                ],
            ],
        },
    });
});
app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});
