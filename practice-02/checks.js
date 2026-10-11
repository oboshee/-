// checks.js — проверочные сценарии для practice-02
// Запуск: node practice-02/checks.js

import assert from 'node:assert/strict';
import { demoTasks, variantTasks } from './src/data.js';
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
} from './src/task-service.js';

let passed = 0;
let failed = 0;

function check(name, fn) {
    try {
        fn();
        console.log(`OK  — ${name}`);
        passed++;
    } catch (err) {
        console.error(`FAIL — ${name}`);
        console.error(`       ${err.message}`);
        failed++;
    }
}

console.log('=== Проверки practice-02 ===\n');

// ---------- createTask ----------
check('createTask: корректные данные', () => {
    const r = createTask(20, 'Новая задача', 'high');
    assert.equal(r.ok, true);
    assert.deepEqual(r.task, { id: 20, title: 'Новая задача', completed: false, priority: 'high' });
});

check('createTask: приоритет по умолчанию', () => {
    const r = createTask(20, 'Задача');
    assert.equal(r.ok, true);
    assert.equal(r.task.priority, 'medium');
});

check('createTask: обрезка пробелов', () => {
    const r = createTask(20, '  Проверить  данные  ');
    assert.equal(r.ok, true);
    assert.equal(r.task.title, 'Проверить  данные');
});

check('createTask: длина 1 и 100 — успех', () => {
    assert.equal(createTask(1, 'x').ok, true);
    assert.equal(createTask(2, 'x'.repeat(100)).ok, true);
});

check('createTask: пустая строка / пробелы / 101 — ошибка', () => {
    assert.equal(createTask(1, '').ok, false);
    assert.equal(createTask(1, '   ').ok, false);
    assert.equal(createTask(1, 'x'.repeat(101)).ok, false);
});

check('createTask: title не строка — ошибка', () => {
    assert.equal(createTask(1, 42).ok, false);
    assert.equal(createTask(1, null).ok, false);
    assert.equal(createTask(1, undefined).ok, false);
});

check('createTask: некорректный id — ошибка', () => {
    for (const bad of [0, -1, 1.5, '4', NaN, Infinity, null, undefined]) {
        assert.equal(createTask(bad, 'Задача').ok, false, `id=${bad} должен быть отклонён`);
    }
});

check('createTask: MAX_SAFE_INTEGER — успех', () => {
    assert.equal(createTask(Number.MAX_SAFE_INTEGER, 'Задача').ok, true);
});

check('createTask: MAX_SAFE_INTEGER + 1 — ошибка', () => {
    assert.equal(createTask(Number.MAX_SAFE_INTEGER + 1, 'Задача').ok, false);
});

check('createTask: неверный приоритет — ошибка', () => {
    for (const bad of ['urgent', 'HIGH', ' high ', null, 1]) {
        assert.equal(createTask(1, 'Задача', bad).ok, false);
    }
});

check('createTask: два вызова дают разные объекты', () => {
    const a = createTask(1, 'Задача');
    const b = createTask(1, 'Задача');
    assert.notEqual(a.task, b.task);
    assert.deepEqual(a.task, b.task);
});

// ---------- findTaskById ----------
check('findTaskById: находит id=4', () => {
    const t = findTaskById(demoTasks, 4);
    assert.equal(t.id, 4);
});

check('findTaskById: id=777 → undefined', () => {
    assert.equal(findTaskById(demoTasks, 777), undefined);
});

check('findTaskById: "4" не совпадает с числом 4', () => {
    assert.equal(findTaskById(demoTasks, '4'), undefined);
});

check('findTaskById: пустой массив → undefined', () => {
    assert.equal(findTaskById([], 4), undefined);
});

// ---------- getPendingTasks ----------
check('getPendingTasks: [4, 7]', () => {
    const ids = getPendingTasks(demoTasks).map((t) => t.id);
    assert.deepEqual(ids, [4, 7]);
});

check('getPendingTasks: пустой массив → []', () => {
    assert.deepEqual(getPendingTasks([]), []);
});

check('getPendingTasks: все выполнены → []', () => {
    const all = demoTasks.map((t) => ({ ...t, completed: true }));
    assert.deepEqual(getPendingTasks(all), []);
});

check('getPendingTasks: никто не выполнен → все', () => {
    const none = demoTasks.map((t) => ({ ...t, completed: false }));
    assert.equal(getPendingTasks(none).length, none.length);
});

// ---------- getTaskTitles ----------
check('getTaskTitles: 4 названия в порядке', () => {
    assert.deepEqual(getTaskTitles(demoTasks), [
        'Изучить функции',
        'Подготовить модель задач',
        'Проверить методы массивов',
        'Оформить README'
    ]);
});

check('getTaskTitles: пустой → []', () => {
    assert.deepEqual(getTaskTitles([]), []);
});

// ---------- getTaskStats ----------
check('getTaskStats: demoTasks', () => {
    assert.deepEqual(getTaskStats(demoTasks), { total: 4, completed: 2, pending: 2, progress: 50 });
});

