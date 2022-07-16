import { Controller, Endpoint } from './Controller';
import ReactionEvent from './ReactionEvent';


@Endpoint
export class ReactionController extends Controller<ReactionEvent> {
    public readonly messageId: string;
    public readonly channelId: string;

    public on(reaction: ReactionEvent) { }

    public async validation(reaction: ReactionEvent): Promise<boolean> {
        return reaction.event.message.id === this.messageId && reaction.event.message.channelId === this.channelId;
    }

    public async callback(reaction: ReactionEvent) {
        this.on(reaction);
    }
}