
export default class PartnerData {
    private static _pdCtor : PartnerData;
    public static getInstance () : PartnerData {
        if (! this._pdCtor) {
            this._pdCtor = new PartnerData();
        } return this._pdCtor;
    }

    private _partner : any;
    setPartnerData (data) : void {
        this._partner = data;
    }
    getPartnerData () : any {
        return this._partner;
    }
}