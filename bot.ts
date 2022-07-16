import 'dotenv/config';
import { Log } from './src/utils/Log';
import { client } from './client';
import { config } from './config';
import MessageController from './src/controllers/message';
import CommandInteractionController from './src/controllers/interaction/command';
import ReactionController from './src/controllers/reaction';
import EmojiService from './src/EmojiService';
import { CacheType, CommandInteraction, MessageReaction, User } from 'discord.js';
import ReplyableEvent from './src/ReplyableEvent';
import ReactionEvent from './src/ReactionEvent';


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
    if (interaction.isCommand()) return CommandInteractionController.handle(
        new ReplyableEvent<CommandInteraction<CacheType>>({
            guild: interaction.guild,
            member: interaction.member,
            event: interaction,
            when: Date.now()
        })
    );
})

client.on('messageReactionAdd', async (reaction: MessageReaction, user: User) => {
    if (!reaction.message.guild) return;
    ReactionController.handle(
        new ReactionEvent({
            type: 'add',
            event: reaction,
            guild: reaction.message.guild,
            member: await reaction.message.guild.members.fetch({ user }),
            when: Date.now()
        })
    );
});

client.on('messageReactionRemove', async (reaction: MessageReaction, user: User) => {
    if (!reaction.message.guild) return;
    ReactionController.handle(
        new ReactionEvent({
            type: 'remove',
            event: reaction,
            guild: reaction.message.guild,
            member: await reaction.message.guild.members.fetch({ user }),
            when: Date.now()
        })
    );
});