check('getTaskStats: пустой → нули', () => {
    assert.deepEqual(getTaskStats([]), { total: 0, completed: 0, pending: 0, progress: 0 });
});

check('getTaskStats: никто не выполнен → 0%', () => {
    const none = demoTasks.map((t) => ({ ...t, completed: false }));
    assert.equal(getTaskStats(none).progress, 0);
});

check('getTaskStats: все выполнены → 100%', () => {
    const all = demoTasks.map((t) => ({ ...t, completed: true }));
    assert.equal(getTaskStats(all).progress, 100);
});

check('getTaskStats: 3 задачи, одна выполнена ≈ 33.33%', () => {
    const tasks = [
        { id: 1, title: 'A', completed: true, priority: 'low' },
        { id: 2, title: 'B', completed: false, priority: 'low' },
        { id: 3, title: 'C', completed: false, priority: 'low' }
    ];
    assert.equal(getTaskStats(tasks).progress.toFixed(1), '33.3');
});

// ---------- addTask ----------
check('addTask: id=20 в конец', () => {
    const r = addTask(demoTasks, 20, 'Добавить проверку', 'high');
    assert.equal(r.ok, true);
    assert.equal(r.tasks.length, 5);
    assert.equal(r.tasks[4].id, 20);
    assert.equal(demoTasks.length, 4);
});

check('addTask: в [] → 1 элемент', () => {
    const r = addTask([], 20, 'Задача');
    assert.equal(r.ok, true);
    assert.equal(r.tasks.length, 1);
});

check('addTask: повтор id=4 → ошибка', () => {
    assert.equal(addTask(demoTasks, 4, 'Дубль').ok, false);
});

check('addTask: некорректное поле → ошибка', () => {
    assert.equal(addTask(demoTasks, 20, '').ok, false);
    assert.equal(addTask(demoTasks, -1, 'Задача').ok, false);
});

// ---------- setTaskCompleted ----------
check('setTaskCompleted: id=4 → true', () => {
    const r = setTaskCompleted(demoTasks, 4, true);
    assert.equal(r.ok, true);
    assert.equal(r.tasks.find((t) => t.id === 4).completed, true);
    assert.equal(demoTasks.find((t) => t.id === 4).completed, false);
});

check('setTaskCompleted: неверный тип → ошибка', () => {
    for (const bad of ['true', 1, null, undefined, 0]) {
        assert.equal(setTaskCompleted(demoTasks, 4, bad).ok, false);
    }
});

check('setTaskCompleted: отсутствующая → ошибка', () => {
    assert.equal(setTaskCompleted(demoTasks, 777, true).ok, false);
});

check('setTaskCompleted: повторная установка → успех', () => {
    const r = setTaskCompleted(demoTasks, 1, true);
    assert.equal(r.ok, true);
    assert.notEqual(r.tasks, demoTasks);
});

// ---------- renameTask ----------
check('renameTask: id=10 с пробелами', () => {
    const r = renameTask(demoTasks, 10, '  Оформить документацию  ');
    assert.equal(r.ok, true);
    const updated = r.tasks.find((t) => t.id === 10);
    assert.equal(updated.title, 'Оформить документацию');
    assert.equal(updated.completed, true);
    assert.equal(updated.priority, 'medium');
});

check('renameTask: некорректное название → ошибка', () => {
    assert.equal(renameTask(demoTasks, 10, '').ok, false);
    assert.equal(renameTask(demoTasks, 10, 42).ok, false);
});

check('renameTask: отсутствующая → ошибка', () => {
    assert.equal(renameTask(demoTasks, 777, 'X').ok, false);
});

// ---------- removeTask ----------
check('removeTask: id=7 → [1, 4, 10]', () => {
    const r = removeTask(demoTasks, 7);
    assert.equal(r.ok, true);
    assert.deepEqual(r.tasks.map((t) => t.id), [1, 4, 10]);
    assert.equal(demoTasks.length, 4);
});

check('removeTask: единственная → []', () => {
    const one = [{ id: 1, title: 'X', completed: false, priority: 'low' }];
    const r = removeTask(one, 1);
    assert.equal(r.ok, true);
    assert.deepEqual(r.tasks, []);
});

check('removeTask: отсутствующая → ошибка', () => {
    assert.equal(removeTask(demoTasks, 777).ok, false);
    assert.equal(removeTask([], 1).ok, false);
});

// ---------- Вариант 3 ----------
check('Вариант 3: variantTasks — 6 задач', () => {
    assert.equal(variantTasks.length, 6);
    assert.deepEqual(variantTasks.map((t) => t.id), [11, 23, 37, 41, 58, 64]);
});

check('Вариант 3: 2 выполненных', () => {
    assert.equal(variantTasks.filter((t) => t.completed).length, 2);
});

check('Вариант 3: все приоритеты присутствуют', () => {
    const set = new Set(variantTasks.map((t) => t.priority));
    assert.ok(set.has('low') && set.has('medium') && set.has('high'));
});

// ---------- Итог ----------
console.log(`\n=== Итог: ${passed} OK, ${failed} FAIL ===`);
if (failed > 0) process.exit(1);