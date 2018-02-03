/*
author: JustinLin
日期:2018-02-03 10:33:49
*/
import SceneComponent from "../../../Frame/view/SceneComponent";
import { RES } from "../../../Frame/common/resource";
import GameMgr from "../../ctrl/GameMgr";
import Unit_Hero from "./Unit_Hero";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Scene_Fight extends SceneComponent {
	//私有变量
	_oMyPos : Array<any>;
	_oEnemyPos : Array<any>;
	_oMyDatas :  Array<any>;
	_oEnemyDatas :  Array<any>;
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
	//声明ui组件end

	onLoad () : void {
		//调用父类onLoad
		super.onLoad();
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
		let Fights = GameMgr.getInstance().getMyEnemyData().monsters;
		let myFights = Fights.users;
		let enemyFights = Fights.monster;
		for (let i in myFights) {
			let node = Unit_Hero.show(myFights[i]);
			this.Node_MyFight.addChild(node);
			node.x = this._oMyPos[i].x;
			node.y = this._oMyPos[i].y;
		}
		for (let i in myFights) {
			let node = Unit_Hero.show(myFights[i]);
			this.Node_EnemyFight.addChild(node);
			node.x = this._oEnemyPos[i].x;
			node.y = this._oEnemyPos[i].y;
		}
	}

}