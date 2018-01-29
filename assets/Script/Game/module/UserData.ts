import Hero from "../../Frame/module/Hero";


export default class UserData extends Hero {
    public static _ctor : UserData;
    public static getInstance () : UserData {
        if (! this._ctor) {
            this._ctor = new UserData();
        }
        return this._ctor;
    }

    private _oUserData : inter_Player;

    public setUserData (data : inter_Player) : void {

    }

}