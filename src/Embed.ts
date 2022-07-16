import { ColorResolvable, GuildMember, MessageEmbed } from "discord.js";
import { APIInteractionGuildMember } from "discord-api-types/v9";
import EmojiService from "./EmojiService";


export interface EmbedOptions {
    text?: string,
    member?: GuildMember | APIInteractionGuildMember,
    title?: string,
    fields?: [string, string, boolean?][]
    image?: string,
    color?: string,
    author?: boolean,
    invisible?: boolean
}


export default class Embed {
    static colors = {
        positive: '#26CD2D',
        negative: '#CD2626',
        moderate: '#E0AC25',
        accent: '#3A41E4'
    }

    private static templateMessageVariantPicker(template: any) {
        return `${EmojiService.pick(template.emojies).cache} ${template.titles[Math.floor(Math.random() * template.titles.length)]}`;
    }

    static templates = {
        success: {
            emojies: 'blush2 sparkle nya nya2',
            titles: [
                'Мегахорош',
                'Чел хорош',
                'Фулл есть',
                'Да, это реально',
                'Россия, вперед!',
                'PogChamp',
                'Sigma male moment',
                'Ахуительно ахуебительно ебать просто неебически',
            ],
            pick: () => this.templateMessageVariantPicker(this.templates.success)
        },
        fail: {
            emojies: 'thinking disbelief nooo fhshock \
            derpypuddle ohshit ksweat kflushed kcry sosad',
            titles: [
                'Оу...',
                'Погодите, это реально?',
                'Это фиаско, братан',
                'Ты втираешь мне какую-то дичь',
                'Фулла не будет',
                'Первое правило бойцовского клуба',
                'Че, закибербуллили тебя, да?',
                'А ловко ты это придумал',
                'Ты запостил кринж',
                'Блядь, я себя захуярил',
                'Твой софт - дерьмо',
                'Бляяя, братан',
                'I can\'t believe you done this',
                'Знаешь что, я так подумал, ты ахуел в край'
            ],
            pick: () => this.templateMessageVariantPicker(this.templates.fail)
        }
    }

    static new(options: EmbedOptions) {
        let embed = new MessageEmbed()
        .setDescription(options.text || '')
        .setColor((options.color || '#2F3136') as ColorResolvable);;

        if (options.title) embed.setTitle(options.title);
        if (options.fields) options.fields.forEach(field => embed.addField(field[0], field[1], field[2]))
        if (options.image) embed.setImage(options.image);
        if (options.author) {
            embed.setFooter({
                text: `${options.member.user.username}#${options.member.user.discriminator}`,
                iconURL: `https://cdn.discordapp.com/avatars/${options.member.user.id}/${options.member.user.avatar}.png`
            });
        }

        return {
            embeds: [
                embed
            ],
            ephemeral: options.invisible
        };
    }

    static success(text: string, title?: string, invisible?: boolean) {
        return Embed.new({
            text: text,
            title: title || this.templates.success.pick(),
            color: Embed.colors.positive,
            invisible: invisible
        });
    }

    static fail(text: string, title?: string, invisible?: boolean) {
        return Embed.new({
            text: text,
            title: title || this.templates.fail.pick(),
            color: Embed.colors.negative,
            invisible: invisible
        });
    }


    static warning(text: string, title?: string, invisible?: boolean) {
        return Embed.new({
            text: text,
            title: title || `${EmojiService.insert('happysarcasm')} Осторожно`,
            color: Embed.colors.moderate,
            invisible: invisible
        });
    }

    static accent(text: string, title?: string, invisible?: boolean) {
        return Embed.new({
            text: text,
            title: title,
            color: Embed.colors.accent,
            invisible: invisible
        });
    }
}