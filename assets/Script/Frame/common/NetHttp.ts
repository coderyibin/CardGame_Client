
export class NetHttp {
    private _netSend;
    private _sUrl;
    constructor (url, cb) {
        this._netSend = cc.loader.getXMLHttpRequest();
        let send = this._netSend;
        this._netSend.onreadystatechange = () => {
            if (this._netSend.readyState == 4 && (this._netSend.status >= 200 && this._netSend.status < 400)) {
                var response = this._netSend.responseText;
                // console.log(response);
                if (cb) cb(response);
            }
        };
        this._sUrl = url;
    }

    send (type : string, data ?: any) : void {
        this._netSend.open(type, this._sUrl, true);
        this._netSend.send(data);
    }
}
