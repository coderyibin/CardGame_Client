import Pomelo from "../../Frame/pomelo/pomelo";
import { Common, ROUTE } from "../../Frame/common/Common";

/**
 * 该类为随从伙伴控制类
 */

export default class PartnerMgr {
    private static _ctor : PartnerMgr;
    public static getInstance () : PartnerMgr {
        if (! this._ctor) {
            this._ctor = new PartnerMgr();
        }
        return this._ctor;
    }

    //请求玩家第一个随从
    reqFirstPartner () : void {
        Pomelo.getInstance().request(ROUTE.GETPARTNER, {
            
        }, (data)=>{

        });
    }
}