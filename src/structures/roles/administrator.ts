import Role from "../../Role";
import moderator from "./moderator";


export default new Role({
    name: 'Модератор',
    weight: 50,
    permissions: [
        // soon
    ],
    inherits: [ moderator ]
});