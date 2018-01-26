import { I18N } from "../common/Common";
// const i18n = require('LanguageData');

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseLabel extends cc.Label {
    get string () {
        return this.string;
    }

    set string (str : string) {
        if (I18N === true) {//开启多语言
            // let str = i18n.t('hello');
            // this.string = str;
        } else {
            this.string = str.replace(/%s/, str);
        }
    }

    // setString (val : string) : void {
    //     debugger
    //     if (I18N === true) {//开启多语言
    //         let str = i18n.t(val);
    //         this.string = str;
    //     } else {
    //         this.string = val.replace(/%s/, val);
    //     }
    // }
}