import { Common, ROUTE, NET_CODE, SERVER_PUSH, SCENE_NAME } from "../common/Common";
import { NetRoute } from "./NetRoute";


export default class Pomelo {

    private _initEmitter () : void {
        this.on("onSys", (msg)=>{
            console.log("server-push:", msg);
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
        pomelo.request(route, msg, (data)=>{
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