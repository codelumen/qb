import Role from "../../Role";
import moderation from "../permissions/moderation";
import member from "./member";


export default new Role({
    name: 'Модератор',
    weight: 50,
    permissions: [
        moderation
    ],
    inherits: [ member ]
});