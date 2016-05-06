/**
 * Created by Administrator on 2016/5/5.
 */
var list = document.querySelector("#list");
function listHandle(direction,operation){

    var childNode;
    switch (direction){
        case "left": childNode = list.firstChild;break;
        case "right":childNode = list.lastChild;break;
    }
    switch(operation){
        case "in":
            var inputNum = document.querySelector("#inputNum").value;
            if(!checkValue(inputNum))
                return false;
            var liNode = getChildNode(inputNum.trim());
            switch(direction){
                case "left":
                    list.insertBefore(liNode,list.childNodes[0]);
                    setNodeStyle();
                    break;
                case "right":
                    list.appendChild(liNode);
                    setNodeStyle();
                    break;
            }
            break;
        case "out":
            if(!listCheck())
                return false;
            list.removeChild(childNode);
            setNodeStyle();
            break;
    }
}

function listCheck(){
    if(!list.hasChildNodes()){
        alert("没有可操作的数据");
        return false;
    }
    return true;
}
function checkValue(inputData){//判断输入是否合法
    var inputData = inputData.trim();
    var pattern = /^-?[1-9]\d*$/;
    if(inputData==''){
        alert("输入为空");
        return false;
    }

    else if(pattern.test(inputData)){//正则表达式匹配
        if(inputData>=10&&inputData<=100)
        return true;
        else{
            alert("请输入10~100的数字");
            return false;
        }
    }
    else{
        alert("请输入数字");
        return false;
    }
}

function delSelf(id){   //删除元素本身
    document.querySelector("#list").removeChild(id);
}

function initList(){ //点击随机生成按钮触发
    list.innerHTML = "";
    var num = 30;
    for(var i=0;i<num;i++){
        var liNode = getChildNode();
        list.appendChild(liNode);   //循环调用创建节点方法创建新的柱形节点
    }
    setNodeStyle();    //设置柱形图节点样式
}

function setNodeStyle(){
    var listChilds = list.querySelectorAll("li");
    var size = listChilds.length;
    if(size>=60){   //判断柱形节点是否达到上限，如果达到，则不渲染
        alert("数据上限为60");
        return false;
    }
    for(var i=0;i<size;i++){
        listChilds[i].style.width = (list.clientWidth/size)/3*2+"px";
    }
}
function getChildNode(inputNum){
    var height = Math.random()*80+21;
    if(arguments.length){
        height=inputNum;
    }
    var liNode = document.createElement("li");
    liNode.setAttribute("onclick","delSelf(this)");
    liNode.style.cssText = "height:"+height*3+"px;";
    return liNode;
}
function beginBubble(){
    var clear;
    clear = setInterval(run,35);
    var i= 0,j=0;
    function run(){
        var childList = list.querySelectorAll("li");
        var size = childList.length;
        if(i<size){
            if(j<size-i-1){
                exchange(childList[j],childList[j+1]);
                j++;
                return;
            }
            else{
                j = 0;
                i++;
            }
        }
       else{
            clearInterval(clear);
        }
    }
}

function exchange(ele1,ele2){
        var temp;
        if(ele1.offsetHeight>ele2.offsetHeight){
            temp = ele1.offsetHeight;
            ele1.style.height = ele2.offsetHeight+"px";
            ele2.style.height = temp+"px";
        }

}