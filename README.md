## Изменение раскладки текста + транслитерация

[![NPM Version](https://img.shields.io/npm/v/ai-switcher-translit.svg)](https://www.npmjs.com/package/ai-switcher-translit)
[![NPM Download](https://img.shields.io/npm/dm/ai-switcher-translit.svg)](https://www.npmjs.com/package/ai-switcher-translit)

Простенькая библиотека для реализации смены раскладки входного текса (`rus <=> eng`). Также, при необходимости, совершает транслитерацию.

### Примеры преобразования

- `руддщ => hello` - [С русской раскладки на латинскую](#rueng)
- `ghbdtn => привет` - [С латинской раскладки на русскую](#engru)
- `привет => privet` - [Транслит с кириллицы](#translit)
- `privet => привет` - [Транслит обратно в кириллицу](#retranslit)

**Бонус:** 

- Есть возможность [расширять/изменять](#custom) имеющиеся *"словари"*.

### Использование

`npm i ai-switcher-translit`

Далее, используем следующим образом:

```javascript
const swithcher = require('ai-switcher-translit');
/* ... 
 **/
```

Вызов с одним параметром, по-умолчанию, преобразует текст в *русскую* раскладку. 

```javascript
let str = "Ghbdtn Vbh!";
let output = swithcher.getSwitch(str);

console.log(output); // Привет Мир!
```

-----

Вторым параметром, при необходимости, передаётся объект вида:

```javascript
let config = {
	type: ' ', // Как преобразовывать (rueng|engru|translit|retranslit|custom)
    input: {} // Свой вариант преобразования, или изменение имеющегося
}

```

### <a name='rueng'>1. type: rueng</a>
```javascript
let str = "Руддщ Цщкдв! Ершы шы куыгде!";
let output = swithcher.getSwitch(str, {
	type: 'rueng'
});

console.log(output); // Hello World! This is result!
```
### <a name='engru'>2. type: engru</a>
```javascript
let str = "Ghbdtn vbh! Djn nfrjq htpekmnfn!";
let output = swithcher.getSwitch(str, {
	type: 'engru',
});

console.log(output); // Привет мир! Вот такой результат!
```
### <a name='translit'>3. type: translit</a>
```javascript
let str = "Пример транслитерации!";
let output = swithcher.getSwitch(str, {
	type: 'translit',
});

console.log(output); // Primer transliteracii!
```
### <a name='retranslit'>4. type: retranslit</a>
```javascript
let str = "Primer transliteracii!";
let output = swithcher.getSwitch(str, {
	type: 'retranslit',
});

console.log(output); // Пример транслитерации!
```
### <a name='custom'>5. type: custom</a>

При необходимости, можно передать свой объект с вариантами преобразования:
```javascript
let template = {
	'#1': 'Первый', '#2': 'Второй'
};


let str = "Это #1, а это #2";
let output = swithcher.getSwitch(str, {
	type: 'custom',
	input: template
});

console.log(output); // Это Первый, а это Второй
```
Либо, если например, требуется дополнить или изменить существующий *словарь*, то помимо указания нужного значения `type`, передать в `input` дополнительный объект:

```javascript
let template = {
	'S': 'Ж' // изменим S => Ж
};

let str = "'nj ghbvth! Bpvtybv S";
let output = swithcher.getSwitch(str, {
	type: 'engru',
	input: template
});

console.log(output); // Это пример! Изменим Ж
```
