export interface IPermission {
    readonly id: string,
    readonly description: string,
    readonly nested?: Permission[]
}


export default class Permission implements IPermission {
    public readonly id: string;
    public readonly description: string;
    public readonly nested: Permission[];

    public toJSON(): string {
        return JSON.stringify({
            id: this.id,
            description: this.description,
            nested: this.nested.map(p => p.toJSON())
        });
    }

    public includes(permission: Permission): boolean {
        if (permission.id === this.id) return true;
        for (let nested of this.nested) {
            if (nested.includes(permission)) return true;
        }
    }

    constructor({ id, description, nested }: IPermission) {
        this.id = id;
        this.description = description;
        this.nested = nested || [];
    }
}