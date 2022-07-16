import { CommandInteraction, CacheType, Message } from "discord.js";
import { CommandController } from "../../../CommandController";
import DynamicReactionMessage from "../../../DynamicReactionMessage";
import Embed from "../../../Embed";
import EmojiService from "../../../EmojiService";
import ReplyableEvent from "../../../ReplyableEvent";
import Permission from "../../../Permission";
import test from "../../../structures/permissions/test";


export class TestController extends CommandController {
    public name = 'test';
    public perm: Permission = test;
    
    public async callback(interaction: ReplyableEvent<CommandInteraction<CacheType>>) {
        let reactionMessage = (await interaction.reply(Embed.new({
            title: 'Подтверждение',
            text: 'Необходимо подтвердить данное действие, нажми на реакцию снизу.'
        })));

        let reactionMessageHandler = await DynamicReactionMessage.create({
            message: reactionMessage.message as Message<boolean>,
            guild: interaction.event.guild,
            channelId: interaction.event.channelId,
            setupEmojis: [ EmojiService.get('verify') ]
        });

        reactionMessageHandler.on(async reaction => {
            if (reaction.member.user.id !== interaction.member.user.id) return;
            reactionMessage.message.edit(Embed.success('Действие успешно подтверждено.'));
            reactionMessage.vanishAfter(1000);
        });
    }
}