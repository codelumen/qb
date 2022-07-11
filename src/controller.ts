export type ControllerFabric<T> = new (...args : any[]) => Controller<T>;

export abstract class Controller<T> {
    private nestedControllersInstances: Controller<T>[] = [];
    public endpoint = false;

    abstract permission(event: T): boolean | Promise<boolean>;
    abstract callback(event: T): any | Promise<any>;

    abstract get nest(): ControllerFabric<T>[];

    async handle(event: T) {
        if (!(await this.permission(event))) {
            if (this.endpoint) return;
        } else {
            await this.callback(event);
        }

        for (let nestedControllerInstance of this.nestedControllersInstances) {
            nestedControllerInstance.handle(event);
        }
    }

    initiateNestedControllers() {
        this.nestedControllersInstances = this.nest.map(extension => {
            let extensionInstance = new extension();
            extensionInstance.initiateNestedControllers();
            return extensionInstance;
        })
    }

    constructor() {
        this.initiateNestedControllers();
    }
}

export function Endpoint<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        public endpoint: boolean;
        constructor(...args: any[]) {
            super(...args);
            this.endpoint = true;
        }
    }
}

export function Nest<T>(container: ControllerFabric<T>[]) {
    return function(constructor: ControllerFabric<T>) {
        container.push(constructor);
    }
}