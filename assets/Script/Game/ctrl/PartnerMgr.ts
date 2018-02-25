import Pomelo from "../../Frame/pomelo/pomelo";
import { Common, ROUTE } from "../../Frame/common/Common";
import { UserMgr } from "./UserMgr";
import CustEmitter from "../../Frame/ctrl/CustEmitter";

/**
 * 该类为随从伙伴控制类
 */

export default class PartnerMgr {
    _event : CustEmitter;
    private static _pctor : PartnerMgr;
    public static getInstance () : PartnerMgr {
        if (! this._pctor) {
            this._pctor = new PartnerMgr();
            this._pctor._event = CustEmitter.getInstance();
        }
        return this._pctor;
    }

    //获取一只随从
    reqFirstPartner () : void {
        Pomelo.getInstance().request(ROUTE.GETPARTNER, {
            uid : UserMgr.getInstance().getUserInfo().id,
        }, (data)=>{
            this._event.emit("onShowPartnerMsg", data.partner);
        });
    }
}