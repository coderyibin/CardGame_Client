
/**
 * 游戏数据单利
 */

export class ClientData {
    private _oResource : any;
    private _oGameConfig : any;
    private _oProductData : any;
    private _oEventData : any;
    private _oHouseData : any;
    

    constructor () {
        let self = this;
        console.log("客户端数据初始化");
        self._oResource = {};
        self._oGameConfig = {};
        self._oEventData = {};
        self._oHouseData = {};
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
        cc["Product"] = JSON.parse(JSON.stringify(cc["RES"].Res.global.Product));
        this._oProductData = cc["RES"].Res.global.Product;
        // delete cc["RES"].Res.global.Product;
        this._oGameConfig = cc["RES"].Res.global.Config;
        cc["TheEvent"] = JSON.parse(JSON.stringify(cc["RES"].Res.global.TheEvent));
        this._oEventData = cc["RES"].Res.global.TheEvent;
        // delete cc["RES"].Res.global.TheEvent;
        this._oHouseData = cc["RES"].Res.global.HousePrices;
        // delete cc["RES"].Res.global.HousePrices;
        
    }

    /**
     * 获取商品原始价格
     */
    fGetProductOriginal (id) : number {
        return cc["Product"][id].price;
    }

    /**
     * 获取房价数据
     */
    fGetHousePriceData () : any {
        return this._oHouseData;
    }

    /**
     * 获取当前目标的房价
     * @param 要购买的房子id
     * @returns 房价
     */
    fGetBuyTarget (id : number) : number {
        let data : inter_House = this._oHouseData[id];
        return data.nPrice;
    }

    /**设置游戏配置
     * json数据格式
     * {mode : value}
    */
    fSetGameConfig (res : inter_Config) : void {
        for (let i in res) {
            this._oGameConfig[i] = res[i];
        }
    }
    fGetGameConfig () : inter_Config {
        return this._oGameConfig;
    }

    /**
     * 获取游戏剧情
     */
    fGetGamePlot (id) : inter_Event {
        if (id) {
            return this._oEventData[id] || null;
        }
        return this._oEventData;
    }

    //设置获取资源文件数据
    fSetResData (res : any) : void {
        this._oResource = res;
    }
    fGetResData () : any {
        return this._oResource;
    }

    /**
     * 获取产品数据
     * @param 产品id 选填
     */
    fGetProductData (id ?: number) : any {
        if (id) {
            for (let i in this._oProductData) {
                if (this._oProductData[i].id == id) {
                    return this._oProductData[i];
                }
            }
        }
        return this._oProductData;
    }

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