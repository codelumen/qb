import { SlashCommandBuilder } from "@discordjs/builders";


export default new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Кикает пользователя с сервера.')
    .addUserOption(option => option.setName('участник').setDescription('Участник, которого необходимо кикнуть').setRequired(true))
    .addStringOption(option => option.setName('причина').setDescription('Вы можете указать причину кика.'));