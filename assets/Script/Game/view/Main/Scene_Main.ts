/*
author: JustinLin
日期:2018-01-29 14:20:03
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { RES } from "../../../Frame/common/resource";
import PartnerMgr from "../../ctrl/PartnerMgr";
import GameMgr from "../../ctrl/GameMgr";
import { SCENE_NAME } from "../../../Frame/common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Main extends SceneComponent {
	//私有变量
	//私有变量声明结束
	//这边去声明ui组件

	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
	}

	//试炼场
	_tap_TestField () : void {
		GameMgr.getInstance().reqTestField(this.gotoTestField.bind(this));
	}

	//前往试炼场
	gotoTestField () : void {
		this._runScene(SCENE_NAME.FIGHT_SCENE);
	}

	//客栈
	_tap_Partner () : void {
		PartnerMgr.getInstance().reqFirstPartner();
	}

}