import { CommandInteraction, CacheType } from "discord.js";
import { Controller, ControllerConstructor } from "../../../Controller";
import { HealthController } from './health';
import { EmbedController } from './embed';


export default new (
    class CommandInteractionController extends Controller<CommandInteraction<CacheType>> {
        public static nested: ControllerConstructor<CommandInteraction<CacheType>>[] = [
            HealthController,
            EmbedController
        ];

        public get nested() { return CommandInteractionController.nested }
    }
);