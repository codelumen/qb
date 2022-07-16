import { Guild, GuildTextBasedChannel, Message, MessagePayload } from "discord.js";
import Emoji from "./Emoji";
import ReactionEvent from "./ReactionEvent";


type DynamicReactionMessageParameters = {
    guild: Guild,
    setupEmojis: Emoji[],
    options?: string | MessagePayload,
    channelId?: string,
    message?: Message<boolean>
}


export default class DynamicReactionMessage {
    public message: Message<boolean>;
    public reactionCallbacks: ((reaction: ReactionEvent) => void)[] = [];

    static list: DynamicReactionMessage[] = [];

    static async create({ guild, options, channelId, setupEmojis, message }: DynamicReactionMessageParameters) {
        let msg = message ? message : await (await guild.channels.fetch(channelId) as GuildTextBasedChannel).send(options);

        for (let emoji of setupEmojis) await msg.react(emoji.cache);

        let instance = new DynamicReactionMessage(msg);

        DynamicReactionMessage.list.push(instance);

        return instance;
    }

    public async handle(reaction: ReactionEvent) {
        if (reaction.member.user.bot) return;
        this.reactionCallbacks.forEach(callback => callback(reaction));
    }

    public on(callback: (reaction: ReactionEvent) => void) {
        this.reactionCallbacks.push(callback);
    }

    constructor(message: Message<boolean>) {
        this.message = message;
    }
}
