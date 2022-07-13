import { Message } from "discord.js";
import { Controller, ControllerConstructor } from "../../Controller";


export default new (
    class MessageController extends Controller<Message<boolean>> {
        public static nested: ControllerConstructor<Message<boolean>>[] = [
            
        ];

        public get nested() { return MessageController.nested }
    }
);