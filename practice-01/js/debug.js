// debug.js — задание 5: поиск и исправление ошибок

console.log('--- Задание 5: отладка ---');

// ===== ЧАСТЬ 1. ИСХОДНЫЙ (ОШИБОЧНЫЙ) КОД =====
console.log('\n[Ошибочный код]');

const completedText = "3";
const additionalText = "2";

const completedTotal = completedText + additionalText; // "32"
const totalTasks = 8;
const remainingTasks = totalTasks - completedTotal;    // -24

console.log('Выполнено:', completedTotal);
console.log('Осталось:', remainingTasks);

let controlSum = 0;
for (let taskNumber = 1; taskNumber < 4; taskNumber++) {
    controlSum += taskNumber;
}
console.log('Контрольная сумма:', controlSum);

// ===== ЧАСТЬ 2. ИСПРАВЛЕННЫЙ КОД =====
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