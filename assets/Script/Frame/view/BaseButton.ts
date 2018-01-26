const {ccclass, property} = cc._decorator;

@ccclass
export class BaseButton extends cc.Button {
    //限制按钮触发时间
    _timeEmitter : boolean = false;
    //逻辑节点脚本组件名称
    _logicComponentName : string;

    setButtonData (data : any) : void {
        let btn = data.btn;
        let name = data.name;
        this._logicComponentName = data.comp;
        this._bindClick(btn, name);
    }

    /**
     * 绑定按钮事件
     * @param btn 按钮组件对象
     * @param name 要绑定的函数名称
     */
    _bindClick (btn : cc.Button, name : string) : void {
        let self = this;
        //获取逻辑节点脚本组件对象
        let oCompObject = cc.director.getScene().getChildByName("LogicNode").getComponent(self._logicComponentName);
        let sName = "On_" + name + "Click";
        if (oCompObject[sName]) {
            //添加按钮普通的点击事件
            self.addBtnEvent(sName, btn);
        } else {
            cc.warn("该节点组件", self._logicComponentName, "未注册[", sName, "]函数");
        }
    }

    // /**
    //  * 添加按钮点击事件
    //  */
    // JoinBtnEvent (name : string, btn : cc.Button, data ?: any) : void {
    //     btn.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
    //         if (self.) {

    //         }
    //     }, this);
    // }

    /**
     * 添加按钮点击事件(cocos creator)
     * @param name 点击事件的名称
     * @param btn 点击事件绑定的按钮
     * @param data 自定义数据 选填
     */
    addBtnEvent (name : string, btn : cc.Button, data ?: any) : void {
        let self = this;        
        // if (! self._isLogicNode()) return;
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = self.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = self._logicComponentName;//这个是代码文件名
        clickEventHandler.handler = name;
        clickEventHandler.customEventData = data;
        btn.clickEvents.push(clickEventHandler);
    }

    //设置是否启动按钮
    setEnabled (bool : boolean) : void {
        this.interactable = bool;
    }

    //设置按钮是否时间限制
    setTimeEmitter (bool : boolean) : void {
        this._timeEmitter = bool;
    }
}