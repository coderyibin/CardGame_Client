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

    //登陆游戏
    reqLogin (msg : any, cb : Function) : void {
        this._initPomelo(msg, (data)=>{
            pomelo.getInstance().request(ROUTE.LOGIN, {
                uid : msg.account,
                password : msg.password
            }, (data)=>{
                cb(data);
            });
        });
    }

    //设置名称请求进入游戏
    reqStartGame (msg : any, cb : Function) : void {
        pomelo.getInstance().request(ROUTE.UPDATENAME, msg, cb);
    }

}