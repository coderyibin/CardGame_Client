import { ClientData } from "../module/ClientData";


/**
 * 控制器基类，游戏所有的控制器都继承该类
 */

 export class BaseCtrl {
     protected _clientData : ClientData;
     constructor () {
        this._clientData = ClientData.getInstance();
     }

    //  /**
    //   * 游戏数据的清理
    //   * @param 要清理的游戏对象
    //   */
    //  protected _fCleanData (key : Array<any>) : void {
    //     for (let i in key) {
    //         key[i].getInstance().fCleanData();
    //     }
    //  }
 }