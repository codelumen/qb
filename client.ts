import 'dotenv/config';
import { Client, Intents } from 'discord.js';
 
 
export const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: [ 'CHANNEL' ]
});