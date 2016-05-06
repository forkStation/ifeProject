##冒泡排序算法可视化实现：
实现思路：将冒泡排序算法流程延迟显示

***

实现过程：

***

`
javascript:
var clear = setInterval(fun,time);//在所调用的方法设置周期函数
//以下是所实现的方法

var i=0,j=0;
var size = ele.length;//获取需要排序的数据长度
if(i<size){
    if(j<size-i-1){
        (此处写 条件判断与元素交换过程，略);
        j++;//j+1;
        return;//运行一次停止执行
    }
    else{//当j遍历一遍以后 i+1
        j = 0;  //将j设置为0
        i++;
    }
    else{//当i遍历完成，清除Interval
        i = 0；//初始化i;
        clearInterval(fun);
    }
}`
***
