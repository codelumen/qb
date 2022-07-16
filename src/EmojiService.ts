import { client } from "../client";
import Emoji from "./Emoji";


/**
 * Used for fast access to preloaded developer emojies.
 */
export default class EmojiService {
    /**
     * Needed to avoid similar names.
     */
    static prefix: string = 'developer_';
    static list: Emoji[] = [];

    static init() {
        this.list = '\
        notcheck blobgun check ohshit ksweat ksecret kgasm kflushed \
        kdrool kcry idle feral connection_stable connection_moderate \
        connection_bad blobspin sosad derpypuddle fhshock horror nya \
        fhsnooze nooo alternate panic disbelief thinking nya2 happysarcasm \
        strongblush ohgod sleepy sparkle blush giveheart blush2 \
        peacesign smilingnaruto bigflooshed cuteflushed heartsplead \
        epicawesome verify\
        '.split(/\s/g).filter(e => e).map(name => Emoji.load(this.prefix + name));
    }

    static pick(between?: string | string[]) {
        if (!between) {
            return this.list[Math.floor(Math.random() * this.list.length)];
        } else if (typeof between === 'string') {
            between = between.split(/\s/g).filter(e => e);
            return this.get(between[Math.floor(Math.random() * between.length)]);
        }
    }

    static get(name: string) {
        let emoji = EmojiService.list.find(emoji => emoji.name === this.prefix + name);
        if (!emoji) throw `Emoji ${name} not found.`;
        return emoji;
    }

    static insert(name: string) {
        return this.get(name).cache;
    }
}