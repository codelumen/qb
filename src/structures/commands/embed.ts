import { SlashCommandBuilder } from "@discordjs/builders";


export default new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Отправляет декоративное сообщение в определенный канал. (Используйте \\n для многострочного текста)')
    .addStringOption(option => option.setName('текст').setDescription('Текст эмбеда.').setRequired(true))
    .addChannelOption(option => option.setName('канал').setDescription('Канал, куда будет отправлено сообщение.'))
    .addStringOption(option => option.setName('заголовок').setDescription('Заголовок эмбеда.'))
    .addAttachmentOption(option => option.setName('изображение').setDescription('Изображение в эмбеде.'))
    .addBooleanOption(option => option.setName('авторство').setDescription('Отображение автора эмбеда.'))
    .addStringOption(option => option.setName('цвет').setDescription('Цвет контура эмбеда.').addChoices(
        { name: 'Прозрачный', value: '#2F3136' },
        { name: 'Белый', value: '#FFFFFF' },
        { name: 'Черный', value: '#000000' },
        { name: 'Красный', value: '#CD2626' },
        { name: 'Жёлтый', value: '#E0AC25' },
        { name: 'Зелёный', value: '#26CD2D' },
        { name: 'Акцентный(феолетовый)', value: '#3A41E4' }
    ))
    .addStringOption(option => option.setName('редактировать').setDescription('Редактировать уже имеющееся сообщение. (ID)'));