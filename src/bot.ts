import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `👋 Hello, ${msg.from?.first_name} he this is tarun kumar saini and currently working on some cool stuf npm run dev
`
  );
});
