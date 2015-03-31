 (function() {

    // 原型链继承的问题：1、子类不能给超类传参 2、超类的共享问题
    // 借用构造函数继承的问题：方法都在构造函数中定义，无法复用
    // 组合继承（最优选择）：
    function SuperType(name) {
        this.name = name;
        this.color = ["red", "orange", "gray"];
    }
    SuperType.prototype.sayName = function() {
        console.log(this.name);
    };
    function SubType(name, age) {
        SuperType.call(this, name);
        this.age = age;
    }
    SubType.prototype = new SuperType();
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function() {
        console.log(this.age);
    }

    // 实例：
    var instance1 = new SubType("whw", 25);
    instance1.color.push("black");
    console.log(instance1.color);   // ["red", "orange", "gray", "black"]
    instance1.sayName();   // whw
    instance1.sayAge();   // 25

    var instance2 = new SubType("iGrado", 24);
    console.log(instance2.color);   // ["red", "orange", "gray"]
    instance2.sayName();   // iGrado
    instance2.sayAge();   // 24

//-------------------------------------------------------------------------------------------------------------------------------------

    // 寄生组合式继承：（效果与组合继承相同）
    // 超类：
    function Person(name) {
        this.name = name;
        this.information = ["male", "25", "student"];
    }
    Person.prototype.sayName = function() {
        console.log(this.name);
    };

    // 寄生函数：
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    function inheritPrototype(subtype, supertype) {
        var prototype = object(supertype.prototype);
        prototype.constructor = subtype;
        subtype.prototype = prototype;
    }

    // 子类：
    function Athlete(name, level) {
        Person.call(this, name);
        this.level = level;
    }

    inheritPrototype(Athlete, Person);

    Athlete.prototype.sayLevel = function() {
        console.log(this.level);
    }

    // 实例：
    var athlete1 = new Athlete("whw", "super");
    athlete1.information.push("basketball-player");
    console.log(athlete1.information);   // ["male", "25", "student", "basketball-player"]
    console.log(athlete1.sayName());   // whw
    console.log(athlete1.sayLevel());   //super

    var athlete2 = new Athlete("zcy", "middle");
    console.log(athlete2.information);   // ["male", "25", "student"]
    console.log(athlete2.sayName());   // zcy
    console.log(athlete2.sayLevel());   // middle

 })();
