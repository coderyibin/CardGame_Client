/*
author: JustinLin
日期:2018-02-03 10:47:34
*/
import { RES } from "../../../Frame/common/resource";
import { UnitComponent } from "../../../Frame/view/UnitComponent";
import CustEmitter from "../../../Frame/ctrl/CustEmitter";
import { FightMgr } from "../../ctrl/FightMgr";
import GameMgr from "../../ctrl/GameMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Unit_Hero extends UnitComponent {
	//私有变量
	_id : number = 0;
	_nTotalHp : number = 0;
	_nCurHp : number = 0;
	_nTotalMp : number = 0;
	_nCurMp : number = 0;
	_abnormal : number = 0;
	_Atted : boolean = false;
	_att_cb : Function;
	_userId : number = 0;
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
		this.Hero_Name.string = data.name;
		if (data.camp == "monster") {
			this.Hero_Name.node.color = cc.Color.RED;
		}
		this._nTotalHp = data.hp;
		this._nCurHp = data.hp;
		this.setHeroHp(data.hp);
		this.setHeroMp(data.mp);
		this._userId = data.userId || 0;
		this._id = data.id;
	}

	//显示数值
	showValue (data) : void {
		let pos = this.Hero_Value.node.getPosition();
		this.Hero_Value.string = data.value;
		this.Hero_Value.node.color = data.color;
		let action = cc.moveBy(0.8, new cc.Vec2(0, 200));
		this.Hero_Value.node.active = true;
		this.Hero_Value.node.runAction(cc.sequence(
			action, 
			cc.callFunc(()=>{
				this.Hero_Value.node.active = false;
				this.Hero_Value.node.setPosition(pos);
			})
		));
	}

	setHeroHp (value) : void {
		this.setDie(value);
		this.Hero_Hp.progress = value / this._nTotalHp;
	}

	setHeroMp (value) : void {
		this.Hero_Mp.progress = value / this._nTotalMp;
	}

	setDie (value) : void {
		if (value <= 0) {
			this.node.destroy();
			GameMgr.getInstance().delFightUnit(this._oData.userId, this._oData.id);
		}
	}

	//显示异常状态
	showAbnormal () : void {
		
	}

	/**
	 * 攻击动作
	 * @param 攻击对象
	 * @param 攻击位置
	 * @param 攻击结束回调
	 * @param 攻击到敌方回调
	 * */
	attAction (attTar : number, pos : cc.Vec2, e_cb : Function, hit_cb : Function) : void {
		if (this.getAttStatus()) return;
		let camp = this._oData.userId > 0 ? -1 : 1;//判断受伤的对象是地方还是我方
		let action = cc.moveTo(0.4, new cc.Vec2(pos.x, pos.y));
		let reaction = cc.moveTo(0.4, this.node.getPosition());
		this.node.runAction(cc.sequence(
			action, cc.delayTime(0.1),
			cc.callFunc(hit_cb.bind(this, attTar, camp)), 
			reaction , cc.callFunc(this.AttAction_cb.bind(this))));
		this._att_cb = e_cb;
	}

	AttAction_cb () : void {
		let name = this._oData.name;
		console.log(name + "攻击结束");
		this._Atted = true;
		if (this._att_cb && this._att_cb instanceof Function) {
			this.scheduleOnce(this._att_cb.bind(this), 0.2);
		}
	}

	//设置攻击状态
	setAttStatus (att : boolean) : void {
		this._Atted = att;
	}
	getAttStatus () : boolean {
		return this._Atted;
	}

	//被打动作
	hitAction (sub) : void {
		let _x = this.Hero_Image.node.getScale();
		let action = cc.scaleTo(0.1, 0.8, 1);
		let _action = cc.scaleTo(0.1, 1, 1);
		this.Hero_Image.node.runAction(cc.sequence(action, _action));
		this.showValue({
			value : "-" + sub,
			color : cc.Color.RED
		});		
		this._nCurHp -= sub;
		this.setHeroHp(this._nCurHp);
	}

	//移除自己
	removeSelf () : void {
		this.destroy();
	}

	_tap_Unit_Hero () : void {

	}
}