import { BaseCtrl } from "../../Frame/ctrl/BaseCtrl";
import { ROUTE } from "../../Frame/common/Common";
import pomelo from "../../Frame/pomelo/pomelo";
import { Emitter } from "../../Frame/ctrl/Emitter";


export default class GameMgr extends BaseCtrl {
    private static _ctor : GameMgr;
    public static getInstance () : GameMgr {
        if (! this._ctor) {
            this._ctor = new GameMgr();
        }
        return this._ctor;
    }

    constructor () {
        super();
    }

    
}