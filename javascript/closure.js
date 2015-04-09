(function () {
    // 闭包的外部变量存储问题：
    function a () {
        var result = [];
        for (var i = 0; i < 10; i++) {
            result[i] = function () {
                return i;
            };
        }
        return result;
    }
    var b = a();
    for (var k = 0; k < b.length; k++) {
        console.log(b[k]());
        /* 问题：遍历数组会输出10个10
        原因分析：因为在函数a中的匿名函数（即闭包）循环执行时，在其作用域链中都保存了a函数中的活动对象
        即 result 和 i 变量，即当 i 最后一次被修改为10之后，匿名函数中保存的 i 的值也都被修改为10了。
        */
    }
    b = null;   // 闭包的引用回收

    // fix闭包的外部变量存储问题：
    function c () {
        var result = [];
        for (var i = 0; i < 10; i++) {
            result[i] = function (num) {
                return function () {
                    return num;
                };
            }(i);
        }
        return result;
    }
    var d = c();
    for (var j = 0; j < d.length; j++) {
        console.log(d[j]());
        /* 遍历数组会输出 0-9
        原因分析：这次没有直接把闭包的返回值赋给数组，而是在外面又封装了一层匿名函数并自动执行，还同时
        传递了参数num ，让 i 的值赋值给num，最后返回num给数组赋值，所以当活动对象 i 变化时不会影响每次
        循环执行的匿名函数中的num参数的值，也就可以输出 0-9 了
        */
    }
    d = null;   // 闭包的引用回收

    // 闭包的this对象的全局性问题：
    name  = "the window";   // 私有域中声明全局变量，不推荐使用
    var object = {
        name : "the object",
        getName : function () {
            return function () {
                return this.name;
            };
        }
    };
    var result = object.getName();
    console.log(result());   // the window
    result = null;   // 闭包的引用回收
    
    // fix闭包的this对象的全局性问题：
    var name_  = "the window";
    var object_ = {
        name : "the object",
        getName : function () {
            var that = this;
            return function () {
                return that.name;
            };
        }
    };
    var result_ = object_.getName()；
    console.log(result_());   // the object
    result_ = null;  // 闭包的引用回收
    
})();
