import Hero from "../../Frame/module/Hero";


export default class UserData extends Hero {
    public static _ctor : UserData;
    public static getInstance () : UserData {
        if (! this._ctor) {
            this._ctor = new UserData();
        }
        return this._ctor;
    }

    private _oUserInfo : inter_Player;

    constructor () {
        super();
        this._oUserInfo = {};
    }

    public setUserInfo (data : inter_Player) : void {
        for (let i in data) {
            this._oUserInfo[i] = data[i];
        }
    }

    public getUserInfo () : any {
        return this._oUserInfo;
    }
}