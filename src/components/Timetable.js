import React, {useState} from "react"
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import {NotFound} from "./NotFound";

export const Timetable = ({timetable, setTimetable, initialTimetable, date, setDate}) => {

  const setDateHandler = date => {
    setTimetable(initialTimetable.filter(el =>
      el.date.getDate() === date.getDate() &&
      el.date.getMonth() === date.getMonth() &&
      el.date.getFullYear() === date.getFullYear()
    ))
    setDate(date)
  }

  return (
    <>
      <form className="anim-item">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label={!date ? "Выберите дату" : "Расписание на:"}
            value={date}
            onChange={setDateHandler}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </form>
      {timetable.length ? <div className="student-container">
        {timetable.map(el => {
          return (
            <div className="student-timetable anim-item" key={el.title}>
              <div className="left">
                <div className="start-time">
                  {el.startTime.getHours() < 10 ? '0' : ''}
                  {el.startTime.getHours()}.
                  {el.startTime.getMinutes() < 10 ? '0' : ''}
                  {el.startTime.getMinutes()}
                </div>
                <div className="end-time">
                  {el.endTime.getHours() < 10 ? '0' : ''}
                  {el.endTime.getHours()}.
                  {el.endTime.getMinutes() < 10 ? '0' : ''}
                  {el.endTime.getMinutes()}
                </div>
              </div>
              <div className="right">
                <div className="row1">
                  <div className="student-item">
                    <span>{el.type}</span>
                  </div>
                </div>
                <div className="row2">
                  {el.title}
                </div>
                <div className="row3">
                  <div className="student-item">
                    {el.teacher}
                  </div>
                  <div className="student-item">
                    {el.place}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div> : <NotFound />}
    </>
  )

}

export const SearchTimetable = ({timetable}) => {

  if (timetable.length)
    return (
      <div className="student-container">
        {timetable.map(el => {
          return (
            <div className="student-timetable anim-item" key={el.title}>
              <div className="left">
                <div className="start-time">
                  {el.startTime.getHours() < 10 ? '0' : ''}
                  {el.startTime.getHours()}.
                  {el.startTime.getMinutes() < 10 ? '0' : ''}
                  {el.startTime.getMinutes()}
                </div>
                <div className="end-time">
                  {el.endTime.getHours() < 10 ? '0' : ''}
                  {el.endTime.getHours()}.
                  {el.endTime.getMinutes() < 10 ? '0' : ''}
                  {el.endTime.getMinutes()}
                </div>
              </div>
              <div className="right">
                <div className="row1">
                  <div className="student-item">
                    <span>{el.type}</span>
                  </div>
                  <div className="student-item">
                    <span>{el.group}</span>
                  </div>
                </div>
                <div className="row2">
                  {el.title}
                </div>
                <div className="row3">
                  <div className="student-item">
                    {el.teacher}
                  </div>
                  <div className="student-item">
                    {el.place}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )

  return <NotFound/>
}
