import * as shedule from 'node-schedule';


export default abstract class Updater<T> {
    public updateTimeoutTime: string
    public updateCycleInterval: shedule.RecurrenceRule;
    public updateCycle: shedule.Job;

    abstract load(data: T);
    abstract request(): T | Promise<T>;

    public async update() {
        await this.load(await this.request());
    }

    public startTimeout() {
        new shedule.Job(this.updateTimeoutTime, () => {
            this.update();
        });
    }

    public startUpdateCycle() {
        this.updateCycle = shedule.scheduleJob(this.updateCycleInterval, () => {
            this.update();
        });
    }

    public stopUpdateCycle() {
        this.updateCycle.cancel();
    }

    constructor() {
        if (this.updateTimeoutTime) {
            this.startTimeout();
        } else if (this.updateCycleInterval) {
            this.startUpdateCycle();
        }
    }
}

