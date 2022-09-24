const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Stop,
  },
});

function joinChannel(message) {
    let channelId = message.member?.voice.channelId || "";
    let guildId = message.member?.guild.id || "";
    let adapterCreator = message.member?.guild.voiceAdapterCreator || "";
    const connection = joinVoiceChannel({
      channelId,
      guildId,
      adapterCreator: adapterCreator,
    });
    return connection;
  }


const botPlayer = {
  playMusic: async (message, command, args) => {
  
    const commands = ['play', 'pause', 'unpause']
    if (!commands.includes(command)){
      return
    }


  if (command === "play") {
    const conn = joinChannel(message);
    const vidFind = async (query) =>{
        const vidRes = await ytSearch(query);
        return (vidRes.videos.length > 1) ? vidRes.videos[0] : null;
    }
    const video = await vidFind(args.join(""));
    if(video){
       const stream = ytdl(video.url, { filter: "audioonly" })
       const resource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary,
      });
  
      player.play(resource);
      conn.subscribe(player);
      
      message.reply(`Tocando **${video.title}**` + " digite `!pause` ou `!stop` para aplicar comandos")

    }
    
  }
  if (command === "pause") {
    player.pause();
    message.reply('Música pausada digite `!unpause` para continuar')
  }
  if (command === "unpause") {
    player.unpause();
    message.reply('A festa continua')
  }
  if (command === "stop") {
    conn.destroy();
    message.reply('Fim da festa!')
  }
}
}
module.exports = botPlayer