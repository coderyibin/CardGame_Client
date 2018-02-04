/*
author: JustinLin
日期:2018-01-26 17:29:24
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { RES } from "../../../Frame/common/resource";
import { Common } from "../../../Frame/common/Common";
import { UserMgr } from "../../ctrl/UserMgr";
import GlobalEmitter from "../../../Frame/ctrl/GolbalEmitter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Login extends SceneComponent {
    //私有变量
    private _sAccount : string;
    private _sPassword : string;
    private _uId : number;
    //私有变量声明结束
    //这边去声明ui组件
    @property({
        tooltip : "登陆面板",
        type : cc.Node
    })
    Panel_Login : cc.Node = null;

    @property({
        tooltip : "输入名称面板",
        type : cc.Node
    })
    Panel_SetName : cc.Node = null;
	//声明ui组件end

	onLoad () : void {
        
		//调用父类onLoad
        super.onLoad();
        this.Panel_Login.active = true;
        this.Panel_SetName.active = false;
        this._LabelData["error"].string = "";
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
            "host" : RES.Res["global"]['config'].clienthost,
            "port" : RES.Res["global"]['config'].clientport,
            "account" : this._EditBoxData["edit_Account"].string,
            "password" : this._EditBoxData["edit_Password"].string
        }, (data)=>{
            this._uId = data.uid;
            this.Panel_Login.active = false;
            this.Panel_SetName.active = true;
        });
    }

    _tap_StartGame () : void {
        let name = this._EditBoxData["name"].string;
        if (Common.StringIsSpace(name)) {
            this._LabelData['error'].string = "请不要输入特殊字符！";
            return;
        }
        var data = {
            uid : this._uId,
            name : name
        }
        UserMgr.getInstance().reqStartGame(data);
    }
}