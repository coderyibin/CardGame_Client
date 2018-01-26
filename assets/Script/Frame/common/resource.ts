import { Common } from "./Common";



export enum RES_TYPE {
    GLOBAL,//全局资源
    SINGLE,//单个资源
    MODULE,//模块资源
}

/**
 * 资源操作的脚本
 */
 export class RES {
    //资源数据
    static Res = {
        "global" : {}
    };

    static ResConfig : inter_Res = {};

    // //加载资源配置文件--直接加载公共资源
    // static loadResConfig (cb : Function) : void {
    //     RES.loadJson("resources", (res : inter_Res)=>{
    //         RES.ResConfig = res;
    //         cb(res.Common);
    //     });
    // }

    /**
     * 加载全局资源组
     * @param 资源数组名称
     * @param 加载单个回调-每加载成功一个资源会回调一次
     * @param 加载资源组完成后回调
     */
    static loadArrayToGlobal (file : Array<string>, progress ?: Function, complete ?: Function) : void {
        let len = file.length;
        let index = 0;
        for (let i in file) {
            RES.loadResToGlobal(file[i], (res)=>{
                index ++;
                if (index == len) {
                    complete();
                } else {
                    progress(index, len, res);
                }
            });
        }
    }
     
    /**
     * 加载资源组
     * @param file 名称-字符串数组
     * @param progress 进度-没加载成功一个会调用一次
     * @param cb 加载完成的回调函数
     */
    static loadArray (file : Array<string>, progress : Function, cb ?: Function) : void {
        let tatol = file.length;
        for (let i in file) {
            RES.loadResToGlobal(file[i], (res)=>{

            });
        }
        // cc.loader.loadResArray(file, (Count: number, total: number, item: any) => {
        //     progress.call(Count, total, item);
        // }, (err: Error, res: any[]) => {
        //     if (err)  {
        //         cc.warn("res error!");
        //         return;
        //     }
        //     debugger
        //     if (cb) cb.call(res);
        // });
    }

    static loadJson (file : string, cb ?: Function) : void {
        cc.loader.loadRes(file, (err, res) => {
            if (err) {
                cc.warn(file, "json资源读取出错");
                return;
            }
            if (cb) cb(res);
        });
    }

    static loadRes (file : string, cb ?: Function, target ?: any) : void {
        let sName : string = cc.director.getScene().name;
        let func : Function = (res, target) => {
            let fileName = Common.fGetFileName(file);
            //场景名称-文件名称
            if (! RES.Res[sName]) {
                RES.Res[sName] = {};
            }
            RES.Res[sName][fileName] = res;
            cb(res, target);
        };
        RES._loadRes(file, func, target);
    }

    static loadResToGlobal (file : string, cb ?: Function, target ?: any) : void {
        let sName : string = cc.director.getScene().name;
        let func : Function = (res, target) => {
            let fileName = Common.fGetFileName(file);
            //场景名称-文件名称
            RES.Res["global"][fileName] = res;
            cb(res, target);
        };
        RES._loadRes(file, func, target);
    }

    private static _loadRes (file : string, cb : Function, target : any) : void {
        cc.loader.loadRes(file, (err, res) => {//res 图片的话为texture2d对象
            if (err) {
                cc.warn("资源读取出错", err);
                return;
            }
            if (res instanceof cc.Texture2D) {
                let frame : cc.SpriteFrame = new cc.SpriteFrame();
                frame.setTexture(res);
                res = frame;
            }
            cb(res, target);
        });
    }

    /**
     * 获取资源
     * @param file 资源名称 
     */
    static fGetRes (file : string) : any {
        let g_Arr = RES.Res.global
        for (let i in g_Arr) {//优先遍历全局资源
            if (file == i) {
                let res = g_Arr[i];
                return res instanceof cc.Prefab ? cc.instantiate(res) : res;
                // return res;
            }
        }
        let sName : string = cc.director.getScene().name;
        let arr = RES.Res[sName];
        for (let i in arr) {//遍历场景资源
            if (file == i) {
                let res = arr[i];
                return res instanceof cc.Prefab ? cc.instantiate(res.data) : res;
            }
        }
        cc.warn("未找到该资源", file);
        return null;
    }

    /**
     * 释放资源
     * @param type 资源类型
     * @param resName 资源名称--如果类型为模块资源，则resName默认为场景名称
     */
    static fReleaseRes (type : RES_TYPE, resName ?: string) : void {
        if (type == RES_TYPE.SINGLE) {
            
        } else if (type == RES_TYPE.MODULE) {
            if (! resName) {
                let scene = cc.director.getScene();
                let sName : string = scene.name;
                console.log(`将要移除的资源组${sName}`);
                let list = RES.Res[sName];
                for (let i in list) {
                    cc.loader.release(list[i]);
                }
            }
        } else {
            
        }
    }
 };

 /**
  * 资源的管理
  * 在控制台可以用 cc.RES.Res 这个来查看当前内存的资源情况方便调试
  */
 cc["RES"] = RES;