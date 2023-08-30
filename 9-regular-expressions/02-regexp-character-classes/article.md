# 字符类

考虑一个实际的任务 —— 我们有一个电话号码，例如 `"+7(903)-123-45-67"`，我们需要将其转换为纯数字：`79031234567`。

为此，我们可以查找并删除所有非数字的内容。字符类可以帮助我们实现它。

**字符类（Character classes）** 是一种特殊的符号，匹配特定集合中的任何符号。

首先，让我们探索“数字”类。它写为 `pattern:\d`，对应于“任何一位数字”。

例如，让我们找到电话号码的第一个数字：

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

如果没有修饰符 `pattern:g`，则正则表达式仅查找第一个匹配项，即第一个数字 `pattern:\d`。

让我们添加修饰符 `pattern:g` 来查找所有数字：

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // 匹配项构成的数组：7,9,0,3,1,2,3,4,5,6,7

// 让我们将其输出为纯数字构成的电话号码：
alert( str.match(regexp).join('') ); // 79031234567
```

这是数字的字符类。还有其他字符类。

最常用的是：

`pattern:\d`（"d" 来自 "digit"）
: 数字：从 `0` 到 `9` 的字符。

`pattern:\s`（"s" 来自 "space"）
: 空格符号：包括空格，制表符 `\t`，换行符 `\n` 和其他少数稀有字符，例如 `\v`、`\f` 和 `\r`。

`pattern:\w`（"w" 来自 "word"）
: “单字”字符：拉丁字母或数字或下划线 `_`。非拉丁字母（如西里尔字母或印地文）不属于 `pattern:\w`。

例如，`pattern:\d\s\w` 表示“数字”，后跟“空格字符”，后跟“单字字符”，例如 `match:1 a`。

**正则表达式可能同时包含常规符号和字符类。**

例如，`pattern:CSS\d` 匹配 `match:CSS` 后面带有一个数字的字符串：

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

我们还可以使用更多字符类：

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

匹配项（每个正则表达式字符类都有对应的结果字符）：

![](love-html5-classes.svg)

## 反向类

对于每个字符类，都有一个“反向类”，用相同的字母表示，但是大写的。

“反向”表示它与所有其他字符匹配，例如：

`pattern:\D`
: 非数字：除 `pattern:\d` 以外的任何字符，例如字母。

`pattern:\S`
: 非空格符号：除 `pattern:\s` 以外的任何字符，例如字母。

`pattern:\W`
: 非单字字符：除 `pattern:\w` 以外的任何字符，例如非拉丁字母或空格。

在本章的开头，我们看到了如何从 `subject:+7(903)-123-45-67` 这样的字符串中创建一个只包含数字的电话号码：找到所有的数字并将它们连接起来。

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

另一种快捷的替代方式是查找非数字 `pattern:\D` 并将其从字符串中删除：

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## 点（.）匹配“任何字符”

点 `pattern:.` 是一种特殊字符类，它与“除换行符之外的任何字符”匹配。

例如：

```js run
alert( "Z".match(/./) ); // Z
```

或在正则表达式中间：

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4（空格也是一个字符）
```

请注意，点表示“任何字符”，而不是“缺少字符”。必须有一个与之匹配的字符：

```js run
alert( "CS4".match(/CS.4/) ); // null，没有匹配项，因为这里没有与点匹配的字符
```

### 带有修饰符 "s" 时点字符类匹配任何字符

默认情况下，点与换行符 `\n` 不匹配。

例如，正则表达式 `pattern:A.B` 匹配 `match:A`，然后匹配 `match:B` 和它们之间的任何字符，除了换行符`\n`：

```js run
alert( "A\nB".match(/A.B/) ); // null（无匹配项）
```

在很多情况下，我们希望点能够匹配“任何字符”，包括换行符。

这就是修饰符 `pattern:s` 所做的事。如果有一个正则表达式具有该修饰符，那么点 `pattern:.` 能够匹配任何字符：

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB（匹配了！）
```

````warn header="IE 浏览器不支持"
IE 浏览器不支持 `pattern:s` 修饰符。

幸运的是，有一个替代方案，我们可以使用像 `pattern:[\s\S]` 这样的正则表达式来匹配“任何字符”（此模式将在 <info:regexp-character-sets-and-ranges> 中介绍）。

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB（匹配了！）
```

模式 `pattern:[\s\S]` 从字面上意思是：“空格字符或非空格字符”。换句话说，“任何字符”。我们可以使用另一对互补的类，例如 `pattern:[\d\D]`。甚至是 `pattern:[^]` —— 意思是匹配任何字符，除了什么都没有。

如果我们希望两种“点”都使用相同的模式，也可以使用此技巧：实际的点 `pattern:.` 表现常规方式（“不包括换行符”），以及带有 `pattern:[\s\S]` 或类似形式匹配“任何字符”。
````

````warn header="注意空格"
通常我们很少注意空格。对我们来说，字符串 `subject:1-5` 和 `subject:1 - 5` 几乎相同。

但是，如果正则表达式未考虑空格，则可能无法正常工作。

让我们尝试查找由连字符（-）分隔的数字：

```js run
alert( "1 - 5".match(/\d-\d/) ); // null，没有匹配项！
```

让我们修复一下，在正则表达式中添加空格 `pattern:\d - \d`：

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5，现在可以了
// 或者我们可以使用 \s 类：
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5，也可以
```

**一个空格是一个字符。与其他字符同等重要。**

我们无法在正则表达式中添加或删除空格后，还期望它的作用能像之前那样不被改变。

换句话说，在正则表达式中，所有字符都很重要，空格也很重要。
````

## 总结

存在以下字符类：

- `pattern:\d` —— 数字。
- `pattern:\D` —— 非数字。
- `pattern:\s` —— 空格符号，制表符，换行符。
- `pattern:\S` —— 除了 `pattern:\s` 。
- `pattern:\w` —— 拉丁字母，数字，下划线 `'_'`。
- `pattern:\W` —— 除了 `pattern:\w`。
- `pattern:.` —— 带有修饰符 `'s'` 时匹配任何字符，否则匹配除换行符 `\n` 之外的任何字符。

……但这还不是全部！

JavaScript 用于字符串的 Unicode 编码提供了很多字符属性，例如：这个字母属于哪种语言（如果它是一个字母），它是标点符号吗，等等。

我们也可以通过这些属性进行搜索。这需要修饰符 `pattern:u`，我们将在下一篇文章中介绍。