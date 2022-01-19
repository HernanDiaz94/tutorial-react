import React from 'react';
import {ToDoItem} from './ToDoItem';

export function ToDoList({todos, toggleTodo}) {
  return (<ul>
        {todos.map(todo => (
              //<li>Tareas</li>
              <ToDoItem 
                key={todo.id} 
                todo={todo}
                toggleTodo={toggleTodo}
              />
        ))} 
        </ul>
  );
}
