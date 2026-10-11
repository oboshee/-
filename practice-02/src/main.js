// main.js — демонстрация работы с задачами (practice-02)
// Автор: Ваванов Вячеслав
// Вариант: 3 — Создание сайта-портфолио

// ===== Импорты =====
import { demoTasks, variantTasks, variantNumber } from "./data.js";
import {
    createTask,
    findTaskById,
    getPendingTasks,
    getTaskTitles,
    getTaskStats,
    addTask,
    setTaskCompleted,
    renameTask,
    removeTask
} from "./task-service.js";

// ===== Вспомогательные функции для вывода =====

function applyResult(currentTasks, result, actionLabel) {
    if (result.ok) {
        console.log(`[OK] ${actionLabel}`);
        return result.tasks;
    }
    console.error(`[ОШИБКА] ${actionLabel}: ${result.error}`);
    return currentTasks;
}

function printTasks(label, tasks) {
    console.log(`\n=== ${label} ===`);
    console.log("Задачи:", tasks);
}

function printStats(label, tasks) {
    const { total, completed, pending, progress } = getTaskStats(tasks);
    console.log(`\n${label}`);
    console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
    if (total === 0) {
        console.log("Задач пока нет");
    } else {
        console.log(`Прогресс: ${progress.toFixed(1)}%`);
    }
}

// ============================================================
// ОБЩИЙ СЦЕНАРИЙ
// ============================================================

console.log("============================================");
console.log("=== Общий сценарий ===");
console.log("============================================");

let currentTasks = demoTasks;
const demoSnapshot = JSON.stringify(demoTasks);

// 1. Исходный набор
printTasks("Исходный набор", currentTasks);
console.log("\nНазвания:", getTaskTitles(currentTasks));
console.log("\nНевыполненные:", getPendingTasks(currentTasks));
printStats("Сводка исходного набора", currentTasks);

// 2. Добавить id = 20
const addResult = addTask(currentTasks, 20, "Добавить проверку", "high");
currentTasks = applyResult(currentTasks, addResult, "addTask(id=20)");
printStats("После добавления id = 20", currentTasks);

// 3. Установить completed = true для id = 4
const completeResult = setTaskCompleted(currentTasks, 4, true);
currentTasks = applyResult(currentTasks, completeResult, "setTaskCompleted(id=4, true)");
printStats("После выполнения id = 4", currentTasks);

// 4. Переименовать id = 10
const renameResult = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
currentTasks = applyResult(currentTasks, renameResult, "renameTask(id=10)");

// 5. Удалить id = 7
const removeResult = removeTask(currentTasks, 7);
currentTasks = applyResult(currentTasks, removeResult, "removeTask(id=7)");
printStats("После удаления id = 7", currentTasks);

// 6. Проверки отказа
console.log("\n=== Проверка отказа: повторяющийся id ===");
const dupResult = addTask(currentTasks, 4, "Дубль", "low");
if (dupResult.ok) {
    console.error("НЕОЖИДАННО: добавление прошло");
} else {
    console.log(`Ошибка: ${dupResult.error}`);
}

console.log("\n=== Проверка отказа: неверный тип статуса ===");
const badStatus = setTaskCompleted(currentTasks, 4, "true");
if (badStatus.ok) {
    console.error("НЕОЖИДАННО: статус установлен");
} else {
    console.log(`Ошибка: ${badStatus.error}`);
}

console.log("\n=== Проверка отказа: отсутствующая задача ===");
const missing = removeTask(currentTasks, 777);
if (missing.ok) {
    console.error("НЕОЖИДАННО: задача удалена");
} else {
    console.log(`Ошибка: ${missing.error}`);
}

// 7. Проверка отсутствия мутации demoTasks
console.log("\n=== Проверка отсутствия мутации demoTasks ===");
const demoUnchanged = JSON.stringify(demoTasks) === demoSnapshot;
console.log(`Исходный набор не изменён: ${demoUnchanged}`);

// 8. Итоговое состояние общего сценария
printTasks("Итоговое состояние (общий сценарий)", currentTasks);
console.log("\nНазвания:", getTaskTitles(currentTasks));
console.log("\nНевыполненные:", getPendingTasks(currentTasks));
printStats("Итоговая сводка (общий сценарий)", currentTasks);

const finalIds = currentTasks.map((t) => t.id);
console.log(`\nИдентификаторы итогового массива: [${finalIds.join(", ")}]`);

// ============================================================
// ИНДИВИДУАЛЬНЫЙ ВАРИАНТ № 3
// ============================================================

console.log("\n============================================");
console.log(`=== Индивидуальный вариант № ${variantNumber} ===`);
console.log("============================================");

let currentVariant = variantTasks;
const variantSnapshot = JSON.stringify(variantTasks);

// 1. Исходные данные и сводка
printTasks("Исходные данные варианта", currentVariant);
console.log("\nНазвания:", getTaskTitles(currentVariant));
console.log("\nНевыполненные:", getPendingTasks(currentVariant));
printStats("Сводка исходного варианта", currentVariant);

// 2. Добавить задачу id = 80 с приоритетом low
const varAddResult = addTask(currentVariant, 80, "Проверить кроссбраузерность", "low");
currentVariant = applyResult(currentVariant, varAddResult, "addTask(id=80)");
printStats("После добавления id = 80", currentVariant);

// 3. Установить completed = true для id = 11
const varCompleteResult = setTaskCompleted(currentVariant, 11, true);
currentVariant = applyResult(currentVariant, varCompleteResult, "setTaskCompleted(id=11, true)");
printStats("После выполнения id = 11", currentVariant);

// 4. Переименовать id = 23
const varRenameResult = renameTask(currentVariant, 23, "Написать раздел «Обо мне»");
currentVariant = applyResult(currentVariant, varRenameResult, "renameTask(id=23)");
printStats("После переименования id = 23", currentVariant);

// 5. Удалить id = 37
const varRemoveResult = removeTask(currentVariant, 37);
currentVariant = applyResult(currentVariant, varRemoveResult, "removeTask(id=37)");
printStats("После удаления id = 37", currentVariant);

// 6. Повторно добавить id = 80 — должен быть отказ
console.log("\n=== Проверка отказа: повторный id = 80 ===");
const varDupResult = addTask(currentVariant, 80, "Дубль", "medium");
if (varDupResult.ok) {
    console.error("НЕОЖИДАННО: добавление прошло");
} else {
    console.log(`Ошибка: ${varDupResult.error}`);
}

// 7. Итог и проверка сохранности variantTasks
printTasks("Итоговое состояние (вариант)", currentVariant);
console.log("\nНазвания:", getTaskTitles(currentVariant));
console.log("\nНевыполненные:", getPendingTasks(currentVariant));
printStats("Итоговая сводка (вариант)", currentVariant);

const variantUnchanged = JSON.stringify(variantTasks) === variantSnapshot;
console.log(`\nИсходный variantTasks не изменён: ${variantUnchanged}`);

const variantFinalIds = currentVariant.map((t) => t.id);
console.log(`Идентификаторы итогового массива варианта: [${variantFinalIds.join(", ")}]`);