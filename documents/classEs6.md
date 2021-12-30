#### 概述

- 传统的 javascript 中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象特点就是将自身的属性共享给新对象。这样的写法相对于其它传统面向对象语言来讲，很有一种独树一帜的感脚！非常容易让人困惑！
- 如果要生成一个对象实例，需要先定义一个构造函数，然后通过 new 操作符来完成。

#### 构造函数示例：

```
//函数名和实例化构造名相同且大写（ 非强制，但这么写有助于区分构造函数和普通函数 ）
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  return '我的名字叫' + this.name + '今年' + this.age + '岁了';
};
const obj = new Person('protein', 18); // 通过构造函数创建对象，必须使用 new 运算符
console.log(obj.say()); // 我的名字叫 protein 今年 18 岁了
```

- 构造函数生成实例的执行过程：
  - 当使用了构造函数，并且 new 构造函数(),后台会隐式执行 new Object() 创建对象;
  - 将构造函数的作用域给新对象，（ 即 new Object() 创建出的对象 ），而函数体内的 this 就代表 new Object() 出来的对象。
  - 执行构造函数的代码。
  - 返回新对象（ 后台直接返回 )
- ES6 引入了 Class（类）这个概念，通过 class 关键字可以定义类。该关键字的出现使得其在对象写法上更加清晰，更像是一种面向对象的语言。如果将之前的代码改为 ES6 的写法就会是这个样子

```
class Person {
  // 定义了一个名字为Person的类
  constructor(name, age) {
    // constructor是一个构造方法，用来接收参数
    this.name = name; // this代表的是实例对象
    this.age = age;
  }
  say() {
    // 这是一个类的方法，注意千万不要加上function
    return '我的名字叫' + this.name + '今年' + this.age + '岁了';
  }
}
const obj = new Person('protein', 18);
console.log(obj.say()); // 我的名字叫protein今年18岁了
```

- 注意项
  - 在类中声明方法的时候，千万不要给该方法加上 function 关键字
  - 方法之间不要用逗号分隔，否则会报错
- 由下面代码可以看出类实质上就是一个函数。类自身指向的就是构造函数。所以可以认为 ES6 中的类其实就是构造函数的另外一种写法！

```
console.log(typeof Person); //function
console.log(Person === Person.prototype.constructor); //true
```

- 以下代码说明构造函数的 prototype 属性，在 ES6 的类中依然存在着。
  `console.log(Person.prototype)`; // 输出的结果是一个对象
- 实际上类的所有方法都定义在类的 prototype 属性上。代码证明下：

```
Person.prototype.say = function () {
  // 定义与类中相同名字的方法。成功实现了覆盖！
  return '我是来证明的，你叫' + this.name + '今年' + this.age + '岁了';
};
var obj = new Person('protein', 18);
console.log(obj.say()); // 我是来证明的，你叫protein今年18岁了
```

- 当然也可以通过 prototype 属性对类添加方法。如下:

```
Person.prototype.addFn = function () {
  return '我是通过prototype新增加的方法,名字叫addFn';
};
var obj = new Person('protein', 18);
console.log(obj.addFn()); // 我是通过prototype新增加的方法,名字叫addFn
```

- 还可以通过 Object.assign 方法来为对象动态增加方法

```
Object.assign(Person.prototype, {
  getName: function () {
    return this.name;
  },
  getAge: function () {
    return this.age;
  },
});
var obj = new Person('protein', 18);
console.log(obj.getName()); // protein
console.log(obj.getAge()); // 18
```

- constructor 方法是类的构造函数的默认方法，通过 new 命令生成对象实例时，自动调用该方法。

```
class Box {
  constructor() {
    console.log('啦啦啦，今天天气好晴朗'); // 当实例化对象时该行代码会执行。
  }
}
var obj = new Box();
```

- constructor 方法如果没有显式定义，会隐式生成一个 constructor 方法。所以即使你没有添加构造函数，构造函数也是存在的。constructor 方法默认返回实例对象 this，但是也可以指定 constructor 方法返回一个全新的对象，让返回的实例对象不是该类的实例。

```
class Desk {
  constructor() {
    this.xixi = '我是一只小小小小鸟！哦';
  }
}
class Box {
  constructor() {
    return new Desk(); // 这里没有用this哦，直接返回一个全新的对象
  }
}
var obj = new Box();
console.log(obj.xixi); // 我是一只小小小小鸟！哦
```

- constructor 中定义的属性可以称为实例属性（ 即定义在 this 对象上 ），constructor 外声明的属性都是定义在原型上的，可以称为原型属性（ 即定义在 class 上 )。hasOwnProperty() 函数用于判断属性是否是实例属性。其结果是一个布尔值， true 说明是实例属性，false 说明不是实例属性。in 操作符会在通过对象能够访问给定属性时返回 true,无论该属性存在于实例中还是原型中。

```
class Box {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }
  sum() {
    return num1 + num2;
  }
}
var box = new Box(12, 88);
console.log(box.hasOwnProperty('num1')); // true
console.log(box.hasOwnProperty('num2')); // true
console.log(box.hasOwnProperty('sum')); // false
console.log('num1' in box); // true
console.log('num2' in box); // true
console.log('sum' in box); // true
console.log('say' in box); // false
```

- 类的所有实例共享一个原型对象，它们的原型都是 Person.prototype，所以 proto 属性是相等的

```
class Box {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }
  sum() {
    return num1 + num2;
  }
}
// box1与box2都是Box的实例。它们的__proto__都指向Box的prototype
var box1 = new Box(12, 88);
var box2 = new Box(40, 60);
console.log(box1.__proto__ === box2.__proto__); // true
```

- 由此，也可以通过 proto 来为类增加方法。使用实例的 proto 属性改写原型，会改变 Class 的原始定义，影响到所有实例，所以不推荐使用！

```
class Box {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  }
  sum() {
    return num1 + num2;
  }
}
var box1 = new Box(12, 88);
var box2 = new Box(40, 60);
box1.__proto__.sub = function () {
  return this.num2 - this.num1;
};
console.log(box1.sub()); // 76
console.log(box2.sub()); // 20
```

- class 不存在变量提升，所以需要先定义再使用。因为 ES6 不会把类的声明提升到代码头部，但是 ES5 就不一样, ES5 存在变量提升,可以先使用，然后再定义。

```
// ES5可以先使用再定义,存在变量提升
new A();
function A() {}
// ES6不能先使用再定义,不存在变量提升 会报错
new B(); // B is not defined
class B {}
```
