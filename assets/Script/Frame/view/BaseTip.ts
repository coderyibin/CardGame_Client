import { Common } from "../common/Common";
import LayerComponent from "./LayerComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseTip extends LayerComponent {

    onLoad () : void {
        super.onLoad();

        this.node.scale = 0.2;
        let action = cc.scaleTo(0.01, 1.0);
        this.node.runAction(action);
    }

    removeSelf () : void {
        
    }
}