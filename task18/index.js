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
import Queue from "./src/queue";
import Button from "./src/Button";

require("./css/app.css");

let queue = new Queue();
let btn1 = new Button(".btn:nth-child(1)");
btn1.ClickInit(queue, "unshift");
let btn2 = new Button(".btn:nth-child(2)");
btn2.ClickInit(queue, "shift");
let btn3 = new Button(".btn:nth-child(3)");
btn3.ClickInit(queue, "push");
let btn4 = new Button(".btn:nth-child(4)");
btn4.ClickInit(queue, "pop"); 