import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";
import { UserMgr } from "./UserMgr";


export default class GameMgr extends BaseCtrl {
    private static _gctor : GameMgr;
    public static getInstance () : GameMgr {
        if (! this._gctor) {
            this._gctor = new GameMgr();
        }
        return this._gctor;
    }

    constructor () {
        super();
        UserMgr.getInstance();
    }

    //请求试炼场数据
    reqTestField () : void {
        let data = UserMgr.getInstance().getUserInfo();
        pomelo.getInstance().request(ROUTE.JOINTEST, {
            uid : data.id,
        }, (msg)=>{
            
        });
    }
}