// Здесь создаётся DOM, но не изменяется состояние приложения.
// Контракт карточки, селекторы и тексты описаны в методичке.

import { getTaskStats } from "./task-service.js";

const PRIORITY_LABELS = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
};

export function createTaskElement(task) {
    // Корневой <li class="task-card" data-task-id="...">
    const card = document.createElement("li");
    card.className = "task-card";
    card.dataset.taskId = String(task.id);
    if (task.completed) {
        card.classList.add("is-completed");
    }

    // Название
    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;
    card.append(title);

    // Статус
    const status = document.createElement("p");
    status.className = "task-status";
    status.textContent = task.completed ? "Выполнена" : "В работе";
    card.append(status);

    // Приоритет
    const priority = document.createElement("p");
    priority.className = "task-priority";
    priority.textContent = PRIORITY_LABELS[task.priority] ?? task.priority;
    card.append(priority);

    // Кнопки
    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.dataset.action = "toggle";
    toggleBtn.setAttribute("aria-pressed", String(task.completed));

    const toggleLabel = document.createElement("span");
    toggleLabel.className = "action-label";
    toggleLabel.textContent = "Выполнена";
    toggleBtn.append(toggleLabel);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.dataset.action = "delete";

    const deleteLabel = document.createElement("span");
    deleteLabel.className = "action-label";
    deleteLabel.textContent = "Удалить";
    deleteBtn.append(deleteLabel);

    actions.append(toggleBtn, deleteBtn);
    card.append(actions);

    return card;
}

export function renderTaskList(listElement, tasks) {
    const cards = tasks.map((task) => createTaskElement(task));
    listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
    const { total, completed, pending, progress } = getTaskStats(tasks);

    summaryElement.querySelector('[data-stat="total"]').textContent = String(total);
    summaryElement.querySelector('[data-stat="completed"]').textContent = String(completed);
    summaryElement.querySelector('[data-stat="pending"]').textContent = String(pending);
    summaryElement.querySelector('[data-stat="progress"]').textContent = `${progress.toFixed(1)}%`;
    summaryElement.querySelector('[data-stat="visible"]').textContent = String(visibleCount);
}

export function renderEmptyState(messageElement, total, visibleCount) {
    if (visibleCount > 0) {
        messageElement.textContent = "";
        messageElement.hidden = true;
        return;
    }
    if (total === 0) {
        messageElement.textContent = "Список задач пуст.";
    } else {
        messageElement.textContent = "Нет задач по выбранному фильтру.";
    }
    messageElement.hidden = false;
}