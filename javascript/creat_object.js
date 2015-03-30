(function() {

    // 对象的构造函数：（构造函数模式创建对象的问题：没有复用，封装性不好）
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        // 将函数声明放到构造函数外面，会使实例化的对象调用一个函数
        this.sayname = sayName;
        // 函数声明放在构造函数之内，会使每次实例化的对象都重新创建一个Function
        this.sayAge = function() {
            console.log(this.age);
        }
    }

    // 外部函数声明
    function sayName() {
        console.log(this.name);
    }

    // 构造函数的实例：
    var person1 = new Person("whw", 25, "front ends");
    person1.sayname();   // whw

    var person2 = new Person("whw", 25, "front ends");
    person1.sayname();   // whw

    Person("iGrado", 28, "doctor");
    window.sayname();   // iGrado

    var o = new Object();
    Person.call(o, "HongweiWang", 20, "student");
    o.sayname();   // HongweiWang

    // 函数声明放在构造函数内外的差别：
    console.log(person1.sayname == person2.sayname);   // ture
    console.log(person1.sayname == o.sayname);   // ture

    console.log(person1.sayAge == person2.sayAge);   // false

//-------------------------------------------------------------------------------------------------------------------------------------

    // 对象的原型构造：（原型模式创建对象的问题：1、不能传参 2、共享问题）
    function Book() {}
    Book.prototype = {

        // 字面量初始化原型属性和方法是，constructor 不在指向原型，所以要强行指回来，
        // 但是这种修改方式会使 constructor 的 enumerable 变为 true，默认为false
        
        //constructor: Book,   
        name: "nodeJs",
        author: "jacksonTian",
        year: 2004,
        edition: 1,
        sayname : sayName
    };

    Object.defineProperty(Book.prototype, "constructor", {   // 替代constructor: Book 的方式
        enumerable: false,
        value: Book
    });

    var descriptor = Object.getOwnPropertyDescriptor(Book.prototype, "constructor");
    console.log(descriptor.enumerable);   // false

    var book1 = new Book;
    book1.pages = 280;

    for(var i in book1) {
        console.log(i);   // pages、name、author、year、edition （不包含constructor 属性）
    }
    
    for(var i in book1) {
        if (book1.hasOwnProperty(i)) {
        console.log(i);   // pages（过滤了原型的属性和方法）
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------

    // 组合使用构造函数模式与原型模式：（最优选择）
    function Athlete(name, age, level) {   // 不共享的可传参的对象属性和方法
        this.name = name;
        this.age = age;
        this.level = level;
        this.friends = ["whw", "iGrado"];
    }
   
    if (typeof this.sayName != "function") {   // 原型中的属性和方法可以共享
        Athlete.prototype = {   
            constructor : Athlete,
            sayName : function() {
                console.log(this.name);
            }
        }
    }

    var athlete1 = new Athlete("HongweiWang", 25, "super");
    var athlete2 = new Athlete("BoZhang", 24, "middle");

    athlete1.friends.push("ZCY");
    console.log(athlete1.friends);   // ["whw", "iGrado", "ZCY"]
    console.log(athlete2.friends);   // ["whw", "iGrado"]
    console.log(athlete1.sayName === athlete2.sayName);   // true
    console.log(athlete1.sayName());   // HongweiWang
    console.log(athlete2.sayName());   // BoZhang


})();
