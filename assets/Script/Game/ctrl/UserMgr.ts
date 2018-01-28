import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";


export default class UserMgr extends BaseCtrl {
    private static _ctor : UserMgr;
    public static getInstance () : UserMgr {
        if (! this._ctor) {
            this._ctor = new UserMgr();
        }
        return this._ctor;
    }

    reqLogin (msg : any) : void {
        this._initPomelo(msg, (data)=>{
            pomelo.getInstance().request(ROUTE.LOGIN, {
                uid : msg.account,
                password : msg.password
            }, (data)=>{

            });
        });
    }
}