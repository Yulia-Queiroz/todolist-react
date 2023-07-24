import React, { Component } from 'react';
import shortid from 'shortid';
import TodoList from './TodoList/TodoList';
import initialTodos from './todos.json';
import TodoEditor from './TodoEditor/TodoEditor';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todoId !== todo.id),
    }));
  };

  toggleCompleted = todoId => {
    console.log(todoId);
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todoId === todo.id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [todo, ...prevState.todos],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    return this.state.todos.filter(todo =>
      todo.text.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { todos, filter } = this.state;
    const completedTodos = todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        <div>
          <p>Общее кол-во: {todos.length}</p>
          <p>Кол-во выполненых: {completedTodos}</p>
        </div>
      </>
    );
  }
}

export default App;
