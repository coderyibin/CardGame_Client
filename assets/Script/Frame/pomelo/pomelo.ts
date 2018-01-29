import { Common, ROUTE, NET_CODE } from "../common/Common";
import { Emitter } from "../ctrl/Emitter";

export default class Pomelo {

    private _initOn () : void {
        this.on("sys", (msg)=>{
            console.log("服务端主动推送", msg);
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
        this._initOn();
    }

    request (route : string, msg : any, cb : Function) : void {
        pomelo.request(route, msg, (data)=>{
            console.log(data);
            if (cb && data.code == NET_CODE.CODE_NONE) {
                cb(data);
            } else if (data.code == NET_CODE.CODE_ERROR) {
                Emitter.getInstance().emit("Sys", data);
            }
        });
    }

    on (emit : string, cb : Function) : void {
        EventEmitter.prototype.on(emit, cb);
    }

    private static _ctor : Pomelo;
    public static getInstance () : Pomelo {
        if (! this._ctor) {
            this._ctor = new Pomelo();
        }
        return this._ctor;
    }
}