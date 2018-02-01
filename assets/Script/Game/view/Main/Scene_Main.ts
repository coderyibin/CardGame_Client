/*
author: JustinLin
日期:2018-01-29 14:20:03
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { RES } from "../../../Frame/common/resource";
import GameMgr from "../../ctrl/GameMgr";
import PartnerMgr from "../../ctrl/PartnerMgr";

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
		GameMgr.getInstance().reqTestField();
	}

	//客栈
	_tap_Partner () : void {
		PartnerMgr.getInstance().reqFirstPartner();
	}

}