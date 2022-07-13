import { CacheType, ColorResolvable, CommandInteraction, GuildTextBasedChannel, MessageEmbed } from "discord.js";
import { CommandController } from "../../../CommandController";
import Permission from "../../../Permission";
import embed from "../../../structures/permissions/editing/embed";
import { failMessage, successMessage } from "../../../utils/messageWrapper";


export class EmbedController extends CommandController {
    public name = 'embed';
    public perm: Permission = embed;

    public async callback(interaction: CommandInteraction<CacheType>) {
        let embed = new MessageEmbed()
            .setDescription(interaction.options.getString('описание', true));

        let title = interaction.options.getString('заголовок');
        let image = interaction.options.getAttachment('изображение');
        let color = interaction.options.getString('цвет');
        let editId = interaction.options.getString('редактировать');

        if (title) embed.setTitle(title);
        if (image) embed.setImage(image.url);
        if (color) embed.setColor(color as ColorResolvable);
        if (interaction.options.getBoolean('авторство')) {
            embed.setFooter({
                text: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
                iconURL: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
            });
        }

        let targetChannel = await interaction.guild.channels.fetch(interaction.options.getChannel('канал').id);
        if (targetChannel.isText) {
            if (editId) {
                try {
                    let message = await (targetChannel as GuildTextBasedChannel).messages.fetch(editId);
                    await message.edit({ embeds: [ embed ] });
                } catch(e) {
                    await interaction.reply(failMessage('Данное сообщение не найдено. Убедитесь, что указан верный канал и идентификатор.'));
                    return;
                }
            } else {
                (targetChannel as GuildTextBasedChannel).send({ embeds: [ embed ] });
            }
        }

        await interaction.reply(successMessage('Сообщение создано/отредактировано.'));
    }
}