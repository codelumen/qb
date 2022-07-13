import Permission from "../../../Permission";
import ban from "./ban";
import kick from "./kick";
import mute from "./mute";


export default new Permission({
    id: 'moderation',
    description: 'Группа прав для модераторов и администрации.',
    nested: [ kick, mute, ban ]
});