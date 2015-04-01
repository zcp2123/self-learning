(function() {

    var person =  {   // 字面量创建一个对象
        name : "whw",
        _age : 25,
        job : "front ends",

        sayName : function() {
            console.log(this.name);
        }
    };
    person.sayName();   // whw   

 //-------------------------------------------------------------------------------------------------------------------------------------   
  
    // 对象的数据属性的方法：
    Object.defineProperty(person, "name", { 
        enumerable : false,   // 对象的某个属性不能通过 for-in 循环返回属性
        writable : false   // 对象的某个属性的值不能被修改
    }); 

    person.name = "iGrado";
    person.sayName();   // whw

 //-------------------------------------------------------------------------------------------------------------------------------------   

    // 对象的访问器属性的方法：
    person.__defineGetter__("age", function(){ 
        return this._age;
    });
    person.__defineSetter__("age", function(newValue){ 
        if (newValue > 25) {
            this._age = newValue;   
            this.learnYears = newValue - 25;
        }
    });
        
    person.age = 28;   
    console.log(person.learnYears);   // 3
 
 //-------------------------------------------------------------------------------------------------------------------------------------   

    // 用 Object.defineProperties() 方法给对象定义多个属性（2个数据属性，1个访问器属性）：
    var book = {
        _year : 2004,
        edition : 1
    };
    Object.defineProperties(book, {
        name : {
            value : "nodeJs"
        },
        author:{
            value : "jacksonTian"
        },
        year : {
            get : function() {
                return this._year;
            },
            set : function(num) {
                if (num > 2004) {
                    this._year = num;   
                    this.edition += num - 2004;
                }  
            }
        }
    });
     
    book.year = 2008;
    console.log(book.edition);   // 5

//-------------------------------------------------------------------------------------------------------------------------------------   

    // 用 Object.getOwnPropertyDescriptor() 方法读取某个对象的某个属性的特性，返回一个对象
    // 读取数据属性：
    var descriptor1 = Object.getOwnPropertyDescriptor(book, "_year");
    console.log(descriptor1.value);   // 2008
    console.log(typeof descriptor1.get);   // undefined

    // 读取访问其属性：
    var descriptor2 = Object.getOwnPropertyDescriptor(book, "year");
    console.log(descriptor2.value);   // undefined
    console.log(typeof descriptor2.get);   // function
    console.log(typeof descriptor2.set);   // function

console.log("---------------------------------------------------");
})();
