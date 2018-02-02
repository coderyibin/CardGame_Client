import Pomelo from "../../Frame/pomelo/pomelo";
import { Common, ROUTE } from "../../Frame/common/Common";
import { UserMgr } from "./UserMgr";

/**
 * 该类为随从伙伴控制类
 */

export default class PartnerMgr {
    private static _pctor : PartnerMgr;
    public static getInstance () : PartnerMgr {
        if (! this._pctor) {
            this._pctor = new PartnerMgr();
        }
        return this._pctor;
    }

    //进入试炼场战斗
    reqFirstPartner () : void {
        Pomelo.getInstance().request(ROUTE.GETPARTNER, {
            uid : UserMgr.getInstance().getUserInfo().id,
        }, (data)=>{
            
        });
    }
}