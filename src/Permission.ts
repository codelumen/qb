export interface IPermission {
    id: string,
    description: string,
    nested?: Permission[]
}


export default class Permission implements IPermission {
    public id: string;
    public description: string;
    public nested: Permission[];

    public toJSON(): string {
        return JSON.stringify({
            id: this.id,
            description: this.description,
            nested: this.nested.map(p => p.toJSON())
        });
    }

    public includes(id: string): boolean {
        if (id === this.id) return true;
        for (let nested of this.nested) {
            if (nested.includes(id)) return true;
        }
    }

    constructor({ id, description, nested }: IPermission) {
        this.id = id;
        this.description = description;
        this.nested = nested || [];
    }
}