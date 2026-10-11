const plan = [
    { task: 'Изучить типы данных в JS', done: true },
    { task: 'Разобрать приведение типов', done: true },
    { task: 'Написать функцию getProgress', done: true },
    { task: 'Исправить ошибки в debug.js', done: false },
    { task: 'Оформить README', done: false }
];

console.log('--- План на день ---');
plan.forEach((item, index) => {
    const mark = item.done ? '[x]' : '[ ]';
    console.log(`${index + 1}. ${mark} ${item.task}`);
});

const doneCount = plan.filter(item => item.done).length;
console.log(`\nВыполнено: ${doneCount} из ${plan.length}`);