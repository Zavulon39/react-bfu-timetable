import React, {useRef, useEffect} from "react"
import {Link, useLocation} from 'react-router-dom'
import '../scss/header.scss'
import {Search} from "@material-ui/icons";

export const Header = () => {
  const {pathname} = useLocation()
  const links = {
    '/students/': useRef(null),
    '/teachers/': useRef(null),
    '/search/': useRef(null),
  }

  useEffect(() => {
    links[pathname].current.style.color = '#fff'
  }, [])

  return (
    <header>
      <div className="main-links">
        <Link to="/students/" ref={links['/students/']} className="timetable-link">Расписание студента</Link>
        <Link to="/teachers/" ref={links['/teachers/']} className="timetable-link">Расписание преподавателя</Link>
      </div>
      <div className="other-links">
        <Link to="/search/" ref={links['/search/']} className="timetable-link">
          <Search fontSize="medium"/>
          <span>Поиск</span>
        </Link>
      </div>
    </header>
  )
}