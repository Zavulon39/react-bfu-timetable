import React, {useState} from "react";
import {Header} from "../components/Header"
import {Container, Grid, InputAdornment, TextField} from "@material-ui/core"
import {Search} from '@material-ui/icons'
import teacherManager from "../store/teachers"
import abitsTimetable from "../store/abitsTimetable"
import '../scss/teachers.scss'
import {NotFound} from "../components/NotFound";
import {Timetable} from "../components/Timetable";
import {Teachers} from "../components/Teachers";

export const TeacherTimetable = () => {
  const [search, setSearch] = useState('')
  const [teachers, setTeachers] = useState(teacherManager.data)
  const [showTimetable, setShowTimetable] = useState(false)
  const [timetable, setTimetable] = useState([])
  const [teacher, setTeacher] = useState('')
  const [date, setDate] = useState(new Date(Date.now()))
  const [initialTimetable, setInitialTimetable] = useState([])

  const searchHandler = event => {
    setSearch(event.target.value)
    setTeachers(teacherManager.getFilteredData(event.target.value.toLowerCase()))
  }

  const clickHandler = teacher => {
    setShowTimetable(true)
    setTeacher(teacher)
    const resp = abitsTimetable.getTeacherTimetable(teacher)
    setInitialTimetable(resp)
    setTimetable(resp.filter(el =>
      el.date.getDate() === date.getDate() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getFullYear() === date.getFullYear()
    ))
  }

  return (
    <>
      <Header/>
      <Container>
        <h1 className="anim-item">Выберите преподавателя</h1>
        <form className="anim-item">
          <TextField
            id="standard-basic"
            label="Введите ФИО"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={searchHandler}
          />
        </form>
        <Teachers
          teachers={teachers}
          clickHandler={clickHandler}
        />

        {
          showTimetable ? <>
              <h1 className="anim-item mt-40">Расписание для преподавателя <strong>{teacher}</strong>:</h1>
              <Timetable
                timetable={timetable}
                setTimetable={setTimetable}
                initialTimetable={initialTimetable}
                date={date}
                setDate={setDate}
              />
            </>
            : null
        }

        <div style={{height: 40}}/>
      </Container>
    </>
  )
}