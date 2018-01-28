/*
author: JustinLin
日期:2018-01-28 01:00:08
*/
import { Emitter } from "../../../Frame/ctrl/Emitter";
import { RES } from "../../../Frame/common/resource";
import BaseLoading from "../../../Frame/view/BaseLoading";
import { SCENE_NAME } from "../../../Frame/common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Loading extends BaseLoading {
	//私有变量
	//私有变量声明结束
	//这边去声明ui组件

	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
	}

	//h5 直接加载资源
	protected _fLoadRes () : void {
		super._fLoadRes();
	}

}