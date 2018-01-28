/*
author: JustinLin
日期:2018-01-26 17:29:24
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";
import UserMgr from "../../ctrl/UserMgr";

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
        this._sAccount = this._EditBoxData["edit_Account"].string;
    }
    
    _editBox_return_edit_Password () : void {
        this._sPassword = this._EditBoxData["edit_Password"].string;
    }


    _tap_btn_Login () : void {
        UserMgr.getInstance().reqLogin({
            "host" : RES.Res["global"]['config.json'].clienthost,
            "port" : RES.Res["global"]['config.json'].clientport,
            "account" : this._EditBoxData["edit_Account"].string,
            "password" : this._EditBoxData["edit_Password"].string
        });
    }
}