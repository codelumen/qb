import { CacheType, CommandInteraction, Message } from "discord.js";
import { messageWrapper } from '../../../utils/messageWrapper';
import * as os from 'os-utils';
import { stateEmoji } from "../../../utils/stateEmoji";
import EmojiService from "../../../EmojiService";
import { CommandController } from "../../../CommandController";
import Permission from "../../../Permission";
import health from "../../../structures/permissions/health";


export class HealthController extends CommandController {
    public name = 'health';
    public perm: Permission = health;

    public async callback(interaction: CommandInteraction<CacheType>) {
        let latency = new Date().getTime() - interaction.createdTimestamp;
        let cpuUsage = ((await new Promise(res => os.cpuUsage(res))) as number) * 100;
        let totalRAM = os.totalmem() as number;
        let usedRAM = totalRAM - os.freemem();

        let latencyState = stateEmoji(latency / 1000, true);
        let cpuState = stateEmoji(cpuUsage / 100, true);
        let ramState = stateEmoji(usedRAM / totalRAM, true);
    
        await interaction.reply(messageWrapper({
            title: `${EmojiService.get('botstats')} Состояние сервера`,
            text: 'Неполадки происходят в том случае, если большинство индикаторов желтые или красные. В таком случае информируйте администрацию сервера.',
            fields: [
                [ `${latencyState} Latency`, latency.toString() + 'ms', true ],
                [ `${cpuState} CPU`, cpuUsage.toFixed(0) + '%', true ],
                [ `${ramState} RAM`, `${ +usedRAM.toFixed(0) / 1000 }/${ +totalRAM.toFixed(0) / 1000 } GB`, true ]
            ]
        }));
    }
}