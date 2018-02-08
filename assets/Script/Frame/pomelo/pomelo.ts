import { Common, ROUTE, NET_CODE, SERVER_PUSH, SCENE_NAME, MODULE } from "../common/Common";
import { NetRoute } from "./NetRoute";
import { RES } from "../common/resource";
import CustEmitter from "../ctrl/CustEmitter";


export default class Pomelo {

    private _initEmitter () : void {
        console.log("初始化监听所有服务端推送的消息");
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
        if (cc.find("Canvas").getChildByName(MODULE.LAYER_NETJUHUA))
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

    initNet (host, port, cb) : void {
        this.addNetJuHua();
        pomelo.init({
            host : host,
            port : port,
            log : true
        }, ()=>{
            this.request(ROUTE.GATE, {}, (msg)=>{
                console.log("init ok", msg);
                pomelo.disconnect(function () {
                    pomelo.init({
                        host : msg.host,
                        port : msg.port
                    }, (msg)=>{
                        this.request(ROUTE.GETSERVER, {}, (msg)=>{
                           cb(msg);
                        });
                    });
                }.bind(this));
            });
        });
        //初始化监听所有服务端推送的消息
        this._initEmitter();        
    }

    request (route : string, msg : any, cb : Function, show : boolean = true) : void {
        console.log(route + "<-client-link->", msg);
        if (show) this.addNetJuHua();
        pomelo.request(route, msg, (data)=>{
            this.removeJuHua();
            console.log("client-cb->", data);
            if (cb && data.code == NET_CODE.CODE_NONE) {
                cb(data);
            } else {
                CustEmitter.getInstance().emit("Msg", data);
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