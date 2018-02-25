import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";
import { UserMgr } from "./UserMgr";
import UserData from "../module/UserData";
import Pomelo from "../../Frame/pomelo/pomelo";
import PartnerData from "../module/PartnerData";
import { FightMgr } from "./FightMgr";
import CustEmitter from "../../Frame/ctrl/CustEmitter";


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
    private _oUserMgr : any;

    constructor () {
        super();
        this._oUserMgr = UserMgr.getInstance();
        this._oFightPartner = {};
        this._oMonster = {};
    }

    //请求试炼场数据
    reqTestField (cb : Function) : void {
        let data = UserMgr.getInstance().getUserInfo();
        pomelo.getInstance().request(ROUTE.STARTFIGHT, {
            mapId : 1,
            rid : UserData.getInstance().getUserInfo().id
        }, (msg)=>{
            FightMgr.getInstance().setMonsters(msg.monsters);
            this._oMonster = msg.monster;
            this._oFightPartner = PartnerData.getInstance().getPartnerData();
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

    //要删除的战斗单位
    delFightUnit (type, id) : void {
        if (type > 0) {
            //我方战斗单位
            for (let i in this._oFightPartner) {
                if (this._oFightPartner[i].id == id) {
                    if (this._oFightPartner instanceof Array) {
                        this._oFightPartner.splice(parseInt(i), 1);
                        break;
                    }
                }
            }
        } else {
            for (let i in this._oMonster) {
                if (this._oMonster[i].id == id) {
                    if (this._oMonster instanceof Array) {
                        this._oMonster.splice(parseInt(i), 1);
                        break;
                    }
                }
            }
        }
        CustEmitter.getInstance().emit("updateFightCamp", {camp : type, id : id});
    }

    /** 
     * 请求战斗伤害 
     * */
    reqAutoFightHurt (cb : Function) : void {
        let msg = {
            users : this._oFightPartner,
            monsters : this._oMonster,
            auto : true
        }
        pomelo.getInstance().request(ROUTE.QEUFIGHT, msg, (msg)=>{
            this._oMonster = msg.monsters;
            this._oUserMgr = msg.users;
            cb(msg);
        }, false);
    }
}

window['Game'] = GameMgr.getInstance();