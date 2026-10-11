// debug.js — задание 5: поиск и исправление ошибок

console.log('--- Задание 5: отладка ---');

// ===== Исходные данные =====

const completedText = "3";
const additionalText = "2";
const plannedText = "8";

// =====ИСХОДНЫЙ КОД =====
console.log('\n[Ошибочный код]');

const completedTotal = completedText + additionalText;
const totalTasks = 8;
const remainingTasks = totalTasks - completedTotal;

console.log('Выполнено:', completedTotal);
console.log('Осталось:', remainingTasks);  

let controlSum = 0;
for (let taskNumber = 1; taskNumber < 4; taskNumber++) {
    controlSum += taskNumber; 
}
console.log('Контрольная сумма:', controlSum); 

// ===== ИСПРАВЛЕННЫЙ КОД =====
console.log('\n[Исправленный код]');

const completedTotalFixed = Number(completedText) + Number(additionalText);
const remainingTasksFixed = totalTasks - completedTotalFixed;

console.log('Выполнено:', completedTotalFixed); 
console.log('Осталось:', remainingTasksFixed);  

let controlSumFixed = 0;
for (let taskNumber = 1; taskNumber <= 4; taskNumber++) {
    controlSumFixed += taskNumber; 
}
console.log('Контрольная сумма:', controlSumFixed);