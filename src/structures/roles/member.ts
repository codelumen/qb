import Role from "../../Role";
import health from "../permissions/health";
import test from "../permissions/test";


export default new Role({
    name: '✅ Участник',
    weight: 0,
    permissions: [ health, test ]
});