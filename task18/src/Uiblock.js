/**
 * Created by wj on 2016/5/5.

 _
 _ooOoo_
 o8888888o
 88" . "88
 (| -_- |)
 O\  =  /O
 ____/`---'\____
 .'  \\|     |//  `.
 /  \\|||  :  |||//  \
 /  _||||| -:- |||||_  \
 |   | \\\  -  /'| |   |
 | \_|  `\`---'//  |_/ |
 \  .-\__ `-. -'__/-.  /
 ___`. .'  /--.--\  `. .'___
 ."" '<  `.___\_<|>_/___.' _> \"".
 | | :  `- \`. ;`. _/; .'/ /  .' ; |
 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
 ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
 `=--=-'                    wj
 佛祖保佑                永无bug
 */
export default class Uiblock {

    constructor(arg) {
        if (typeof arg === "string") {
            this.DomObject = document.querySelector(arg);
        } else {
            this.DomObject = arg;
        }
        //绑定点击事件
        this.DomObject.onclick = (e)=> {
            this._ClickOper();
        };
    }

    ClickInit(queue, operator, index) {
        this._queue = queue;
        this._operator = operator;
        this._index = index;
    }

    _ClickOper() {
        this._queue[this._operator](this._index);
        console.log(this._queue);
        this._queue.render();
    }

}