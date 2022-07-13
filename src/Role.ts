import Permission from "./Permission";


export interface IRole {
    name: string,
    weight: number,
    permissions: Permission[],
    inherits?: Role[];
}


export default class Role implements IRole {
    public name: string;
    public weight: number;
    public permissions: Permission[];
    public inherits: Role[];

    public hasPermission(id: string) {
        let inheritedPermissions = this.inherits.map(r => r.permissions).reduce((a, b) => a .concat(b));
        return this.permissions.concat(inheritedPermissions).some(permission => permission.id === id);
    }

    constructor({ name, weight, permissions, inherits }: IRole) {
        this.name = name;
        this.weight = weight;
        this.permissions = permissions;
        this.inherits = inherits;
    }
}