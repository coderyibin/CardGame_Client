import CustEmitter from "../../Frame/ctrl/CustEmitter";
import { SCENE_NAME, SERVER_PUSH } from "../../Frame/common/Common";


export class NetRoute {
    static Route (key, data) {
        switch (key) {
            case SERVER_PUSH.JOIN_MAIN :
                {
                    CustEmitter.getInstance().emit("runScene", {scene : SCENE_NAME.MAIN_SCENE});
                }
                break;
            case SERVER_PUSH.UPDATE_USER_INFO :
                {
                    CustEmitter.getInstance().emit(key, data);
                }
                break;
            default :
                console.warn("未监听当前key->"+key);
                break;
        }
    }
}