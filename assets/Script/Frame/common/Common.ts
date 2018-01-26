import { Base64 } from "./Base64";

/**
 * 全局的一些定义
 */
//是否启用多语言
 export let I18N = false;


 //模块定义
 export enum MODULE {
    BUY = "Tip_Buy",
    SALE = "Tip_Sale",
    SHOP_UNIT = "Unit_Product",
    House_UNIT = "Unit_House",
    EXPAND = "Tip_Expand",
    BANK = "Tip_Bank",
    HOSPITAL = "Tip_Hospital",
    HELP = "Layer_Help",
    AGAIN = "Tip_Again",
    BUYHOUSE = "Layer_SaleHouse",
    MSG = "Tip_Msg",
    ADIARY = "Tip_ADiary",
    NEWS = "Tip_News",
    UPDATE = "Tip_Update",
 }
 //场景的名称
 export enum SCENE_NAME {
     LOADING = "Loading",
     MENU_SCENE = "MenuScene",
     START_SCENE = "StartGame",
     OVER_SCENE = "GameOver"
 }

 //游戏结束方式
 export enum OVER_TYPE {
     NONE,
     BUY,
     TIMEOUT,
     DIE
 }

 //交易类型
 export enum TRADE_TYPE {
     BUY,//买入
     SALE//卖出
 }

 //财务类型
 export enum BANK {
    DEPOSIT,//存款
    WITHDRAWALS
 }

 //数据保存本地的key配置
 export enum LOCAL_KEY {
     PLAYER = "player",
 }

 //方块的尺寸
 export enum PANEL_SIZE {
     WIDTH = 178,
     HEIGHT = 319
 }

 //游戏模式
 export enum GAME_MODE {
     MODE_CLASSICS,//经典模式
     MODE_QUICK,//急速模式
 }

 export class Common {

    /**
     * base 64解密
     */
    static BaseDecode (str : string) : string {
        return new Base64().decode(str);
    }

    /**
     * base 64解密
     */
    static BaseEncode (str : string) : string {
        return new Base64().encode(str);
    }
     
    /**
     * 获取指定范围内的随机数
     * @param 最小值 number
     * @param 最大值 number 包含
     */
    static fGetRandom (min : number, max : number) : number {
        let num : number = Math.floor(Math.random() * max + min);
        return num;
    }

    /**
     * 获取文件名称
     * @param 文件路径
     */
    static fGetFileName (path : string) : string {
        while (true) {
            let index : number = path.indexOf("/"); 
            if (index != -1) {
                path = path.substr(index + 1, path.length);
            } else {
                return path;
            }
        }
    }

    //获取json数据的长度
    static fGetJsonLength (json : any) : number {
        if (! json || ! (json instanceof Object)) return;
        let len : number= 0;
        for (let i in json) {
            len ++;
        }
        return len;
    }

    /**
     * 获取当前脚本对象名称
     * @param 脚本对象
     * @return 脚本对象名称
     */
    static fGetObjectName (Comp : cc.Component) : string {
        let name : string = Comp.name;
        let index : number = name.indexOf("<");
        name = name.slice(index + 1, name.length - 1);
        return name;
    }

    /**
     * 字符串包含字母
     */
    static StringHasLetter (str : string) : boolean {
        let regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
        return regString.test(str);//true:包含
    }

    /**
     * 单位换算
     * @param 数字
     * @return 换算后的结果
     */
    static UnitConversion (num : number) : any {
        let snum = Math.floor(num) + "";
        if (snum.length > 4) {
            snum = snum.substr(0, snum.length - 4) + "万";
        } else if (snum.length > 8) {
            snum = snum.substr(0, snum.length - 8) + "亿";
        }
        return snum;
    } 
 }