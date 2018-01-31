import { Common, ROUTE, NET_CODE, SERVER_PUSH, SCENE_NAME } from "../common/Common";
import CustEmitter from "../ctrl/CustEmitter";
import UserMgr from "../../Game/ctrl/UserMgr";

export default class Pomelo {

    private _initEmitter () : void {
        this.on("onSys", (msg)=>{
            console.log("服务端推送", msg);
            this.emit(msg.key, msg.data);
        });
    }
    
    initPomelo (host, port, account, password, cb : Function) : void {
        let self = this;
        pomelo.init({
            host : host,
            port : port,
            log : true
        }, ()=> {
            var _name = name;
            var rou = ROUTE.GATE;
            pomelo.request(rou, {
                uid : account
            }, (rs)=> {
                console.log("init ok", rs);
                pomelo.disconnect(function () {
                    pomelo.init({host : rs.host, port : rs.port}, ()=> {
                        // var rout = ROUTE.LOGIN
                        // self.request(rout, {uid : account, password : password}, cb);
                        cb();
                    });
                });
            })
        });
        //初始化监听所有服务端推送的消息
        this._initEmitter();
    }

    request (route : string, msg : any, cb : Function) : void {
        console.log(route + "<-link->", msg);
        pomelo.request(route, msg, (data)=>{
            console.log(data);
            if (cb && data.code == NET_CODE.CODE_NONE) {
                cb(data);
            } else if (data.code == NET_CODE.CODE_ERROR) {
            }
        });
    }

    notify (route : string, msg : any) : void {
        pomelo.notify(route, msg);
    }

    on (emit : string, cb : Function) : void {
        pomelo.on(emit, cb);
    }

    emit (key : string, data : any) :void {
        switch (key) {
            case SERVER_PUSH.JOIN_MAIN :
                {
                    CustEmitter.getInstance().emit("runScene", {scene : SCENE_NAME.MAIN_SCENE});
                }
                break;
            case SERVER_PUSH.UPDATE_USER_INFO :
                {
                    // UserMgr.getInstance().updateUserInfo(data);
                }
                break;
            default :
                console.warn("未监听当前key->"+key);
                break;
        }
    }

    private static _ctor : Pomelo;
    public static getInstance () : Pomelo {
        if (! this._ctor) {
            this._ctor = new Pomelo();
        }
        return this._ctor;
    }
}