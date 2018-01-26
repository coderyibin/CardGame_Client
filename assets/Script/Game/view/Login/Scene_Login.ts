/*
author: JustinLin
日期:2018-01-26 17:29:24
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Login extends SceneComponent {
    //私有变量
    private _sAccount : string;
    private _sPassword : string;
    //私有变量声明结束
    //这边去声明ui组件

	//声明ui组件end

	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
    }
    
    _editBox_began_edit_Account (event) : void {
        if (event.detail.string == " ") {
            this._EditBoxData["edit_Account"].string = "";
            this._LabelData["label_Error"].string = "第一个字符串不可以是空格";
        }
    }
    
    _editBox_return_edit_Account () : void {

    }
}