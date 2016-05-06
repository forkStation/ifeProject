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
import Uiblock from "./Uiblock";
export default class QueueElement extends Uiblock {
    constructor(text, queue) {
        let oli = document.createElement("li");
        oli.innerHTML = text;

        super(oli);
        this.queue = queue;

    }

    _ClickOper() {
        console.log(this.queue);
        var index = this.queue._queue.indexOf(this);
        this.queue.del(index);

        this.queue.render();
    }
}