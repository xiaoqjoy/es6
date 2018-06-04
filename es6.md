```javascript
var a = 0;
for(var i = 0; i < 101; i++){
  a += i;
}
console.log(a)     // 5050

```

####温习闭包
```javascript
function f1(){
    var n = 999;
    function f2(){
        console.log(n)
    }
    return f2;
}
var result = f1();
result();      
```

闭包作用：函数f1外部读取函数f1内部变量

```javascript
function f1(){
    var n = 999;
    nAdd = function(){
        n += 1;
    }
    function f2(){
        console.log(n)
    }
    return f2;
}
var result = f1();
result();     //999
nAdd();
result();     //1000
```

函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除

f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，
而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，
被垃圾回收机制（garbage collection）回收