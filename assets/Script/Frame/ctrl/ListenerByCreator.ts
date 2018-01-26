
export default class Listener {
    private _listenerList = {};

    //注册事件
    registerEvents (node : cc.Node, EventName : string, callBack : Function) : void {
        let oData : any = this._registerEvent(node, EventName, callBack);
        oData["once"] = false;//是否是单次事件
    }

    //注册单次事件
    registerOnceEvent (node : cc.Node, EventName : string, callBack : Function) : void {
        let oData : any = this._registerEvent(node, EventName, callBack);
        oData["once"] = true;//是否是单次事件
    }

    //移除指定的事件
    removeListener (EventName : string) : boolean {
        for (let i in this._listenerList) {
            let oData : any = this._listenerList[i];
            if (oData.name == EventName) {
                if (oData && Object.prototype.toString.call(oData.cb) == "[Object Function]" || oData.cb instanceof Function) {
                    oData.node.un(EventName, oData.cb);
                    delete this._listenerList[i];
                    return true;
                } 
            }
        }
        return false;
    }
    
    //注册事件
    private _registerEvent (node : cc.Node, EventName : string, callBack : Function) : any {
        node.on(EventName, (event) => {
            callBack(event);
        });
        let oData = this._listenerList[EventName];
        if (! oData) oData = {};
        oData["cb"] = callBack;
        oData["name"] = EventName;
        oData["node"] = node;
        return oData;
    }


    private static _listener : Listener;
    public static getInstance () : Listener {
        if (! this._listener) {
            return new Listener();
        }
        return this._listener;
    }
}