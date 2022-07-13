import { APIInteractionGuildMember } from "discord-api-types/v9";
import { ColorResolvable, GuildMember, MessageEmbed, MessagePayload } from "discord.js"
import { client } from "../../client";
import EmojiService from "../EmojiService";

export interface MessageWrapper {
    text?: string,
    member?: GuildMember | APIInteractionGuildMember,
    title?: string,
    fields?: [string, string, boolean?][]
    image?: string,
    color?: string,
    author?: boolean,
    invisible?: boolean
}

export function messageWrapper(data: MessageWrapper) {
    let embed = new MessageEmbed()
        .setDescription(data.text || '')
        .setColor((data.color || '#2F3136') as ColorResolvable);;

    if (data.title) embed.setTitle(data.title);
    if (data.fields) data.fields.forEach(field => embed.addField(field[0], field[1], field[2]))
    if (data.image) embed.setImage(data.image);
    if (data.author) {
        embed.setFooter({
            text: data.member.user.username,
            iconURL: `https://cdn.discordapp.com/avatars/${data.member.user.id}/${data.member.user.avatar}.png`
        });
    }

    return {
        embeds: [
            embed
        ],
        ephemeral: data.invisible
    };
}

export function successMessage(text: string, title?: string, invisible?: boolean) { 
    return messageWrapper({
        text: `${EmojiService.get('botsuccess')} ${text}`,
        title: title,
        color: '#26CD2D',
        invisible: invisible
    })
}

export function failMessage(text: string, title?: string, invisible?: boolean) {
    return messageWrapper({
        text: `${EmojiService.get('botfail')} ${text}`,
        title: title,
        color: '#CD2626',
        invisible: invisible
    })
}

export function warningMessage(text: string, title?: string, invisible?: boolean) {
    return messageWrapper({
        text: `${EmojiService.get('botwarning')} ${text}`,
        title: title,
        color: '#E0AC25',
        invisible: invisible
    })
}

export function accentMessage(text: string, title?: string, invisible?: boolean) {
    return messageWrapper({
        text: `${text}`,
        title: title,
        color: '#3A41E4',
        invisible: invisible
    })
}