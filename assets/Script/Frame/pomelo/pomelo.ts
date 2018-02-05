import { Common, ROUTE, NET_CODE, SERVER_PUSH, SCENE_NAME, MODULE } from "../common/Common";
import { NetRoute } from "./NetRoute";
import { RES } from "../common/resource";


export default class Pomelo {

    private _initEmitter () : void {
        this.on("onSys", (msg)=>{
            console.log("server-push:", msg);
            this.emit(msg.key, msg.data);
        });
    }

    addNetJuHua () : void {
        let node = RES.fGetRes(MODULE.LAYER_NETJUHUA);
        cc.find("Canvas").addChild(node);
    }
    removeJuHua () : void {
        cc.find("Canvas").getChildByName(MODULE.LAYER_NETJUHUA).destroy();
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
                        cb();
                    });
                });
            })
        });
        //初始化监听所有服务端推送的消息
        this._initEmitter();
    }

    request (route : string, msg : any, cb : Function) : void {
        console.log(route + "<-client-link->", msg);
        this.addNetJuHua();
        pomelo.request(route, msg, (data)=>{
            this.removeJuHua();
            console.log("client-cb->", data);
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
       NetRoute.Route(key, data);
    }

    private static _ctor : Pomelo;
    public static getInstance () : Pomelo {
        if (! this._ctor) {
            this._ctor = new Pomelo();
        }
        return this._ctor;
    }
}