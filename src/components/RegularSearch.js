import React, {useState} from 'react'
import {InputAdornment, TextField} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import abitsTimetable from "../store/abitsTimetable";
import teachers from "../store/teachers";
import {Teachers} from "./Teachers";
import {SearchTimetable} from "./Timetable";

export const RegularSearch = () => {
  const [search, setSearch] = useState('')
  const [qs, setQs] = useState({
    pairs: [],
    teachers: [],
  })

  const searchHandler = event => {
    const data = event.target.value.trim()
    setSearch(data)

    if (!data.trim()) {
      return setQs({ pairs: [], teachers: [] })
    }

    if (data === 'Zavulon') {
      return setQs({
        pairs: [],
        teachers: [
          {
            teacher: 'Алексеев Михаил Михайлович',
            institut: 'Разработчик',
          },
        ],
      })
    }

    const timetableQs = abitsTimetable.searchTimetable(null, data, data)
    const teacherQs = teachers.getFilteredData(data)

    setQs({
      pairs: timetableQs,
      teachers: teacherQs,
    })
  }

  return (
    <div className="regular">
      <form className="anim-item">
        <TextField
          id="standard-basic"
          label="Поиск"
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
      <h2 className="anim-item">Преподаватели</h2>
      <Teachers
        teachers={qs.teachers}
        clickHandler={() => {}}
      />
      <h2 className="anim-item">Пары</h2>
      <SearchTimetable
        timetable={qs.pairs}
      />
      <div style={{height: 40}}/>
    </div>
  )
}