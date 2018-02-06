
/**
 * 游戏数据单利
 */

export class ClientData {
    private _oResource : any;
    private _oGameConfig : any;
    private _oProductData : any;
    private _oEventData : any;
    private _oHouseData : any;
    private _curServer : any;
    

    constructor () {
        let self = this;
        console.log("客户端数据初始化");
        self._oResource = {};
        self._oGameConfig = {};
        self._oEventData = {};
        self._oHouseData = {};
        self._curServer = {};
        // self._loadInitConfig();
    }

    // //加载初始化配置
    // private _loadInitConfig () {
    //     let self = this;
    //     setTimeout(()=>{
    //         RES.loadJson("Product", (res)=>{
    //             cc["Product"] = res;
    //             self._oProductData = res;
    //         });
    //         RES.loadJson("Config", (res : inter_Config)=>{
    //             cc["Config"] = res;
    //             self._oGameConfig = res;
    //         });
    //     }, 1000);
        
    // }

    init () : void {
        // cc["Product"] = JSON.parse(JSON.stringify(cc["RES"].Res.global.Product));
        // this._oProductData = cc["RES"].Res.global.Product;
        // // delete cc["RES"].Res.global.Product;
        // this._oGameConfig = cc["RES"].Res.global.Config;
        // cc["TheEvent"] = JSON.parse(JSON.stringify(cc["RES"].Res.global.TheEvent));
        // this._oEventData = cc["RES"].Res.global.TheEvent;
        // // delete cc["RES"].Res.global.TheEvent;
        // this._oHouseData = cc["RES"].Res.global.HousePrices;
        // // delete cc["RES"].Res.global.HousePrices;
        
    }

    setServer (data) : void {
        this._curServer = data;
    } getServer () : any {return this._curServer;}

    static _oData : ClientData;
    static getInstance () : ClientData {
        let self = this;
        if (! self._oData) {
            self._oData = new ClientData();
            return self._oData;
        }
        return self._oData;
    }
}

// cc["ClientData"] = ClientData.getInstance();