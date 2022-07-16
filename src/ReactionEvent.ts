import { MessageReaction } from "discord.js";
import Event, { IEvent } from "./Event";


export default class ReactionEvent extends Event<MessageReaction> {
    public type: 'add' | 'remove';

    constructor({ event, member, guild, when, type }: IEvent<MessageReaction> & { type: 'add' | 'remove' }) {
        super({ event, member, guild, when });
        this.type = type;
    }
}