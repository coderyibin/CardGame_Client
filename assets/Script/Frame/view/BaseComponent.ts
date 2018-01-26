/**
 * 该脚本为逻辑组件脚本基类，所有逻辑节点都继承该类
 * Justin 创建于 2017/12/24
 */
const {ccclass, property, executionOrder} = cc._decorator;
import { Emitter } from "../ctrl/Emitter"
import { ClientData } from "../module/ClientData"
import { RES, RES_TYPE } from "../common/resource";
import { LOCAL_KEY, I18N } from "../common/Common";
import ButtonClick from "./ButtonClick";
import BaseLabel from "./BaseLabel";
// import { ResDefine } from "../common/ResDefine";

@ccclass
@executionOrder(0)
export default class BaseComponent extends cc.Component {
    // @property([cc.ScrollView])
    // ArrScrollView : cc.ScrollView[] = [];
    @property([cc.Node])
    ArrButton : cc.Node[] = [];
    @property([cc.Label])
    ArrLabel : cc.Label[] = [];
    @property([cc.EditBox])
    ArrEditsBox : cc.EditBox[] = [];
    // @property(cc.Node)
    // Canvas : cc.Node = null;
    // @property({
    //     type : cc.Node,
    //     tooltip: "这是一个屏蔽层layer",
    // })
    // ShieldNode : cc.Node = null;

    _emitter : Emitter;
    _client : ClientData;
    _logicComponentName : string;
    _spriteFrame : {};
    _fExitFunc : Function;
    _ScrollData : any;//滚动视图对象集合
    _ButtonData : any;//按钮对象集合
    _LabelData : any;//文本对象集合
    _EditBoxData : any;//输入框对象集合
    _Canvas : cc.Node;//尽量使用当前
    onLoad () : void {
        //隐藏帧率
        cc.director.setDisplayStats(false);
        let self = this; 
        self._emitter = Emitter.getInstance();
        self._client = ClientData.getInstance();
        self._initData();
        //逻辑节点脚本名称--下个版本去除
        self._logicComponentName = self.fGetLogicComponentName();
        this._Canvas = cc.find("Canvas");
        //解析各个ui组件
        self._registerButton();
        self._fLabelObject();
        self._fEditBoxObject();
        self._fScrollViewObject();
    }

    start () : void {

        //获取scrollview列表需要的数据
        // this._fGetListNeedData();
    }

    _initData () : void {
        let self = this;
        self._fExitFunc = null;
        self._LabelData = {};
        self._EditBoxData = {};
        self._ButtonData = {};
        self._ScrollData = {};
    }

    protected _isNative (): boolean {
        return cc.sys.isNative;
    }

    /**
     * 注册按钮事件
     */
    private _registerButton () : void {
        let self = this;   
        for (let i in self.ArrButton) {
            let _node = self.ArrButton[i];
            let _btn : ButtonClick = _node.getComponent("ButtonClick");
            if (! _btn) {
                _btn = _node.addComponent("ButtonClick");
            }
            _btn.CreateButton(self, _node.name);
            self._ButtonData[_node.name] = _btn;
        }
    }

    /**
     * 分析文本对象
     */
    private _fLabelObject () : void {
        // i18n.init("en");
        let self = this;
        for (let i in self.ArrLabel) {
            let node = self.ArrLabel[i].node;
            let sName = node.name;
            if (I18N === true) {//开启多语言
                let localized = self.ArrLabel[i].getComponent("LocalizedLabel");
                if (! localized) {
                    node.addComponent("LocalizedLabel");
                }
            }
            self._LabelData[sName] = self.ArrLabel[i];
            // self.ArrLabel[i].string = i18n.t('hello');
        }
    }

