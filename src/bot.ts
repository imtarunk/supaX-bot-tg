import express from "express";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const app = express();
const TOKEN = process.env.BOT_TOKEN!;
const port = Number(process.env.PORT) || 3001;

if (!TOKEN) {
  throw new Error("bot id not set in .env file");
}

// ✅ Initialize bot using LONG POLLING instead of webhook
const bot = new TelegramBot(TOKEN, { polling: true });

// Middleware (if you want express for other purposes)
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Telegram bot is running with long polling!");
});

// Bot logic
bot.on("message", (msg) => {
  if (
    msg.text !== "/start" &&
    msg.text !== "/help" &&
    msg.text !== "/about" &&
    msg.text !== "/share"
  ) {
    bot.sendMessage(
      msg.chat.id,
      `Welcome to SupaX! 👋 Here's what you can do:`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Open Mini App",
                web_app: { url: miniAppUrl },
              },
            ],
            [
              {
                text: "ℹ️ Help",
                callback_data: "help",
              },
              {
                text: "📝 About",
                callback_data: "about",
              },
            ],
            [
              {
                text: "📱 Share",
                callback_data: "share",
              },
            ],
          ],
        },
      }
    );
  }
}); // replace with your Next.js app

const img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMomP-Dtx0UnfaVbEX7xJ4wf4SGgoicldDvg&s";

const miniAppUrl = "https://ed4d-103-211-19-229.ngrok-free.app";

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  // Get the user's first name or username
  const userName = msg.from?.first_name || msg.from?.username || "there";

  bot.sendPhoto(chatId, img).then();
  bot.sendMessage(
    chatId,
    `Hello @${userName}!👋

At SupaX, we're transforming how you boost engagement and growth in the web3 space. With our gamified SocialFi platform, you can effortlessly earn points, level up your influence, and earn exciting rewards while having fun!

Now, it's even more fun on Telegram! Plus, stay tuned for even more exciting features and new projects launching soon!`,
    {
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
    }
  );
});

// Handle callback queries
bot.on("callback_query", (query) => {
  const chatId = query.message?.chat.id;

  if (!chatId) return;

  if (query.data === "help") {
    bot.sendMessage(
      chatId,
      `Available commands:
/start - Start the bot and see welcome message
/help - Show this help message
/about - Learn more about SupaX
/share - Share this bot with friends

You can also open our Mini App anytime using the button below!`,
      {
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
      }
    );
  } else if (query.data === "about") {
    bot.sendMessage(
      chatId,
      `About SupaX 🌟

SupaX is a gamified SocialFi platform where you can earn points, level up your influence, and win rewards while having fun in the web3 space.

Our mission is to make web3 engagement more accessible and enjoyable for everyone.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Open Mini App",
                web_app: { url: miniAppUrl },
              },
            ],
            [
              {
                text: "💬 Join Community",
                url: "https://t.me/supax_community", // Replace with your actual community link
              },
            ],
          ],
        },
      }
    );
  } else if (query.data === "share") {
    bot.sendMessage(
      chatId,
      `Share SupaX with your friends! 🎉

Invite them to try our awesome Mini App and join our growing community.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📱 Share Bot",
                url: `https://t.me/share/url?url=${miniAppUrl}&text=Check%20out%20this%20awesome%20SupaX%20bot!`,
              },
            ],
          ],
        },
      }
    );
  }

  // Answer the callback query to remove loading state
  bot.answerCallbackQuery(query.id);
});

// Handle help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from?.first_name || msg.from?.username || "there";
  bot.sendMessage(
    chatId,
    `Hi @${userName}! Available commands:
/start - Start the bot and see welcome message
/help - Show this help message
/about - Learn more about SupaX
/share - Share this bot with friends

You can also open our Mini App anytime using the button below!`,
    {
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
    }
  );
});

// Handle about command
bot.onText(/\/about/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `About SupaX 🌟

SupaX is a gamified SocialFi platform where you can earn points, level up your influence, and win rewards while having fun in the web3 space.

Our mission is to make web3 engagement more accessible and enjoyable for everyone.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Open Mini App",
              web_app: { url: miniAppUrl },
            },
          ],
          [
            {
              text: "💬 Join Community",
              url: "https://t.me/supax_community", // Replace with your actual community link
            },
          ],
        ],
      },
    }
  );
});

// Handle share command
bot.onText(/\/share/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Share SupaX with your friends! 🎉

Invite them to try our awesome Mini App and join our growing community.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📱 Share Bot",
              url: `https://t.me/share/url?url=${miniAppUrl}&text=Check%20out%20this%20awesome%20SupaX%20bot!`,
            },
          ],
        ],
      },
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
