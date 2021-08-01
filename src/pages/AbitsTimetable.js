import React, {useState} from "react"
import {Header} from "../components/Header"
import {Container, Grid} from "@material-ui/core"
import {Timetable} from "../components/Timetable";
import abitsTimetable from "../store/abitsTimetable"
import '../scss/abits.scss'

export const AbitsTimetable = () => {
  const [initialTimetable, setInitialTimetable] = useState([])
  const [counter, setCounter] = useState(0)
  const [queryData, setQueryData] = useState({
    tl: '',
    institute: '',
  })
  const [date, setDate] = useState(new Date(Date.now()))
  const [tl, setTl] = useState([])
  const [group, setGroup] = useState([])
  const [groupTitle, setGroupTitle] = useState([])
  const [timetable, setTimetable] = useState([])
  const [activeGroupId, setActiveGroupId] = useState(-1)

  const instituteClickHandler = institute => {
    setTl(abitsTimetable.data[institute])
    setQueryData(prev => ({...prev, institute}))
    setActiveGroupId(-1)
    setCounter(1)
  }

  const tlClickHandler = (_tl, idx) => {
    setActiveGroupId(idx)
    setGroup(tl[_tl])
    setQueryData(prev => ({...prev, tl: _tl}))
    setCounter(2)
  }

  const groupClickHandler = g => {
    const resp = abitsTimetable.getTimetable(queryData.institute, queryData.tl, g)
    setInitialTimetable(resp)
    setTimetable(resp.filter(el =>
      el.date.getDate() === date.getDate() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getFullYear() === date.getFullYear()
    ))
    setGroupTitle(g)
    setCounter(3)
  }

  return (
    <>
      <Header/>
      <Container>
        <h1 className="anim-item">Выберите институт</h1>
        <Grid container style={{marginTop: 8}}>
          {Object.entries(abitsTimetable.data).map(el => {
            return (
              <Grid item md={4} key={el[0]} onClick={instituteClickHandler.bind(null, el[0])}>
                <div className="institute-item item">
                  <span>{el[0]}</span>
                </div>
              </Grid>
            )
          })}
        </Grid>

        {
          counter > 0 ? <>
            <h1 className="anim-item mt-40">Выберите уровень образования</h1>
            <Grid container style={{marginTop: 8}}>
              {Object.entries(tl).map((el, idx) => {
                return (
                  <Grid item md={3} key={el[0]} onClick={tlClickHandler.bind(null, el[0], idx)}>
                    <div className={activeGroupId === idx ? "tl-item active item" : "tl-item item"}>
                      <span>{el[0]}</span>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </> : null
        }

        {
          counter > 1 ? <>
            <h1 className="anim-item mt-40">Выберите группу</h1>
            <Grid container style={{marginTop: 8}}>
              {Object.entries(group).map(el => {
                return (
                  <Grid item md={2} key={el[0]} onClick={groupClickHandler.bind(null, el[0])}>
                    <div className="group-item item">
                      <span>{el[0]}</span>
                    </div>
                  </Grid>
                )
              })}
            </Grid>
          </> : null
        }

        {
          counter > 2 ? <>
            <h1 className="anim-item mt-40">Расписание для группы <strong>{groupTitle}</strong>:</h1>
            <Timetable
              timetable={timetable}
              setTimetable={setTimetable}
              initialTimetable={initialTimetable}
              date={date}
              setDate={setDate}
            />
          </> : null
        }
        <div style={{height: 40}}/>
      </Container>
    </>
  )
}