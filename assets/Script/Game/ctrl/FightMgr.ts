import PartnerData from "../module/PartnerData";
import { ROUTE } from "../../Frame/common/Common";
import Pomelo from "../../Frame/pomelo/pomelo";

export class FightMgr {
    public static _fctro : FightMgr;
    public static getInstance () : FightMgr {
        if (! this._fctro) {
            this._fctro = new FightMgr();
            this._fctro.getFightUsers();
        } return this._fctro;
    }

    _oMonster : any;
    _oUser : any;

    getFightData () : any {
        return {
            monsters : this._oMonster,
            users : this._oUser
        }
    }

    getFightUsers () : void {
        this._oUser = [];
        let users = PartnerData.getInstance().getPartnerData();
        for (let i in users) {
            if (users[i].first == 1) {
                this._oUser.push(users[i]);
            }
        }
    }

    //要删除的战斗单位
    delFightUnit (type, id) : void {
        if (type > 0) {
            //我方战斗单位
            for (let i in this._oUser) {
                if (this._oUser[i].id == id) {
                    if (this._oUser instanceof Array) {
                        this._oUser.splice(parseInt(i), 1);
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
    }

    setMonsters (data) : void {
        this._oMonster = data;
    }

    /** 
     * 请求战斗伤害 
     * */
    reqAutoFightHurt (cb : Function) : void {
        let msg = {
            users : this._oUser,
            monsters : this._oMonster,
            auto : true
        }
        Pomelo.getInstance().request(ROUTE.QEUFIGHT, msg, (msg)=>{
            this._oMonster = msg.monsters;
            this._oUser = msg.users;
            cb(msg);
        }, false);
    }
}