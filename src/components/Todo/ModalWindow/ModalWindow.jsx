import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, editTodo, clearEditableTodo } from '../../../redux/actions'
import { isBefore, addDays } from 'date-fns'
import {
  TagPicker,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  DatePicker,
  ButtonToolbar,
  Button,
} from 'rsuite'
import './ModalWindow.css'

function ModalWindow({ setIsOpen }) {
  const dispatch = useDispatch()
  const editableTodo = useSelector((state) => state.todoList.editableTodo)
  const [inputTitle, setInputTitle] = useState(
    editableTodo ? editableTodo.title : ''
  )
  const [inputDescription, setInputDescription] = useState(
    editableTodo ? editableTodo.description : ''
  )
  const [selectTag, setSelectTag] = useState(
    editableTodo ? editableTodo.tags : null
  )
  const [inputDeadline, setInputDeadline] = useState(
    editableTodo ? editableTodo.deadline : Date.now()
  )

  const changeInput = (event, setInput) => {
    setInput(event)
  }

  const arrTags = [
    {
      label: 'Работа',
      value: 'Работа',
    },
    {
      label: 'Личное',
      value: 'Личное',
    },
  ]

  const addEditTodo = () => {
    if (inputTitle) {
      if (editableTodo) {
        if (
          !(
            inputTitle.trim() === editableTodo.title &&
            inputDescription.trim() === editableTodo.description &&
            inputDeadline === editableTodo.deadline &&
            selectTag === editableTodo.tags
          )
        ) {
          dispatch(
            editTodo({
              title: inputTitle,
              id: editableTodo.id,
              description: inputDescription,
              deadline: inputDeadline,
              tags: selectTag,
              completed: editableTodo.completed,
            })
          )
          dispatch(clearEditableTodo())
        }
      } else {
        dispatch(
          addTodo({
            title: inputTitle,
            id: Date.now(),
            description: inputDescription,
            creationDate: Date.now(),
            deadline: Number(new Date(inputDeadline)),
            tags: selectTag,
            completed: false,
          })
        )
      }
      return setIsOpen(false)
    }
  }
  return (
    <div className="modal-window__background">
      <Form className="modal-window__main">
        <ControlLabel>
          <h6>Создание задачи</h6>
        </ControlLabel>
        <FormGroup>
          <ControlLabel>Название</ControlLabel>
          <FormControl
            name="title"
            type="text"
            maxLength="50"
            value={inputTitle}
            onChange={(e) => changeInput(e, setInputTitle)}
          />
          <HelpBlock tooltip>Максимальное количество символов: 50</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Описание</ControlLabel>
          <FormControl
            className="modal-window__input_description"
            name="description"
            maxLength="300"
            value={inputDescription}
            componentClass="textarea"
            onChange={(e) => changeInput(e, setInputDescription)}
          />
          <HelpBlock tooltip>Максимальное количество символов: 300</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Дата окончания</ControlLabel>
          <FormControl
            className="modal-window__input_deadline"
            name="deadline"
            accepter={DatePicker}
            placement="auto"
            disabledDate={(date) => isBefore(date, addDays(new Date(), -1))}
            value={new Date(inputDeadline)}
            onChange={(e) => changeInput(e, setInputDeadline)}
            ranges={[]}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Теги</ControlLabel>
          <FormControl
            className="modal-window__input_tags"
            name="tags"
            accepter={TagPicker}
            placement="auto"
            data={arrTags}
            value={selectTag}
            onChange={(e) => changeInput(e, setSelectTag)}
          />
        </FormGroup>

        <FormGroup className="modal-window__button">
          <ButtonToolbar>
            <Button
              appearance="default"
              onClick={() => {
                setIsOpen(false)
                if (editableTodo) {
                  dispatch(clearEditableTodo())
                }
              }}
            >
              Закрыть
            </Button>

            <Button appearance="primary" onClick={() => addEditTodo()}>
              Добавить
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  )
}

export default ModalWindow
