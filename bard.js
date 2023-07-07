import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
global.fetch = fetch;
import Bard, { askAI } from "bard-ai";

await Bard.init(process.env.COOKIE_KEY);

/**
 * 
 * @param {*} text 
 * @returns answer from bard
 */
async function getBard(text) {
  let myConversation = new Bard.Chat();
  try{
    const answer = await myConversation.ask(text);
    return answer;
  }
  catch(err){
    console.log(err);
  }
}

export { getBard };