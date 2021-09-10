import './TopBar.css'
import MenuIcon from '../../assets/menu.svg'
import HomeIcon from '../../assets/home.svg'
import SearchIcon from '../../assets/search.svg'
function TopBar({ isOpenSideBar, setIsOpenSideBar, setSearchValue }) {
  const handleOpenClick = () => {
    isOpenSideBar ? setIsOpenSideBar(false) : setIsOpenSideBar(true)
  }

  return (
    <div className="top-bar__wrapper">
      <div className="top-bar__button_toolbar">
        <div>
          <button className="top-bar__button_menu" onClick={handleOpenClick}>
            <img src={MenuIcon} alt="" className="top-bar__button_icon" />
          </button>
          <button className="top-bar__button_menu">
            <img src={HomeIcon} alt="" className="top-bar__button_icon" />
          </button>
        </div>
      </div>
      <div className="top-bar__input_bar">
        <img src={SearchIcon} alt="" className="top-bar__input_search_icon" />
        <input
          className="top-bar__input_search"
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={'Введите запрос'}
        ></input>
      </div>
    </div>
  )
}

export default TopBar
