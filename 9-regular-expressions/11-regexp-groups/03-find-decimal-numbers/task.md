# 找出所有数字

编写一个正则表达式，找出所有十进制数字，包括整数、浮点数和负数。

用例：

```js
let regexp = /你的正则表达式/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) ); // -1.5, 0, 2, -123.4
```