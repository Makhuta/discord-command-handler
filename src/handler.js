require("dotenv").config();
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const c = new MyEmitter();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const clientLocal = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel]
});

module.exports = async function ({ client, srcFolder, bot_token }) {
  if (client?.user ? true : false || bot_token ? true : false) {
    if (bot_token ? true : false) {
      if (client?.user ? false : true) {
        clientLocal.login(bot_token);
        clientLocal.on("ready", () => {
          console.info(`\nLogged in as ${clientLocal.user.tag}.`);
          c.emit("ready", { client: clientLocal, srcFolder });
        });
        return clientLocal;
      } else {
        client.login(bot_token);
        client.on("ready", () => {
          console.info(`\nLogged in as ${client.user.tag}.`);
          c.emit("ready", { client, srcFolder });
        });
        return client;
      }
    } else {
      c.emit("ready", { client, srcFolder });
      return client;
    }
  } else {
    console.info("Please login with client before initializing or provide client token");
  }
};

c.on("ready", async ({ srcFolder, client }) => {
  //Loading files
  await require("./load/loadFiles")({ srcFolder });
  //Registering global commands
  await require("./register/decider")({ client });
});
