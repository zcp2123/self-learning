(function() {

    // 外部函数声明
    function sayName() {
        console.log(this.name);
    }
    // 对象的构造函数：
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

    // 对象的原型构造：
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


    
    



})();