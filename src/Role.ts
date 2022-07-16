import { Guild } from "discord.js";
import Permission from "./Permission";


export interface IRole {
    readonly name: string,
    readonly weight: number,
    readonly permissions: Permission[],
    readonly inherits?: Role[];
}


export default class Role implements IRole {
    public readonly name: string;
    public readonly weight: number;
    public readonly permissions: Permission[] = [];
    public readonly inherits: Role[] = [];

    public hasPermission(permission: Permission) {
        return this.permissions.concat(
            this.inherits ? this.inherits.map(r => r.permissions).reduce((a, b) => a.concat(b)) : []
        ).some(p => p.id === permission.id);
    }

    public in(guild: Guild) {
        return guild.roles.cache.find(r => r.name === this.name);
    }

    constructor({ name, weight, permissions, inherits }: IRole) {
        this.name = name;
        this.weight = weight;
        this.permissions = permissions;
        this.inherits = inherits;
    }
}