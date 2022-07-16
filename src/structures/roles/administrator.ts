import Role from "../../Role";
import moderator from "./moderator";


export default new Role({
    name: 'Администратор',
    weight: 100,
    permissions: [
        // soon
    ],
    inherits: [ moderator ]
});