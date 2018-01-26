import BaseComponent from "./BaseComponent";
import { RES } from "../common/resource";
import { Common } from "../common/Common";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class LayerComponent extends BaseComponent {

    //静态数据-接收外部传进来的数据
    static oData : null;
    // /**
    //  * 要显示的单元名称
    //  * @param prefab 要显示的单元预制资源名称
    //  * @param data 数据
    //  */
    // public static show (prefab : string, data ?: any) : cc.Node {
    //     let node = RES.fGetRes(prefab);
    //     LayerComponent.oData = data;
    //     return node;
    // }

    protected _oData : null;
    private _onEnter : boolean;

    onLoad () : void {
        super.onLoad();
        this._oData = LayerComponent.oData;
        //这里使用状态机机制
        this._onEnter = true;
        this.init();
    }

    private init (data ?: any) : void {
        if (data) {
            this._oData = data;
            LayerComponent.oData = data;
        } else {
            this._oData = LayerComponent.oData;
        }
        if (this._onEnter) this.initUi();
    }

    initUi () : void {
    }

    /**
     * 关闭自己
     */
    fRemoveSelf () : void {
        cc.find("Canvas/shield" + Common.fGetObjectName(this)).destroy();
        this.node.destroy();
    }
    removeSelf () : void {
        this.fRemoveSelf();
    }

    _tap_Cancel () : void {
        this.fRemoveSelf();
    }
}