import './SideBar.css'
import InProcessIcon from '../../assets/process.svg'
import DoneIcon from '../../assets/done.svg'
import NotDoneIcon from '../../assets/not_done.svg'

function SideBar({ isOpenSideBar }) {
  return (
    <div className="side-bar__wrapper">
      <div
        className={`side-bar__wrapper--close ${
          isOpenSideBar ? 'side-bar__wrapper--open' : 'side-bar__wrapper--close'
        }`}
      >
        {!isOpenSideBar ? (
          <div className="side-bar__buttonbar">
            <button
              className="side-bar__buttonbar_button"
              title="Задачи в процессе"
            >
              <img
                src={InProcessIcon}
                alt=""
                className="side-bar__button_icon "
              />
            </button>
            <button
              className="side-bar__buttonbar_button"
              title="Выполненные задачи"
            >
              <img src={DoneIcon} alt="" className="side-bar__button_icon " />
            </button>
            <button
              className="side-bar__buttonbar_button"
              title="Невыполненные задачи"
            >
              <img
                src={NotDoneIcon}
                alt=""
                className="side-bar__button_icon "
              />
            </button>
          </div>
        ) : (
          <div className="side-bar__buttonbar ">
            <button
              className="side-bar__buttonbar_button-open"
              title="Задачи в процессе"
            >
              <img
                src={InProcessIcon}
                alt=""
                className="side-bar__button_icon "
              />
              <p className="side-bar__button_text">В процессе</p>
            </button>
            <button
              className="side-bar__buttonbar_button-open"
              title="Выполненные задачи"
            >
              <img src={DoneIcon} alt="" className="side-bar__button_icon " />
              <p className="side-bar__button_text">Выполненные</p>
            </button>
            <button
              className="side-bar__buttonbar_button-open"
              title="Невыполненные задачи"
            >
              <img
                src={NotDoneIcon}
                alt=""
                className="side-bar__button_icon "
              />
              <p className="side-bar__button_text">Невыполненные</p>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar
