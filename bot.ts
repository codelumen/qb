import 'dotenv/config';
import { Log } from './src/utils/Log';
import { client } from './client';
import { config } from './config';
import MessageController from './src/controllers/message';
import CommandInteractionController from './src/controllers/interaction/command';
import EmojiService from './src/EmojiService';


export const log = new Log('Bot');

client.login(config.apiToken);

client.once('ready', () => {
    log.info('Launched.');
    EmojiService.init();
});

client.on('messageCreate', async msg => {
    if (msg.author.bot || !msg.guild) return;
    MessageController.handle(msg);
})

client.on('interactionCreate', async interaction => {
    if (!interaction.guild) return;
    if (interaction.isCommand()) return CommandInteractionController.handle(interaction);
})