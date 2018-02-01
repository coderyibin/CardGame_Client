import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE, SERVER_PUSH } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";
import UserData from "../module/UserData";
import CustEmitter from "../../Frame/ctrl/CustEmitter";


export class UserMgr extends BaseCtrl {
    private static _uctor : UserMgr;
    public static getInstance () : UserMgr {
        if (! this._uctor) {
            this._uctor = new UserMgr();
            CustEmitter.getInstance().on(SERVER_PUSH.UPDATE_USER_INFO, this._uctor.updateUserInfo, this._uctor);
        }
        return this._uctor;
    }

    constructor () {
        super();
        UserData.getInstance();
    }

    //登陆游戏
    reqLogin (msg : any, cb : Function) : void {
        this._initPomelo(msg, (data)=>{
            pomelo.getInstance().request(ROUTE.LOGIN, {
                account : msg.account,
                password : msg.password
            }, (data)=>{
                cb(data);
            });
        });
    }

    //设置名称请求进入游戏
    reqStartGame (msg : any) : void {
        pomelo.getInstance().notify(ROUTE.UPDATENAME, msg);
    }

    updateUserInfo (name, data) : void {
        console.log("更新玩家信息");
        UserData.getInstance().setUserInfo(data);
    }

    getUserInfo () : any {
        return UserData.getInstance().getUserInfo();
    } 
}