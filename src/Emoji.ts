import { GuildEmoji } from "discord.js";
import { client } from "../client";


export default class Emoji {
    public name: string;
    public cache: GuildEmoji;

    static load(name: string) {
        let cache = client.emojis.cache.find(emoji => emoji.name === name);
        if (!cache) throw `Emoji ${name} not found.`;
        return new Emoji(name, cache);
    }

    private constructor(name: string, cache: GuildEmoji) {
        this.name = name;
        this.cache = cache;
    }
}