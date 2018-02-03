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

    private _oMonster : any;
    private _oFightPartner : any;

    constructor () {
        super();
        UserMgr.getInstance();
        this._oFightPartner = {};
    }

    //请求试炼场数据
    reqTestField (cb : Function) : void {
        let data = UserMgr.getInstance().getUserInfo();
        pomelo.getInstance().request(ROUTE.STARTFIGHT, {
            mapId : 1
        }, (msg)=>{
            this._oFightPartner = msg.users;
            this._oMonster = msg.monsters
            cb();
        });
    }

    //获取敌我双方战斗数据
    getMyEnemyData () : any {
        return {
            monsters : this._oMonster,
            users : this._oFightPartner
        }
    }
}

window['Game'] = GameMgr.getInstance();