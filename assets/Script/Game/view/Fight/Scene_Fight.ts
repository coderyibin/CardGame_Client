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
	_oMyAttPos : Array<any>;
	_oEnemyAttPos : Array<any>;
	_oMyDatas :  Array<any>;
	_oEnemyDatas :  Array<any>;
	_timeOut : number;//超时时间，超过这时间，自动战斗
	_myCamp : any;
	_enemyCamp : any;
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
		this._oMyAttPos = [];
		this._oEnemyAttPos = [];
		//我方坐标,攻击坐标与敌方坐标，攻击坐标
		for (let i = 0; i < this.Node_MyFightPos.length; i ++) {
			this.Node_MyFightPos[i].active = false;
			this._oMyPos.push(this.Node_MyFightPos[i].getPosition());
			this._oEnemyAttPos.push({
				x : this.Node_MyFightPos[i].getPosition().x + this.Node_MyFightPos[i].width / 4,
				y : this.Node_MyFightPos[i].getPosition().y
			});
			this.Node_MyFight.children[i].destroy();
		}
		for (let i = 0; i < this.Node_EnemyFightPos.length; i ++) {
			this.Node_EnemyFightPos[i].active = false;
			this._oEnemyPos.push(this.Node_EnemyFightPos[i].getPosition());
			this._oMyAttPos.push({
				x : this.Node_EnemyFightPos[i].getPosition().x - this.Node_EnemyFightPos[i].width / 4,
				y : this.Node_EnemyFightPos[i].getPosition().y
			});
			this.Node_EnemyFight.children[i].destroy();
		}
	}

	start () : void {
		let Fights = GameMgr.getInstance().getMyEnemyData();
		let myFights = Fights.users;
		let enemyFights = Fights.monsters;
		this._myCamp = {};
		this._enemyCamp = {};
		//阵型布局
		for (let i in myFights) {
			let node = Unit_Hero.show(MODULE.UNIT_HERO, myFights[i]);
			this.Node_MyFight.addChild(node);
			node.x = this._oMyPos[i].x;
			node.y = this._oMyPos[i].y;
			//id的战斗体处于的node
			this._myCamp[myFights[i].id] = node;
		}
		for (let i in enemyFights) {
			let node = Unit_Hero.show(MODULE.UNIT_HERO, enemyFights[i]);
			this.Node_EnemyFight.addChild(node);
			node.x = this._oEnemyPos[i].x;
			node.y = this._oEnemyPos[i].y;
			this._enemyCamp[enemyFights[i].id] = node;
		}
		this._oMyDatas = myFights;
		this._oEnemyDatas = enemyFights;
		// this.scheduleOnce(this.StartFight.bind(this), this._timeOut);
		this.CountDownTime();
		this._timeOut = 5;
	}

	CountDownTime () : void {
		this.Label_TimeOut.node.active = true;
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
			// this.StartFight();
			this.requFight();
			this.CountDownTimeCancel();
		}
		this._timeOut --;
	}

	//请求战斗
	requFight () : void {
		GameMgr.getInstance().reqFightHurt((data)=>{
			debugger
			if (data.first == "user") {//我方优先
				let hui = data.f;
				this._startAutoFight(data.first, hui);
			} else {

			}
		});
	}

	_startAutoFight (camp, fightData) : void {
		let myData = this._oMyDatas;
		let enemyData = this._oEnemyDatas;
		if (camp == "user") {
			for (let i = 0; i < fightData.length; i ++) {
				let attId = fightData[i].attId;
				let tarId = fightData[i].tarId;
				let node = this._myCamp[attId];
				if (! node.getComponent(node.name).getAttStatus()) {
					node.getComponent(node.name).attAction(enemyData[tarId].id, this._oMyAttPos[tarId], 
						()=>{
							// this.ItemFightEnd.bind(this);
							this.scheduleOnce(this._startAutoFight.bind(this, camp, fightData), 0.5);
						}, this.AttEdAction.bind(this));
					return;
				}
			}
		}
	}

	//开始战斗，单位轮询
	StartFight () : void {
		// let myData = this._oMyDatas;
		// let enemyData = this._oEnemyDatas;
		// let my = this.Node_MyFight.children;
		// for (let i = 0; i < my.length; i ++) {
		// 	if (! my[i].getComponent(my[i].name).getAttStatus()) {
		// 		my[i].getComponent(my[i].name).attAction(enemyData[0].id, this._oMyAttPos[0], this.ItemFightEnd.bind(this), this.AttEdAction.bind(this));
		// 		return;
		// 	}
		// }
		// let enemy = this.Node_EnemyFight.children;
		// for (let i = 0; i < enemy.length; i ++) {
		// 	if (! enemy[i].getComponent(enemy[i].name).getAttStatus()) {
		// 		enemy[i].getComponent(enemy[i].name).attAction(myData[0].id, this._oEnemyAttPos[0], this.ItemFightEnd.bind(this), this.AttEdAction.bind(this));
		// 		return;
		// 	}
		// }
	}

	//单体战斗结束回调
	ItemFightEnd () : void {
		// this.StartFight();
	}

	//被打的单体展示动作
	AttEdAction (id, camp) : void {
		console.log(id, camp)
	}
}