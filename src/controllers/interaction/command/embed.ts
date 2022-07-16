import { CacheType, ColorResolvable, CommandInteraction, GuildTextBasedChannel, MessageEmbed } from "discord.js";
import { CommandController } from "../../../CommandController";
import Embed from "../../../Embed";
import Permission from "../../../Permission";
import ReplyableEvent from "../../../ReplyableEvent";
import embed from "../../../structures/permissions/editing/embed";


export class EmbedController extends CommandController {
    public name = 'embed';
    public perm: Permission = embed;

    public async callback(interaction: ReplyableEvent<CommandInteraction<CacheType>>) {
        let embed = new MessageEmbed()
            .setDescription(interaction.event.options.getString('текст', true).replaceAll('\\n', '\n'));

        let channelId = interaction.event.options.getChannel('канал')?.id;
        let title = interaction.event.options.getString('заголовок');
        let image = interaction.event.options.getAttachment('изображение');
        let color = interaction.event.options.getString('цвет');
        let editId = interaction.event.options.getString('редактировать');

        if (title) embed.setTitle(title);
        if (image) embed.setImage(image.url);
        if (color) embed.setColor(color as ColorResolvable);
        if (interaction.event.options.getBoolean('авторство')) {
            embed.setFooter({
                text: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
                iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
            });
        }

        let targetChannel = channelId ? await interaction.guild.channels.fetch(channelId) : interaction.event.channel;
        if (targetChannel.isText) {
            if (editId) {
                try {
                    let message = await (targetChannel as GuildTextBasedChannel).messages.fetch(editId);
                    await message.edit({ embeds: [ embed ] });
                } catch(e) {
                    await interaction.reply(Embed.fail('Данное сообщение не найдено. Убедитесь, что указан верный канал и идентификатор.'));
                    return;
                }
            } else {
                (targetChannel as GuildTextBasedChannel).send({ embeds: [ embed ] });
            }
        }

        await interaction.reply(Embed.success('Сообщение создано/отредактировано.', null, true));
    }
}