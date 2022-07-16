import { CacheType, CommandInteraction, Message, MessageOptions, MessagePayload } from "discord.js";
import Event, { IEvent } from "./Event";


export default class ReplyableEvent<T> extends Event<T> {
    public lastReply: Message<boolean>;

    public async reply(options: string | MessageOptions) {
        if (this.event instanceof Message<boolean>) {
            let message = await this.event.reply(options);
            this.lastReply = message;
            return {
                message: message,
                async vanishAfter(ms: number) {
                    return new Promise<void>(res => {
                        setTimeout(async () => {
                            await message.delete();
                            res();
                        }, ms);
                    })
                },
                async vanish() {
                    await message.delete();
                }
            }
        } else if (this.event instanceof CommandInteraction<CacheType>) {
            let event = this.event;
            await this.event.reply(typeof options === 'string' ? options : new MessagePayload(this.event, options));
            let message = await this.event.fetchReply();
            this.lastReply = message;
            return {
                message: message,
                async vanishAfter(ms: number) {
                    return new Promise<void>(res => {
                        setTimeout(async () => {
                            await event.deleteReply();
                            res();
                        }, ms);
                    })
                },
                async vanish() {
                    await event.deleteReply();
                }
            }
        }
    }

    public async followUp(options: string | MessageOptions) {
        if (this.event instanceof Message<boolean>) {
            let message = await this.lastReply.reply(options);
            this.lastReply = message;
            return {
                message: message,
                async vanishAfter(ms: number) {
                    return new Promise<void>(res => {
                        setTimeout(async () => {
                            await message.delete();
                            res();
                        }, ms);
                    })
                },
                async vanish() {
                    await message.delete();
                }
            }
        } else if (this.event instanceof CommandInteraction<CacheType>) {
            let message = await this.event.followUp(typeof options === 'string' ? options : new MessagePayload(this.event, options));
            this.lastReply = message;
            return {
                message: message,
                async vanishAfter(ms: number) {
                    return new Promise<void>(res => {
                        setTimeout(async () => {
                            await message.delete();
                            res();
                        }, ms);
                    })
                },
                async vanish() {
                    await message.delete();
                }
            }
        }
    }

    constructor({ event, member, guild, when }: IEvent<T>) {
        super({ event, member, guild, when });
    }
}