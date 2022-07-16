import { CommandInteraction, CacheType } from "discord.js";
import { Controller, ControllerConstructor } from "../../../Controller";
import { HealthController } from './health';
import { EmbedController } from './embed';
import { TestController } from "./test";
import ReplyableEvent from '../../../ReplyableEvent';
import moderation from "./moderation";


export default new (
    class CommandInteractionController extends Controller<ReplyableEvent<CommandInteraction<CacheType>>> {
        public static nested: ControllerConstructor<ReplyableEvent<CommandInteraction<CacheType>>>[] = [
            HealthController,
            EmbedController,
            TestController,
            ...moderation
        ];

        public get nested() { return CommandInteractionController.nested }
    }
);