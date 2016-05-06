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
export default class Queue {
    constructor() {
        this._queue = [];
    }

    /**
     * 右边出队
     * @returns {*} 返回出队列的项
     */
    pop() {
        return this._queue.pop();
    }

    /**
     * 右边进队列
     * @param queueElement
     * @returns {Number} 返回新的队列长度
     */
    push(queueElement) {
        return this._queue.push(queueElement);
    }

    /**
     * 左边进队列
     * @param queueElement
     * @returns {Number} 返回新的队列长度
     */
    unshift(queueElement) {
        return this._queue.unshift(queueElement)
    }

    /**
     * 左边出队列
     * @returns {*} 返回出队的数据
     */
    shift() {
        return this._queue.shift();
    }

    /**
     * 删除索引位置的元素
     * @param index 索引
     * @returns {*} 返回被删除元素的值
     */
    del(index) {
        let arr = this._queue.splice(index, 1);
        return arr[0];
    }

    render() {
        let oUl = document.querySelector("#list");
        oUl.innerHTML = "";
        this._queue.forEach(function (val) {
            oUl.appendChild(val.DomObject)
        })
    }
}