import qrcode from "qrcode-terminal";
import Whatsapp from "whatsapp-web.js";
const { Client, RemoteAuth } = Whatsapp;
import { toEnglish, toIndonesia } from "./translate.js";
import { getBard } from "./bard.js";
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";

const uri = String(process.env.MONGO_URI);
mongoose.connect().then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
      authStrategy: new RemoteAuth({
          store: store,
          backupSyncIntervalMs: 300000
      })
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  
  client.on("ready", () => {
    console.log("Client is ready!");
  });
  client.initialize();
  client.on("message", async (message) => {
    if (message.body.startsWith("!") && message.body.length > 2) {
      const command = message.body.substring(1).trim();
      try {
        const english = await toEnglish(command);
        const bard = await getBard(english);
        // const indonesia = await toIndonesia(bard);
        message.reply(bard);
      } catch (err) {
        console.error(err);
      }
    } else {
      message.reply(
        "Dimulai dengan tanda seru (!), contoh: !halo. \nhasil hanya dalam bahasa Inggris. \nLimit input 1000 character. \nKalo blank coba input ulang. \nBelum nemu API gratis yang bisa translate ke bahasa Indonesia :v"
      );
    }
  });
});

