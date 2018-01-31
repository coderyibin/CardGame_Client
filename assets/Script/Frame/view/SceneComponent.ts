import BaseComponent from "./BaseComponent";
import { RES, RES_TYPE } from "../common/resource";
import LayerComponent from "./LayerComponent";
import { MODULE } from "../common/Common";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class SceneComponent extends BaseComponent {

    _arrEmit : Array<any>;
    onLoad () : void {
        super.onLoad();
        let self = this;
        self._arrEmit = ["runScene"];
        for (let i = 0; i < self._arrEmit.length; i ++) {
            let sName = self._arrEmit[i];
            if (self[sName]) {
                self._emitter.on(self._arrEmit[i], self[sName], self);
            } else {
                console.warn("未注册事件", sName);
            }
        }
        // self._emitter.on("Sys", (name, data)=>{
        //     self.showLayer(MODULE.MSG, data);
        // }, this);
    }

    private runScene (name, data) : void {
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
            self._emitter.remove(self._arrEmit[i], self[sName], self);
            
        }
    }
}