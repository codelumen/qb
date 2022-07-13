import Permission from "../../../Permission";
import embed from "./embed";


export default new Permission({
    id: 'editing',
    description: 'Группа прав для редакторов.',
    nested: [ embed ]
});