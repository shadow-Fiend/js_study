//ES5可以先使用再定义,存在变量提升
new A();
function A() {}
//ES6不能先使用再定义,不存在变量提升 会报错
new B(); //B is not defined
class B {}
