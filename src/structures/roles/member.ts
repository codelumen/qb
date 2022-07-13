import Role from "../../Role";
import health from "../permissions/health";


export default new Role({
    name: 'Участник',
    weight: 0,
    permissions: [ health ]
});