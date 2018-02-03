/*
author: JustinLin
日期:2018-02-03 10:47:34
*/
import { RES } from "../../../Frame/common/resource";
import { UnitComponent } from "../../../Frame/view/UnitComponent";
import CustEmitter from "../../../Frame/ctrl/CustEmitter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Unit_Hero extends UnitComponent {
	//私有变量
	_id : number = 0;
	_hp : number = 0;
	_mp : number = 0;
	_abnormal : number = 0;
	//私有变量声明结束
	//这边去声明ui组件
	@property({
		tooltip : "名称",
		type : cc.Label
	})
	Hero_Name : cc.Label = null;
	@property({
		tooltip : "角色血量条",
		type : cc.ProgressBar
	})
	Hero_Hp : cc.ProgressBar = null;
	@property({
		tooltip : "角色魔法条",
		type : cc.ProgressBar
	})
	Hero_Mp : cc.ProgressBar = null;
	@property({
		tooltip : "角色伤害/补血数值",
		type : cc.Label
	})
	Hero_Value : cc.Label = null;
	@property({
		tooltip : "角色形象",
		type : cc.Sprite
	})
	Hero_Image : cc.Sprite = null;
	//声明ui组件end


	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
		this.Hero_Value.node.active = false;
	}

   	//渲染结束后会调用
	initUi () : void {
		//创建当前类时传进来的数据
		let data = this._oData;
		cc.log(data);
		// this._event = [data.id+"removeSelf", data.id+"showDamage", data.id+"removeSelf", data.id+"showRescue"];
		// for (let i = 0; i < this._event.length; i ++) {
		// 	CustEmitter.getInstance().on(this._event[i], this[this._event[i]], this);
		// }
	}

	//显示伤害
	showDamage (data) : void {
		
	}

	//显示救助
	showRescue (data) : void {

	}

	//显示异常状态
	showAbnormal () : void {
		
	}

	//移除自己
	removeSelf () : void {
		this.destroy();
	}
}