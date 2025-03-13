
## js数据类型
js在创建变量的时候通常是直接以 `var x` 的形式就能够创建出不同类型的变量，这主要是源于js能够自动根据给出的数值识别变量的类型。以下详细介绍几种数据类型：

### number
不区分整数和小数，可以直接使用 `number` 进行数学运算，`%` 用于求余数。

### 字符串
使用单引号或者双引号。

### 布尔值
用于判断，返回值为 `true` 或 `false`。`&&`、`||`、`!` 分别代表与、或、非。

代码示例：

```javascript
console.log(1 > 2 && 2 > 1); // false
console.log(1 > 2 || 2 > 1); // true
console.log(!1); // false
```

要特别注意相等运算符 `==`。JavaScript在设计时，有两种比较运算符：

第一种是 `==` 比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；  
第二种是 `===` 比较，它不会自动转换数据类型，如果数据类型不一致，返回 `false`，如果一致，再比较。

由于JavaScript这个设计缺陷，不要使用 `==` 比较，始终坚持使用 `===` 比较。

另一个例外是 `NaN` 这个特殊的 `Number` 与所有其他值都不相等，包括它自己：

```javascript
console.log(NaN === NaN); // false
console.log(NaN == NaN); // false
```

### BigInt
要精确表示比 `2^53` 还大的整数，可以使用内置的 `BigInt` 类型，它的表示方法是在整数后加一个 `n`，例如 `9223372036854775808n`，也可以使用 `BigInt()` 把 `Number` 和字符串转换成 `BigInt`：

```javascript
const bigInt = 9223372036854775808n;
const bigIntFromNumber = BigInt(123);
const bigIntFromString = BigInt("123456789012345678901234567890");
```

使用 `BigInt` 可以正常进行加减乘除等运算，结果仍然是一个 `BigInt`，但不能把一个 `BigInt` 和一个 `Number` 放在一起运算：

```javascript
console.log(bigInt + bigIntFromNumber); // 9223372036854775931n
```

### null 和 undefined
`null` 通常表示值为空，与字符串 `''`、0 存在差异，`''` 表示有传一个字符长度为零的字符串，`null` 则表示没有传任何东西。

### 数组
创建方式：

```javascript
let arr1 = new Array();
let arr2 = [1, 2, 3];
```

### 对象
JavaScript对象的键都是字符串类型，值可以是任意数据类型。

```javascript
let obj = {
    name: 'ssss',
    age: 18
};
```

### 变量
不能用数字开头，声明变量的语句可以是 `var a`；此时的 `a` 因为没有分配数据类型，所以为未定义状态，也就是 `undefined`。

变量可以反复赋值，可以不同类型的变量赋值，赋值使用 `=` 号。

```javascript
var a = 'sss';
a = 123;
```

### strict模式
设计之初是因为不强制使用 `var` 声明变量，声明的是全局变量，如果出现多个js在一个页面里使用的时候，如 `1.js` 出现了 `i = 1` 的声明，在 `2.js` 中有 `i = 5` 的声明，就有可能导致程序出错，因为它们都是全局变量。`strict` 模式就是强制所有人使用 `var` 声明变量。

使用方式：在js第一行加 `'use strict'`

```javascript
'use strict';
var i = 1;
```

## 字符串深入
### 转义字符
防止在字符串中出现 `'` 和 `"` 同时存在的情况，保证字符串能完整解析。在字符串中需要使用 `'` 或者 `"` 的前面加上 `\`。

示例：

```javascript
let str = '王\\\'邦、"城';
console.log(str); // 王\'邦、"城
```

### 多行字符串
以前用 `\n`，在 ES6 的标准中可以使用以下表示方式：

```javascript
let str = `sssasa
ssss
sss`;
console.log(str);
```

### 模板字符串
用加号进行连接：

```javascript
let a = 'ssss' + 'abb';
console.log(a); // ssssabb
```

### 字符串操作
```javascript
let a = 'ssddadvb';
console.log(a[0]); // 索引取值，无法对字符串进行赋值
```

操作方法：

```javascript
console.log(a.toUpperCase()); // 将字符变成大写
console.log(a.toLowerCase()); // 将字符串变成小写
console.log(a.indexOf('d')); // 搜索指定字符出现的位置
console.log(a.substring(0, 5)); // 返回指定索引区间的子串
```

## 数组
js的数组可以包含任意类型的数据类型，并且通过索引进行元素访问。

### 数组长度
在js中数组的长度会因为给超出数组的元素赋值和给数组长度赋值导致数组的长度出现改变。

```javascript
let arr = [1, 2, 3];
arr[5] = 6;
console.log(arr.length); // 6

