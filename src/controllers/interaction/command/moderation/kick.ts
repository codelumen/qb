import { CacheType, CommandInteraction } from "discord.js";
import { config } from "../../../../../config";
import { CommandController } from "../../../../CommandController";
import Embed from "../../../../Embed";
import Permission from "../../../../Permission";
import ReplyableEvent from "../../../../ReplyableEvent";
import RoleService from "../../../../RoleService";
import kick from "../../../../structures/permissions/moderation/kick";


export class KickController extends CommandController {
    public name = 'kick';
    public perm: Permission = kick;

    public async callback(interaction: ReplyableEvent<CommandInteraction<CacheType>>) {
        let member = await interaction.fetchMember(await interaction.event.options.getUser('участник'));
        if (!member) {
            return interaction.reply(Embed.fail('Данного пользователя нет на сервере.', null, true));
        } else if (member.user.id === interaction.member.user.id) {
            return interaction.reply(Embed.fail('Вы не можете кикнуть самого себя.', null, true));
        } else if (member.user.id === config.botId) {
            return interaction.reply(Embed.fail('Бот не может кикнуть самого себя.', null, true));
        } else if ((await RoleService.getWeight(member, interaction.guild)) >= (await interaction.getWeight())) {
            return interaction.reply(Embed.fail('Данный участник имеет роль, стоящую выше или равную твоей.', null, true));
        } else {
            let reason = interaction.event.options.getString('причина');
            await member.kick(reason || '');
            (await interaction.reply(Embed.new({
                title: 'Кик',
                member: interaction.member,
                fields: [
                    [ 'Пользователь', `<@${member.user.id}>`, true ],
                    [ 'Причина', reason || 'Не указана', true ]
                ],
                color: Embed.colors.negative,
                author: true
            }))).vanishAfter(3000);
        }
    }
}