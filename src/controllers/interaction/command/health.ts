import { CacheType, CommandInteraction } from "discord.js";
import * as os from 'os-utils';
import EmojiService from "../../../EmojiService";
import { CommandController } from "../../../CommandController";
import Permission from "../../../Permission";
import health from "../../../structures/permissions/health";
import ReplyableEvent from '../../../ReplyableEvent';
import Embed from "../../../Embed";


export class HealthController extends CommandController {
    public name = 'health';
    public perm: Permission = health;

    public async callback(interaction: ReplyableEvent<CommandInteraction<CacheType>>) {
        let latency = interaction.when - interaction.event.createdTimestamp;

        await interaction.event.deferReply()

        let cpuUsage = ((await new Promise(res => os.cpuUsage(res))) as number) * 100;
        let totalRAM = os.totalmem() as number;
        let usedRAM = totalRAM - os.freemem();

        let latencyLoad = 1 - latency / 500;
        let cpuStateLoad = 1 - cpuUsage / 100;
        let ramStateLoad = 1 - usedRAM / totalRAM;
        let totalLoad = (latencyLoad + cpuStateLoad + ramStateLoad) / 3;
        let loadEmoji = totalLoad < 0.33 ?
            EmojiService.insert('connection_stable') : (totalLoad < 0.66 ?
                EmojiService.insert('connection_moderate') : EmojiService.insert('connection_bad'));
    
        await interaction.event.editReply(Embed.new({
            title: `${loadEmoji} Состояние сервера`,
            text: 'Если индикатор красный, то скорее всего происходят технические неполадки. В таком случае необходимо информировать разработчика.',
            fields: [
                [ `Latency`, latency.toString() + 'ms', true ],
                [ `CPU`, cpuUsage.toFixed(0) + '%', true ],
                [ `RAM`, `${ +usedRAM.toFixed(0) / 1000 }/${ +totalRAM.toFixed(0) / 1000 } GB`, true ]
            ]
        }));
    }
}