arr.length = 2;
console.log(arr); // [1, 2]
```

### indexOf
根据数组元素返回索引。

```javascript
let a = [1, 1, 5, 4, false];
console.log(a.indexOf(1)); // 0, 这里如果有多个相等元素indexOf会返回第一个找到的元素
console.log(a.indexOf(4)); // 3
```

### slice
切割数组返回一个新的数组。

```javascript
let a = [4, 'ssad', 45, 'dads'];
let b = a.slice(0, 2);
console.log(b); // [4, 'ssad']
```

### push 和 pop
`push` 是在数组最后一位加元素，`pop` 是在数组最后一位移除元素。

```javascript
let a = [1, 2, 3];
a.push(4);
console.log(a); // [1, 2, 3, 4]

a.pop();
console.log(a); // [1, 2, 3]
```

### unshift 和 shift
头部元素的增减：

```javascript
var a = [1];
a.unshift('a'); // a = ['a', 1]
a.shift(); // a = [1]
```

### sort
直接调用为顺序排序：

```javascript
var i = [5, 6888, 174];
i.sort(); // [5, 174, 6888]
```

### reverse
反转数组：

```javascript
var a = [1, 2, 3];
a.reverse(); // [3, 2, 1]
```

### splice
这个是操作数组，可以指定索引进行删除并添加自己需要的元素：

```javascript
var a = ['a', 'c', 'v', 'd', 'd', 's', 'a'];
var removed = a.splice(1, 2, 5, 8, 7); // 返回值是被删掉的元素，这里是 ['c', 'v']
console.log(a); // ['a', 5, 8, 7, 'd', 'd', 's', 'a']
```

### concat
`concat` 可以将两个数组连接起来，不改变原本的数组，并且当接收参数为数组的时候会将数组拆分成元素再全部添加到新的数组中：

```javascript
var a = ['s'];
var b = a.concat(1, ['s', 5]); // 这里实际上是 ['s', 1, 's', 5]
console.log(b);
```

### join
把每个元素通过特定字符串连接起来：

```javascript
var a = [1, 5];
var result = a.join('+'); // "1+5"
console.log(result);
```

### 多维数组
可以当成矩阵：

```javascript
var a = [[1, 2, 3], [4, 5, 68]];
console.log(a[1][2]); // 68
console.log(a[0][1]); // 2
```

## 对象
### 对象的组成
`{...}` 表示一个对象，键值对用 `xxx: xxx` 形式声明，用 `,` 隔开。

示例：

```javascript
var a = {
    age: 18,
    name: "王洛",
    'l-l': "示例" // 如果属性名包含特殊字符，就必须用引号括起来
};
console.log(a.name); // 取值
console.log('name' in a); // 返回 true，用于检测该对象是否有该属性
```

## 条件判断
示例：

```javascript
var bmi = weight / height;
if (bmi < 18.5) {
    console.log("过轻");
} else if (bmi >= 18.5 && bmi <= 25) {
    console.log("正常");
} else if (bmi > 25 && bmi <= 28) {
    console.log("超重");
} else if (bmi > 28 && bmi <= 32) {
    console.log("肥胖");
} else {
    console.log("非常肥胖");
}
```

## 循环
循环初始化，终止条件，每次循环之后执行的函数：

```javascript
var x = 1;
for (var i = 1; i <= 10; i++) {
    x = i * x;
}
console.log(x); // 输出阶乘结果
```

### for...in
它的作用是把对象的属性依次循环出来，搭配 `hasOwnProperty` 使用可以过滤掉继承的属性：

```javascript
var a = {
    name: 'ssss',
    age: 18
};

for (var key in a) {
    if (a.hasOwnProperty(key)) {
        console.log(key);
    }
}
```

### while 和 do...while
示例：

```javascript
var a = 0;
var n = 0;

while (n < 10) {
    a++;
    n++;
}

do {
    a++;
    n++;
} while (n < 10);
```

## Map 和 Set
### Map
`Map` 的核心是键值对，能够根据 key 快速查找对应的值：

```javascript
// 初始化 Map
var m = new Map();

m.set('sss', 15);
m.set('a', 4);

console.log(m.get('sss')); // 15
```

### Set
`Set` 的作用是保存 key，特点是 key 值唯一，所以重复添加不会有效果，删除也是直接删除 key 值而不是索引：

```javascript
var a = new Set();
a.add(1);
a.add(2);
a.delete(2); // 删除值为2的元素
console.log(a); // Set { 1 }
```

## Iterable
ES6 标准引入了新类型，原因是因为 `Map` 和 `Set` 无法使用下标循环。在新的 ES6 中，`iterable` 包含了 `Map`、`Set`、`Array`，可以使用 `for...of` 循环：

```javascript
var a = ["a", "b", "c"];
a.name = "ss";

for (var x of a) {
    console.log(x);
}
// 输出: a, b, c

for (var x in a) {
    console.log(x);
}
// 输出: 0, 1, 2, name
// for...in 本身只打印属性名
```