    /**
     * 解析输入框对象
     */
    private _fEditBoxObject () : void { 
        let self = this;
        for (let i in self.ArrEditsBox) {
            let node = self.ArrEditsBox[i].node;
            let name = node.name;
            let funcName = "_editBox_change_" + name;
            if (self[funcName]) self.ArrEditsBox[i].node.on("text-changed", self[funcName].bind(self), self);
            funcName = "_editBox_began_" + name;
            if (self[funcName]) self.ArrEditsBox[i].node.on("editing-did-began", self[funcName].bind(self), self);
            funcName = "_editBox_return_" + name;
            if (self[funcName]) self.ArrEditsBox[i].node.on("editing-return", self[funcName].bind(self), self);
            self._EditBoxData[name] = self.ArrEditsBox[i];
        }
    }

    /**
     * 解析滚动视图对象
     */
    private _fScrollViewObject () : void {
        let self = this;
        // for (let i in self.ArrScrollView) {
        //     let name = self.ArrScrollView[i].node.name;
        //     self._ScrollData[name] = self.ArrScrollView[i];
        // }        
    }

    /**
     * 获取列表需要的数据
     */
    _fGetListNeedData () : void {
        let list = this._ScrollData;
        for (let i in list) {
            let scroll = list[i];
            let data = this[`_list_${i}`]();
            this._fJoinScrollView(i, data);
        }
    }

    /**
     * 添加scrollview内容-仅限拥有layout布局组件
     */
    private _fJoinScrollView (name : string, data : any) : void {
        // let node = this._ScrollData[name].content;
        // for (let i in data) {
        //     let sName = `Unit_${name}`;
        //     let item = ResDefine[sName].show(name, data);
        //     node.addChild(item);
        // }
    }

     /**
     * 显示弹窗
     */
    showLayer (module : string, data ?: any) : void {
        let node = RES.fGetRes(module);
        let comp = node.getComponent(module);
        if (comp) {
            node.getComponent(module).init(data);
            let canvas = this._Canvas;
            this._fAddLayerToCanvas(node.name);
            canvas.addChild(node);    
        } else {
            cc.warn("未创建脚本组件", module);
        }
    }

    /**
     * 添加屏蔽层到canvas节点
     */
    _fAddLayerToCanvas (name : string) : void {
        let canvas = this._Canvas;
        let node = new cc.Node();
        node.name = `shield${name}`;
        let btn = node.addComponent(cc.Button);
        node.setContentSize(this.getWinSize());
        canvas.addChild(node);
        node.color = cc.Color.GRAY;
    }

    /**
     * 判断当前节点是否是逻辑节点--会在下一个版本去除，逻辑节点统一由Canvas管理
     * @return 是否是逻辑节点
     */
    _isLogicNode () : boolean {
        let self = this;
        return self.node.name == "LogicNode" ? true : false; 
    }

    /**
     * 设置label属性
     */
    setLabel (data : any) : cc.Label {
        let label : cc.Label = data.label || new cc.Label;
        if (data.color) label.node.color = data.color; 
        if (data.string) label.string = data.string; 
        return label;
    }

    /**
     * 获取当前场景大小
     * @return 场景大小尺寸
     */
    getWinSize () : cc.Size {
        return cc.director.getWinSize();
    }

    /**
     * 获取当前场景逻辑组件名称
     */
    fGetLogicComponentName () : string {
        let scene = cc.director.getScene().name;
        cc.log(scene);
        return "S_" + scene;
    }

    /**
     * 获取当前脚本对象名称
     * @return 脚本对象名称
     */
    getObjectName () : string {
        let self = this;
        let name : string = self.name;
        let index : number = name.indexOf("<");
        name = name.slice(index + 1, name.length - 1);
        return name;
    }

    /**
     * 当前组件被销毁时调用
     */
    onDestroy () : void {
       
    }

    /**
     * 场景跳转之前做的一些业务
     */
    onExit () : void {
        let self = this;
        if (self._fExitFunc) self._fExitFunc(); 
        //当前场景资源的释放
        RES.fReleaseRes(RES_TYPE.MODULE);
    }

    /**
     * 清理游戏数据
     * @param key 要清理的对象数据数组 
     */
    _cleanData (key : Array<string>) : void {
        let self = this;
        // self._playerCtrl.fCleanData([LOCAL_KEY.PLAYER]);
    }
}