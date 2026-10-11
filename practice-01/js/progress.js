// progress.js — задание 3: расчёт прогресса по задачам

const MAX_TASKS = 1000;

function getProgress(totalTasks, completedTasks) {
    if (typeof totalTasks !== 'number' || typeof completedTasks !== 'number' ||
        Number.isNaN(totalTasks) || Number.isNaN(completedTasks)) {
        return 'Ошибка: вместо числа передана строка или недопустимое числовое значение.';
    }
    if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
        return 'Ошибка: количество задач должно быть целым числом.';
    }
    if (totalTasks < 0 || completedTasks < 0) {
        return 'Ошибка: отрицательное количество.';
    }
    if (totalTasks > MAX_TASKS) {
        return 'Ошибка: превышена верхняя граница.';
    }
    if (completedTasks > totalTasks) {
        return 'Ошибка: выполнено больше, чем существует.';
    }
    if (totalTasks === 0) {
        return 'Задач пока нет';
    }

    const remaining = totalTasks - completedTasks;
    const percent = (completedTasks / totalTasks * 100).toFixed(1);

    let status;
    if (completedTasks === 0) {
        status = 'Не начато';
    } else if (completedTasks === totalTasks) {
        status = 'Завершено';
    } else {
        status = 'В работе';
    }

    return `Всего задач: ${totalTasks}, Выполнено: ${completedTasks}, ` +
           `Осталось: ${remaining}, Прогресс: ${percent}%, Статус: ${status}`;
}

console.log('--- Задание 3: тесты getProgress ---');
console.log('1)', getProgress(12, 5));
console.log('2)', getProgress(0, 0));
console.log('3)', getProgress(5, 0));
console.log('4)', getProgress(5, 5));
console.log('5)', getProgress(5, 6));
console.log('6)', getProgress(-1, 0));
console.log('7)', getProgress(5, 2.5));
console.log('8)', getProgress("5", 2));
console.log('9)', getProgress(1001, 0));
console.log('10)', getProgress(NaN, 0));