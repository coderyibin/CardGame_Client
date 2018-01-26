import { Common } from "../common/Common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonClick extends cc.Button {

    //逻辑脚本组件
    private _Comp : cc.Component = null;

    onLoad () : void {  
        //禁用模式
        let frame = this.normalSprite;
        this.disabledSprite = frame;
        this.disabledColor = cc.Color.GRAY;
        this.transition = cc.Button.Transition.SPRITE;
        this.enableAutoGrayEffect = true;
    }

    /**
     * 按钮绑定脚本组件
     * @param Comp 脚本组件
     */
    CreateButton (Comp : cc.Component, cbName : string) : ButtonClick {
        this._Comp = Comp;
        this._bindClick(this, cbName);
        return this;
    }

    /**
     * 绑定按钮事件
     * @param btn 按钮组件对象
     * @param name 要绑定的函数名称
     */
    _bindClick (btn : cc.Button, name : string) : void {
        let self = this;
        //获取逻辑节点脚本组件对象
        let sName = "_tap_" + name;
        if (self._Comp[sName]) {
            //添加按钮普通的点击事件
            self.addBtnEvent(sName, btn);
        } else {
            cc.warn("该节点组件", self._Comp.name, "未注册[", sName, "]函数");
        }
    }

    /**
     * 添加按钮点击事件
     * @param name 点击事件的名称
     * @param btn 点击事件绑定的按钮
     * @param data 自定义数据 选填
     */
    addBtnEvent (name : string, btn : cc.Button, data ?: any) : void {
        let self = this;        
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = self._Comp.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = Common.fGetObjectName(self._Comp);//这个是代码文件名
        clickEventHandler.handler = name;
        clickEventHandler.customEventData = data;
        btn.clickEvents.push(clickEventHandler);
    }
}