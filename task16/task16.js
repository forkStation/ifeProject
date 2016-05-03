//用户输入的城市名必须为中英文字符，空气质量指数必须为整数
/*用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据*/


function checkData(element1,element2){
    var cityName = element1.value.trim();
    var airQuality = element2.value.trim();
    var cityPattern = /[a-zA-Z]+$/;
    var qualityPattern = /[0-9]+$/;
    if(cityName==""){
        alert("请输入城市名称");
    }
    else{
        if(!cityName.match(cityPattern)){
            alert("城市名必须为中英文字符！");
            element1.value = "";
            element1.focus();
            return false;
        }
        if(airQuality == ""){
            alert("请输入空气质量");
        }
        else{
            if(!airQuality.match(qualityPattern)){
                alert("空气质量必须为整数！");
                element2.value = "";
                element2.focus();
                return false;
            }
            return true;
        }
    }
}
function initTable(){
    var table = document.getElementById("table");
    var trLength = table.getElementsByTagName("tr");
    if(!trLength){
        table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    }
}
function addData(){//添加数据
    var table = document.getElementById("table");
    var cityElm = getId("city-input");
    var qualityElm = getId("value-input");
    var cityName = cityElm.value.trim();
    var airQuality = qualityElm.value.trim();

    var valid = checkData(cityElm,qualityElm);
    if(valid){
        var trElm =table.insertRow(table.rows.length);
        var cell0 = trElm.insertCell(0);
        var cell1 = trElm.insertCell(1);
        var cell2 = trElm.insertCell(2);
        cell0.innerText = cityName;
        cell1.innerText = airQuality;
        cell2.innerHTML = "<button class='delBtn' onclick='delData(this);'>删除</button>"
        //var trElm = document.createElement("tr");
        initTable();
        table.appendChild(trElm);

        getId("city-input").value = "";
        getId("value-input").value = "";
    }

}
function delData(deleteBtn){
    console.log(deleteBtn);
    var table = document.getElementById("table");
    table.removeChild(deleteBtn.parentNode.parentNode);
}
function getId(id){
    return document.getElementById(id);
}
window.onload = function init() {
    var addBtn = getId("addBtn");
    addBtn.onclick = function(){
        addData();
    }

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

};
