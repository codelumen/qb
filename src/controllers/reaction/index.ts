import { Message, MessageReaction } from "discord.js";
import { Controller, ControllerConstructor } from "../../Controller";
import DynamicReactionMessage from "../../DynamicReactionMessage";
import ReactionEvent from "../../ReactionEvent";
import { VerifyController } from "./verify";


export default new (
    class ReactionController extends Controller<ReactionEvent> {
        public static nested: ControllerConstructor<ReactionEvent>[] = [
            VerifyController
        ];

        public callback(reaction: ReactionEvent) {
            for (let message of DynamicReactionMessage.list) {
                if (message.message.id === reaction.event.message.id) {
                    message.handle(reaction);
                    break;
                }
            }
        }

        public get nested() { return ReactionController.nested }
    }
);