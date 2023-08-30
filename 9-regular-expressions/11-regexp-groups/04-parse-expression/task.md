# 解析表达式

一个算术表达式由 2 个数字和一个它们之间的运算符组成，例如：

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

运算符为 `"+"`、`"-"`、`"*"` 或 `"/"` 中之一。

在开头、之间的部分或末尾可能有额外的空格。

创建一个函数 `parse(expr)`，它接受一个表达式作为参数，并返回一个包含 3 个元素的数组：

1. 第一个数字
2. 运算符
3. 第二个数字

用例：

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```