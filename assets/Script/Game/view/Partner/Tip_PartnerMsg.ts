import BaseTip from "../../../Frame/view/BaseTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip_PartnerMsg extends BaseTip {

    onLoad () : void {
        super.onLoad();
    }

    initUi () : void {
        let data = this._oData;

        this._LabelData["name"].string = data.name;
        this._LabelData["hp"].string = data.hp;
        this._LabelData["mp"].string = data.mp;
        this._LabelData["strength"].string = data.strength;
        this._LabelData["agile"].string = data.agile;
        this._LabelData["armor"].string = data.armor;
        this._LabelData["desc"].string = "";
    }

    _tap_Ok () : void {
        this.removeSelf();
    }
}