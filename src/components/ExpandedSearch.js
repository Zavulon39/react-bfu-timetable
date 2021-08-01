import React, {useState} from 'react'
import {KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import teachingLevel from "../store/teachingLevel";
import abitsTimetable from "../store/abitsTimetable";
import teachers from "../store/teachers";
import {Teachers} from "./Teachers";
import {SearchTimetable} from "./Timetable";

export const ExpandedSearch = () => {
  const [qs, setQs] = useState({ pairs: [], teachers: [] })
  const [subject, setSubject] = useState('')
  const [teacher, setTeacher] = useState('')
  const [time, setTime] = useState(null)
  const [tl, setTl] = useState(teachingLevel.data[0])

  const clickHandler = () => {
    if (!subject.trim() && !teacher.trim() && !time) {
      return setQs({ pairs: [], teachers: [] })
    }

    setQs({
      pairs: abitsTimetable.strictSearchTimetable(
        time,
        subject,
        teacher,
        tl
      ),
      teachers: teachers.getFilteredData(teacher),
    })
  }

  return (
   <div className="expanded">
     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
       <KeyboardTimePicker
         className="anim-item"
         id="time-picker"
         label="Выберите время"
         value={time}
         onChange={setTime}
       />
     </MuiPickersUtilsProvider>
     <div className="divider anim-item" />
     <TextField
       id="standard-basic"
       className="anim-item"
       label="Введите название пары"
       value={subject}
       onChange={event => setSubject(event.target.value)}
     />
     <div className="divider anim-item" />
     <TextField
       id="standard-basic"
       className="anim-item"
       label="Введите ФИО учителя"
       value={teacher}
       onChange={event => setTeacher(event.target.value)}
     />
     <div className="divider anim-item" />
     <FormLabel component="legend" style={{marginTop: 18, marginBottom: 8}} className="anim-item">Выберите уровень образования</FormLabel>
     <RadioGroup className="anim-item" aria-label="gender" name="gender1" value={tl} onChange={(_, v) => setTl(v)}>
       {teachingLevel.data.map(el => {
         return (
           <FormControlLabel value={el} control={<Radio />} label={el} />
         )
       })}
     </RadioGroup>
     <button className="send anim-item" onClick={clickHandler}><span>Принять</span></button>

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