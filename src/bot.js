const { Client } = require("discord.js");
const dotenv = require("dotenv");
const botPlayer = require("./modules/player");

dotenv.config();

const prefix = "!";
const TOKEN = process.env.TOKEN;
const client = new Client({
  intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"],
});

client.on("messageCreate", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift()?.toLowerCase();

  // Commands go here

  botPlayer.playMusic(message, command, args);
  
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.username}`);
});

client.login(TOKEN);
