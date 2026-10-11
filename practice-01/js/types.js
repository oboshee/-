// types.js — задание 2: типы и приведение типов в JavaScript

console.log('--- Задание 2: типы и приведение ---');

// 1
console.log('1) Результат:', "8" + 2);
console.log('   Тип:', typeof ("8" + 2));

// 2
console.log('2) Результат:', "8" - 2);
console.log('   Тип:', typeof ("8" - 2));

// 3
console.log('3) Результат:', Number("8") + 2);
console.log('   Тип:', typeof (Number("8") + 2));

// 4
console.log('4) Результат:', "12" > "3");
console.log('   Тип:', typeof ("12" > "3"));

// 5
console.log('5) Результат:', 12 === "12");
console.log('   Тип:', typeof (12 === "12"));

// 6
console.log('6) Результат:', Number(""));
console.log('   Тип:', typeof Number(""));

// 7
console.log('7) Результат:', Number("text"));
console.log('   Тип:', typeof Number("text"));

// 8
console.log('8) Результат:', Boolean("false"));
console.log('   Тип:', typeof Boolean("false"));

// 9
console.log('9) Результат:', typeof null);
console.log('   Тип результата:', typeof (typeof null));

// 10
console.log('10) Результат:', typeof NaN);
console.log('    Тип результата:', typeof (typeof NaN));