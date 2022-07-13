import { client } from "../client";
import Emoji from "./Emoji";


export default class EmojiService {
    static list: Emoji[] = [];

    static init() {
        this.list = [
            Emoji.load('botsuccess'),
            Emoji.load('botfail'),
            Emoji.load('botpositive'),
            Emoji.load('botmoderate'),
            Emoji.load('botnegative'),
            Emoji.load('botoffline'),
            Emoji.load('botwarning'),
            Emoji.load('botstats')
        ];
    }

    static get(name: string) {
        let emoji = EmojiService.list.find(emoji => emoji.name === name);
        if (!emoji) throw `Emoji ${name} not found.`;
        return emoji.cache;
    }
}