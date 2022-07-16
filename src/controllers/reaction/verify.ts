import { GuildMemberRoleManager } from "discord.js";
import { ReactionController } from "../../ReactionController";
import ReactionEvent from "../../ReactionEvent";
import memberRole from "../../structures/roles/member";


export class VerifyController extends ReactionController {
    public messageId = '996875061279592518';
    public channelId = '995455884262113280';

    public async on(reaction: ReactionEvent) {
        if (reaction.type === 'add') {
            (reaction.member.roles as GuildMemberRoleManager).add(memberRole.in(reaction.guild));
        }
    }
}