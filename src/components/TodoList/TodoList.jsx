import React from 'react';
import styles from './TodoList.module.css';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className={styles.todolist}>
    {todos.map(({ id, text, completed }) => {
      return (
        <li key={id} className={styles['todolist-item']}>
          <input
            type="checkbox"
            className={styles['todolist-checkbox']}
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />
          <p className={styles['todolist-item-text']}>{text}</p>
          <button
            className={styles['todolist-item-button']}
            onClick={() => onDeleteTodo(id)}
          >
            Удалить
          </button>
        </li>
      );
    })}
  </ul>
);

export default TodoList;
