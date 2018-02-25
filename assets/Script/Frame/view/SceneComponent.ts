import BaseComponent from "./BaseComponent";
import { RES, RES_TYPE } from "../common/resource";
import LayerComponent from "./LayerComponent";
import { MODULE } from "../common/Common";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class SceneComponent extends BaseComponent {

    _arrEmit : Array<any>;
    _arrTime : Array<any>;
    _arrTimes : Array<any>;
    onLoad () : void {
        super.onLoad();
        let self = this;
        self._arrEmit = ["runScene", "Msg"];
        this._arrTime = [];
        this._arrTimes = [];
        this.initEvent();
    }

    initEvent () : void {
    }
    
    //注册自定义事件
    registerEvent () : void {
        let self = this;
        for (let i = 0; i < self._arrEmit.length; i ++) {
            let sName = self._arrEmit[i];
            if (self[sName]) {
                self._emitter.on(self._arrEmit[i], self[sName].bind(this), self);
            } else {
                console.warn("未注册事件", sName);
            }
        }
    }

    Msg (data) : void {
        this.showLayer(MODULE.MSG, {content : data.content});
    }

    private runScene (data) : void {
        this._runScene(data.scene);
    }
    /**
     * 跳转场景
     * @param 跳转的场景名称
     * @param 跳转后的回调函数？
     */
    protected _runScene (sceneName : string, callBack ?: Function) : void {
        let self = this;
        self._destroy();
        cc.director.preloadScene(sceneName, (err) => {
            if (err) {
                cc.warn("场景预加载失败->[", sceneName, "]");
                debugger;
            } else {
                // self.onExit();
                cc.director.loadScene(sceneName, callBack);
            }
        });
    }

    /**
     * 销毁自己
     */
    _destroy () : void {
        let self = this;
        console.log(`销毁场景${cc.director.getScene().name}`);
        //当前场景释放资源
        RES.fReleaseRes(RES_TYPE.MODULE);
        //移除当前场景监听器
        for (let i = 0; i < self._arrEmit.length; i ++) {
            let sName = self._arrEmit[i];
            self._emitter.off(self._arrEmit[i]);
            
        }
        //移除定时器
        for (let i in this._arrTime) {
            clearTimeout(this._arrTime[i]);
        }
    }
}