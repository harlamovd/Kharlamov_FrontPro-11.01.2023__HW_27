/*
Створити функцію mapping(array/obj,callback) для обектів та масивів.
- має перевіряти тип першого аргументу, array/obj
- в залежності від типу має повертати новий array/obj відповідно
- для кожного єлементу array/obj має викликати callback
у випадку якщо тип першого аргументу не відповідає array/obj, тоді має викликатись alert
*/

// я до конца не понял условия относительно изменения Оbject, мы ранее делали функцию mapping для Аrray там все понятно
// возник вопрос как функцию mapping должна изменять именно Оbject, так как там есть Ключ и Значение, и поэтому
// функция должна изменять как Ключ так и Значение, это логично.
// Хотя изменять ключ это наверное неправильно, и по этому я сделал два варианта функции mapping:
// - первый вариант функция mappingOne - дает возможность менять как Ключ так и Значение, а Колбек функция должна
// возвращать именно Оbject {ключ : значение}, которое потом путем Object.assign добавляет его в основной resObj, который
// и возвращается.

const arrTest = [1,2,0,4,5,6,7,8,9,9];
let userTest = {
    id: 1267,
    name: 'Dima',
    age: '23',
    sex: 'man',
};

function mappingOne (objectArray, callback) {
    if ((typeof objectArray === 'object' && objectArray !== null) && !Array.isArray(objectArray)) {
        const resObj = {};
        for (let key in objectArray) {
            Object.assign(resObj,callback(objectArray[key], key, objectArray)); // тут идет обеднение Оbject
        }
        return resObj;
    } else if (Array.isArray(objectArray)) {
        const resArr = [];
        for (let i = 0; i < objectArray.length; i++) {
            resArr.push(callback(objectArray[i], i, objectArray));
        }
        return resArr;
    }  else {
        return alert('First argument is not Array or Object');
    }

}
// Эти Колбек функции для работы с Оbject в функции mappingOne, обязаны возвращать Оbject {ключ : значение}
function callbackObjAddValue (value, key, obj) {
    return {[key] : (value += '__new')};
}
function callbackObjAddValueAndKey (value, key, obj) {
    return {[key += '_q'] : (value += '__new')};
}
function callbackObjUpperCase (value, key, obj) {
    if (isNaN(value)) {
        return {[key] : value.toUpperCase()};
    } else {
        return {[key] : value};
    }
}
console.log('---Работа функции mappingOne с Оbject---');
console.log(mappingOne(userTest, callbackObjAddValue));
console.log(mappingOne(userTest, callbackObjAddValueAndKey));
console.log(mappingOne(userTest, callbackObjUpperCase));

// тут я проверяю как работает стрелочная функцыя при вызове.
console.log(mappingOne(userTest, (value, key, obj) => {
    return {[key]: (value = 'missing value')}
}));

// Эти Колбек функцыи для работы с Array
function callbackArrAdd (item, _, arr) {
    return item + arr.length;
}
function callbackArrStrIndex (item, index) {
    return item + ` - index #${index}`;
}
console.log('---Работа функции mappingOne с Arrey---');
console.log('Arr : ' + mappingOne(arrTest, callbackArrAdd));
console.log('Arr : ' + mappingOne(arrTest, callbackArrStrIndex));
console.log('Arr : ' + mappingOne(arrTest, item => item + "!")); // стрелочная функцыя

// Второй вариант функции mappingTwo, где в object изменяется только Значение а не ключ.
// я надеюсь задание понял правильно

function mappingTwo (objectArray, callback) {
    if ((typeof objectArray === 'object' && objectArray !== null) && !Array.isArray(objectArray)) {
        const resObj = {};
        for (let key in objectArray) {
            resObj[key] = callback(objectArray[key], key, objectArray);
        }
        return resObj;
    } else if (Array.isArray(objectArray)) {
        const resArr = [];
        for (let i = 0; i < objectArray.length; i++) {
            resArr.push(callback(objectArray[i], i, objectArray));
        }
        return resArr;
    }  else {
        return alert('First argument is not Array or Object');
    }

}
// Эти Колбек функцыи для работы с object в функции mappingTwo, возвращают Значения
function callbackObjAddValueTwo (value, key, obj) {
    return value += '__new';
}
function callbackObjUpperCaseTwo (value, key, obj) {
    if (isNaN(value)) {
        return value.toUpperCase();
    } else {
        return value;
    }
}
console.log('---Работа функции mappingTwo с Оbject---');
console.log(mappingTwo(userTest, callbackObjAddValueTwo));
console.log(mappingTwo(userTest, callbackObjUpperCaseTwo));




/*Створити функцію filter(array, callback) "аналог Array.filter" але на відмнну повертає обект
з двома масивами right и wrong
const {right, wrong} = filter(array, callback)
в массиві right знаходяться ті що пройли по умовам
в массиві wrong ті що не пройшли по умові
зробити все в одному циклі*/

function filter (array, callback) {
    let resObj = {right: [], wrong: [],};
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array) ? resObj.right.push(array[i]) : resObj.wrong.push(array[i]);
        // решил сделать тернарный оператор, меньше кода
    }
    return resObj;
}

const {right, wrong} = filter(arrTest, el => el<5);
console.log(`--- работа функции filter ---`);
console.log(right);
console.log(wrong);
console.log(filter(arrTest, el => el<5));
