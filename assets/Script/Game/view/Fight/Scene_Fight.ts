/*
author: JustinLin
日期:2018-02-03 10:33:49
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { RES } from "../../../Frame/common/resource";
import GameMgr from "../../ctrl/GameMgr";
import Unit_Hero from "./Unit_Hero";
import { Common, MODULE } from "../../../Frame/common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Fight extends SceneComponent {
	//私有变量
	_oMyPos : Array<any>;
	_oEnemyPos : Array<any>;
	_oMyDatas :  Array<any>;
	_oEnemyDatas :  Array<any>;
	_timeOut : number;//超时时间，超过这时间，自动战斗
	//私有变量声明结束
	//这边去声明ui组件
	@property({
		tooltip : "战斗位置层级",
		type : cc.Node
	})
	Layer_Fight : cc.Node = null;
	@property({
		tooltip : "我方战斗位置坐标",
		type : [cc.Node]
	})
	Node_MyFightPos : cc.Node[] = [];
	@property({
		tooltip : "敌方战斗位置坐标",
		type : [cc.Node]
	})
	Node_EnemyFightPos : cc.Node[] = [];
	@property({
		tooltip : "我方战斗单位节点",
		type : cc.Node
	})
	Node_MyFight : cc.Node = null;
	@property({
		tooltip : "敌方战斗位置节点",
		type : cc.Node
	})
	Node_EnemyFight : cc.Node = null;
	@property({
		tooltip : "超时时间",
		type : cc.Label
	})
	Label_TimeOut : cc.Label = null;
	//声明ui组件end

	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
		this._oMyPos = [];
		this._oEnemyPos = [];
		//我方坐标与地方坐标
		for (let i = 0; i < this.Node_MyFightPos.length; i ++) {
			this.Node_MyFightPos[i].active = false;
			this._oMyPos.push(this.Node_MyFightPos[i].getPosition());
		}
		for (let i = 0; i < this.Node_EnemyFightPos.length; i ++) {
			this.Node_EnemyFightPos[i].active = false;
			this._oEnemyPos.push(this.Node_EnemyFightPos[i].getPosition());
		}
	}

	start () : void {
		let Fights = GameMgr.getInstance().getMyEnemyData();
		let myFights = Fights.users;
		let enemyFights = Fights.monsters;
		for (let i in myFights) {
			let node = Unit_Hero.show(MODULE.UNIT_HERO, myFights[i]);
			this.Node_MyFight.addChild(node);
			node.x = this._oMyPos[i].x;
			node.y = this._oMyPos[i].y;
		}
		for (let i in enemyFights) {
			let node = Unit_Hero.show(MODULE.UNIT_HERO, enemyFights[i]);
			this.Node_EnemyFight.addChild(node);
			node.x = this._oEnemyPos[i].x;
			node.y = this._oEnemyPos[i].y;
		}

		this.scheduleOnce(this.StartFight.bind(this), this._timeOut);
		this.CountDownTime();
		this._timeOut = 5;
	}

	CountDownTime () : void {
		this.schedule(this._TimeDown.bind(this), 1);
	}

	CountDownTimeCancel () : void {
		this.unschedule(this._TimeDown.bind(this));		
		this._timeOut = 5;
	}

	_TimeDown () : void {
		this.Label_TimeOut.string = this._timeOut + "";
		if (this._timeOut < 0) {
			this.Label_TimeOut.node.active = false;
			this.StartFight();
			this.CountDownTimeCancel();
		}
	}

	//开始战斗，单位轮询
	StartFight () : void {
		let my = this.Node_MyFight.children;
		for (let i = 0; i < my.length; i ++) {

		}
		let enemy = this.Node_EnemyFight.children;
		for (let i = 0; i < enemy.length; i ++) {

		}
	}

	//单体战斗结束回掉
	ItemFightEnd () : void {

	}
}