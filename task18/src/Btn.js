/**
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
import Uiblock from "./Uiblock";
import QueueElement from "./QueueElement";
export default class Button extends Uiblock {
    constructor(DomObject) {
        super(DomObject);
    }

    _ClickOper() {
        let text = document.querySelector("#inputNum").value;
        let queueElement = new QueueElement(text, this._queue);
        this._queue[this._operator](queueElement);
        this._queue.render();

        console.log(this._queue);
    }
}