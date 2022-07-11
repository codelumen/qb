import 'colors';


const timeFormat = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
};

type LogType = 'input' | 'info' | 'warn' | 'error' | 'success';

enum Colors {
    'input' = 'bgBlue',
    'info' = 'bgBlue',
    'warn' = 'bgYellow',
    'error' = 'bgRed',
    'success' = 'bgGreen'
};


export class Log {
    public alias: string;

    constructor(alias: string) {
        this.alias = alias;
    }

    input(message: any) {
        this.log(message, 'input');
    }

    info(message: any) {
        this.log(message, 'info');
    }

    warn(message: any) {
        this.log(message, 'warn');
    }

    error(message: any) {
        this.log(message, 'error');
    }

    success(message: any) {
        this.log(message, 'success');
    }

    log(message: any, type: LogType) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message, null, 4);
        }

        let time = timeFormat(new Date()).gray;
        let alias = this.alias.bgWhite.black;

        if (type) {
            let color = Colors[type];
            alias = this.alias[color];
            if ([ 'info', 'warn', 'error', 'success' ].includes(type)) {
                alias += ':';
            } else if (type == 'input') {
                message += ': ';
            }
        }

        console.log(`${time} ${alias} ${message}`);
    }
}