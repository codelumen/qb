export type ControllerConstructor<T> = new (...args : any[]) => Controller<T>;

export abstract class Controller<T> {
    private nestedControllersInstances: Controller<T>[] = [];
    public endpoint = false;

    public validation(event: T): boolean | Promise<boolean> { return true }
    public permission(event: T): boolean | Promise<boolean> { return true }
    public callback(event: T): any | Promise<any> { }
    public denied(event: T): any | Promise<any> { }

    public get nested(): ControllerConstructor<T>[] { return [] }

    async handle(event: T) {
        if (await this.validation(event)) {
            if (!(await this.permission(event))) {
                await this.denied(event);
                return;
            }
            await this.callback(event);
            if (this.endpoint) return;
        }

        for (let nestedControllerInstance of this.nestedControllersInstances) {
            nestedControllerInstance.handle(event);
        }
    }

    initiateNestedControllers() {
        this.nestedControllersInstances = this.nested.map(controllerConstructor => {
            let controllerInstance = new controllerConstructor();
            controllerInstance.initiateNestedControllers();
            return controllerInstance;
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

export function Nest<T>(container: ControllerConstructor<T>[]) {
    return function(constructor: ControllerConstructor<T>) {
        container.push(constructor);
    }
}
