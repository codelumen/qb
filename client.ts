import 'dotenv/config';
import { Client, Intents } from 'discord.js';
 
 
export const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: [ 'MESSAGE', 'CHANNEL', 'REACTION' ]
});