/**
 * Created by Administrator on 2016/5/3.
 */

//数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = { };

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chatWarpNode = document.querySelector(".aqi-chart-wrap");
    chatWarpNode.innerHTML = "";
    var size = Object.keys(chartData).length;
    for(var i=0;i<size;i++){
        var divElement = document.createElement("div");
        var divWidth = chatWarpNode.clientWidth/size;
        divElement.setAttribute("class","chartDataDiv");
        divElement.setAttribute("title",Object.keys(chartData)[i]);
        divElement.style.cssText="background:"+getRandomColor()+";width:"+(divWidth/3*2)+"px;height:"+chartData[Object.keys(chartData)[i]]+"px;margin-right:"+(divWidth/3);
        chatWarpNode.appendChild(divElement);
    }
}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var citySelect = document.querySelector("#city-select");
    var selectedCity = citySelect.options[citySelect.selectedIndex].text;
    if(selectedCity != pageState.nowSelectCity){// 确定是否选项发生了变化
        pageState.nowSelectCity = selectedCity;
        initAqiChartData();// 设置对应数据
        renderChart();// 调用图表渲染函数
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radioElm = document.getElementsByName("graTime");
    for (var i = 0; i < radioElm.length; i++) {
        radioElm[i].onclick = function () {
            var nowGraTime = this.value;
            if(nowGraTime!=pageState.nowGraTime){
                pageState.nowGraTime = nowGraTime;
                initAqiChartData();
            }
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var cityNames = Object.keys(aqiSourceData);
    var citySelect = document.querySelector("#city-select");
    citySelect.onchange = function(){
        citySelectChange();
    }
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityList = "";
    for(var i in cityNames){
        cityList+="<option>"+cityNames[i]+"</option>";
    }
    citySelect.innerHTML = cityList;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var nowGraTime = pageState.nowGraTime,nowSelectCity = pageState.nowSelectCity;
    var weekSum = 0,daySum=0;
    var data = aqiSourceData[nowSelectCity];
    switch(nowGraTime){
        case "day":chartData = data; renderChart();  break;
        case "week":
            var i =0;
            chartData = {};
            var weekCount = Math.ceil(Object.keys(data).length/7);
            console.log("总周数："+weekCount);
                for(var days=1;days<Object.keys(data).length+1;days++){
                    if(days%7!=0){
                        weekSum += (data[Object.keys(data)[days]]);
                    }
                    else{
                        console.log(days);
                        i++;
                        chartData["第"+i+"周"] = weekSum/7;
                        weekSum = 0;
                    }
                }
            renderChart();
            break;
        case "month":
            console.log(data);
            chartData = {};
            var monthSum = 0,monthCount = 0;
            var monthTemp = Object.keys(data)[0].split("-")[1];
            console.log(Object.keys(data).length);
            for(var i=1;i<Object.keys(data).length;i++){
                var m = (Object.keys(data)[i]).split("-")[1];
                if(monthTemp==m){
                    daySum++;
                    monthSum +=data[Object.keys(data)[i]];
                    if(i==Object.keys(data).length-1){
                        console.log(i);
                        console.log("最后一个数字是："+i);
                        chartData["第"+(monthCount+1)+"个月"] = monthSum/daySum;
                    }
                }else{
                    monthTemp = m;
                    monthCount++;
                    chartData["第"+monthCount+"个月"] = monthSum/daySum;
                    monthSum = 0;
                    daySum=0;
                }
            }
            renderChart();
            break;
    }
}

//获取随机颜色
function getRandomColor(){
    return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
}
/**
 * 初
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();

}

window.onload = function(){
    init();
}