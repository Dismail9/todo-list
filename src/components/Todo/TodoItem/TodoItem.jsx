import React, { useState } from 'react'
import './TodoItem.css'
import DeleteIcon from '../../../assets/delete.svg'
import EditIcon from '../../../assets/edit.svg'
import { removeTodo, toggleTodo, setEditableTodo } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
import moment from 'moment'

function TodoItem({ todo, index, setIsOpenModalEdit }) {
  const dispatch = useDispatch()

  const editableTodoForOpenModal = () => {
    dispatch(
      setEditableTodo({
        title: todo.title,
        id: todo.id,
        description: todo.description,
        creationDate: todo.creationDate,
        deadline: todo.deadline,
        tags: todo.tags,
        completed: todo.completed,
      })
    )
    setIsOpenModalEdit()
  }

  const [isOpen, setIsOpen] = useState(false)
  const classes = todo.completed ? ['todo-item__done'] : [null]
  const handleOpenClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  return (
    <li className="todo-item">
      <div className="todo-item__box">
        <div className="todo-item__checkbox">
          <span>
            <input
              className="todo-item__checkbox_input"
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
          </span>
        </div>
        <div className="todo-item__info" onClick={handleOpenClick}>
          <span className={classes.join(' ')}>
            <strong className="todo-item__index">{index + 1}</strong>
            <span>{todo.title}</span>
          </span>
        </div>
        <div className="todo-item__actions">
          <button
            className="todo-item__button"
            onClick={() => editableTodoForOpenModal()}
            title="Редактировать задачу"
          >
            <img src={EditIcon} alt="" className="todo-item__button_icon" />
          </button>
          <button
            className="todo-item__button"
            onClick={() => dispatch(removeTodo(todo.id))}
            title="Удалить задачу"
          >
            <img src={DeleteIcon} alt="" className="todo-item__button_icon" />
          </button>
        </div>
      </div>
      <div
        className={`todo-item__description ${
          isOpen ? 'todo-item__description--open' : ''
        }`}
        onClick={handleOpenClick}
      >
        <div className="todo-item__description_block">
          <p className="todo-item__description_width">
            <strong>Описание:</strong>{' '}
          </p>
          <p className="todo-item__description_text">{todo.description}</p>
        </div>
        <div className="todo-item__creation_block">
          <p className="todo-item__description_width">
            <strong>Дата создания:</strong>
          </p>
          <p className="todo-item__creation_text">
            {moment(todo.creationDate).format('DD-MM-YYYY')}
          </p>
        </div>
        <div className="todo-item__deadline_block">
          <p className="todo-item__description_width">
            <strong>Дата окончания:</strong>
          </p>
          <p className="todo-item__deadline_text">
            {moment(todo.deadline).format('DD-MM-YYYY')}
          </p>
        </div>
      </div>
    </li>
  )
}

export default TodoItem
