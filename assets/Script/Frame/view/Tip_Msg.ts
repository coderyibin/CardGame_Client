import { Common } from "../common/Common";
import BaseTip from "./BaseTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip_Msg extends BaseTip {

    onLoad () : void {
        super.onLoad();
    }

    initUi () : void {
        let data = this._oData;
        this._LabelData["content"].string = data.content;
    }

    _tap_Ok () : void {
        this.removeSelf();
    }
}