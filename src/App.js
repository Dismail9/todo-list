import React from 'react'
import { useState } from 'react'
import TodoList from './components/Todo/TodoList/TodoList'
import ModalWindow from './components/Todo/ModalWindow/ModalWindow'
import TopBar from './components/NavBar/TopBar'
import SideBar from './components/NavBar/SideBar'
import DeadlineIcon from '../../todo-list-kalashnikov/src/assets/deadline.svg'
import CreationDateIcon from '../../todo-list-kalashnikov/src/assets/creation_date.svg'
import AlphabetIcon from '../../todo-list-kalashnikov/src/assets/alphabet.svg'
import SortIcon from '../../todo-list-kalashnikov/src/assets/sort.svg'
import AddTodoIcon from '../../todo-list-kalashnikov/src/assets/new_todo.svg'

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalForEdit, setIsOpenModalForEdit] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)
  const [isOpenDropDownMenu, setIsOpenDropDownMenu] = useState(false)
  const defaultConfig = {
    key: 'creationDate',
  }
  const [sortConfig, setSortConfig] = useState(defaultConfig)
  const setIsOpenModalEdit = () => {
    setIsOpenModalForEdit(!isOpenModalForEdit)
  }

  const requestSort = (key) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return (
    <div>
      <div className="app__nav-bar">
        <TopBar
          setIsOpenSideBar={setIsOpenSideBar}
          isOpenSideBar={isOpenSideBar}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="app__content">
        <div className="app__content_side_bar">
          <SideBar
            setIsOpenSideBar={setIsOpenSideBar}
            isOpenSideBar={isOpenSideBar}
          />
        </div>
        <div className="app__content_main">
          <div className="app__wrapper">
            <h1>My Todos</h1>
            <div className="app__buttonbar">
              <button
                className="app__buttonbar_modal_button_add"
                onClick={() => setIsOpenModal(!isOpenModal)}
                title="Новая задача"
              >
                <img
                  className="app__buttonbar_modal_button_add_icon"
                  alt=""
                  src={AddTodoIcon}
                />
              </button>
              {isOpenModal && <ModalWindow setIsOpen={setIsOpenModal} />}
              {isOpenModalForEdit && (
                <ModalWindow setIsOpen={setIsOpenModalForEdit} />
              )}
              {(isOpenModal || isOpenModalForEdit) && isOpenDropDownMenu
                ? setIsOpenDropDownMenu(!isOpenDropDownMenu)
                : null}
              <button
                className="app__buttonbar_sort_button"
                onClick={() => setIsOpenDropDownMenu(!isOpenDropDownMenu)}
              >
                <img
                  className="app__buttonbar_sort_icon "
                  alt=""
                  src={SortIcon}
                />
                <p className="app__drop_down_menu_p">Сортировать</p>
              </button>
            </div>
            <div
              className={
                isOpenDropDownMenu
                  ? 'app__drop_down_menu'
                  : 'app__drop_down_menu-close'
              }
            >
              <ul
                className="app__drop_down_menu_ul"
                onClick={() => setIsOpenDropDownMenu(!isOpenDropDownMenu)}
              >
                <li
                  className="app__drop_down_menu_li"
                  onClick={() => requestSort('title')}
                >
                  <div className="app__drop_down_menu_li_content">
                    <img
                      className="app__drop_down_menu_icon"
                      alt=""
                      src={AlphabetIcon}
                    />
                    <p className="app__drop_down_menu_p">По алфавиту</p>
                  </div>
                </li>
                <li
                  className="app__drop_down_menu_li"
                  onClick={() => requestSort('creationDate')}
                >
                  <div className="app__drop_down_menu_li_content">
                    <img
                      className="app__drop_down_menu_icon"
                      alt=""
                      src={CreationDateIcon}
                    />
                    <p className="app__drop_down_menu_p">По дате создания</p>
                  </div>
                </li>
                <li
                  className="app__drop_down_menu_li"
                  onClick={() => requestSort('deadline')}
                >
                  <div className="app__drop_down_menu_li_content">
                    <img
                      className="app__drop_down_menu_icon"
                      alt=""
                      src={DeadlineIcon}
                    />
                    <p className="app__drop_down_menu_p">По дате исполнения</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="app__todo-list">
              <TodoList
                setIsOpenModalEdit={setIsOpenModalEdit}
                searchValue={searchValue}
                sortConfig={sortConfig}
              />
            </div>
          </div>
        </div>
        <div className="app__content_right_bar"></div>
      </div>
    </div>
  )
}

export default App
