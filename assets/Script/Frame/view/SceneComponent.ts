import BaseComponent from "./BaseComponent";
import { RES, RES_TYPE } from "../common/resource";
import LayerComponent from "./LayerComponent";

const { ccclass,  property } = cc._decorator;

@ccclass
export default class SceneComponent extends BaseComponent {

    onLoad () : void {
        super.onLoad();
        let self = this;
        self._emitter.on("runScene", self._runScene, self);
    }
    /**
     * 跳转场景
     * @param 跳转的场景名称
     * @param 跳转后的回调函数？
     */
    protected _runScene (sceneName : string, callBack ?: Function) : void {
        let self = this;
        cc.director.preloadScene(sceneName, (err) => {
            if (err) {
                cc.warn("场景预加载失败->[", sceneName, "]");
                debugger;
            } else {
                self.onExit();
                cc.director.loadScene(sceneName, callBack);
            }
        });
    }

    /**
     * 销毁自己
     */
    onDestroy () : void {
        console.log(`销毁场景${cc.director.getScene().name}`);
        //当前场景释放资源
        RES.fReleaseRes(RES_TYPE.MODULE);
    }
}