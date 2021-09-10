import React, { useEffect, useMemo } from 'react'
import './TodoList.css'
import TodoItem from '../TodoItem'
import { useSelector } from 'react-redux'

function TodoList({ setIsOpenModalEdit, searchValue, sortConfig }) {
  const list = useSelector((state) => state.todoList.list)
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const filteredTodos = list.filter((list) => {
    return list.title.toLowerCase().includes(searchValue.toLowerCase().trim())
  })

  const sortedTodo = useMemo(() => {
    const sortedTodos = [...filteredTodos]
    if (sortConfig !== null) {
      sortedTodos.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortedTodos
  }, [filteredTodos, sortConfig])

  return (
    <ul className="todo-list__ul">
      {sortedTodo.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            title={todo.title}
            index={index}
            setIsOpenModalEdit={setIsOpenModalEdit}
          />
        )
      })}
    </ul>
  )
}

export default TodoList
