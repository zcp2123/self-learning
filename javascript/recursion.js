(function() {

    // 递归：实现一个简单的阶乘函数：
    function factorial1(num) {
        if (num < 1) {
            return 1;
        } else {
            return num * factorial1(num-1);
        }
    }

    // 调用：
    var instance1 = factorial1;
    console.log(instance1(4));   // 24
    // factorial1 = null;   // factorial不再是函数，再调用递归函数会报错
    // console.log(instance1(4));   // TypeError: object is not a function

//-------------------------------------------------------------------------------------------------------------------------------------

    // 使用arguments.callee代替递归函数中的自调用
    function factorial2(num) {
        if (num < 1) {
            return 1;
        } else {
            return num * arguments.callee(num-1);
        }
    }
    
    var instance2 = factorial2;
    console.log(instance2(5));
    factorial2 = null;
    console.log(instance2(5));

//-------------------------------------------------------------------------------------------------------------------------------------

    // 但是在严格模式下不能使用脚本访问arguments.callee，所以用命名函数表达式来达成相同的效果
    var factorial3 = (function f(num){
        if (num < 1){
            return 1;
        } else {
            return num * f(num-1);
        }
    });

    var instance3 = factorial3;
    console.log(instance3(6));
    factorial3 = null;
    console.log(instance3(6));

console.log("---------------------------------------------------");


})();