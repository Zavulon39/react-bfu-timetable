import abitsTimetable from './store/abitsTimetable'
import teachers from './store/teachers'
import subjects from './store/subjects'
import teachingLevel from './store/teachingLevel'


function parseTimetable(data) {
  for (const institute of Object.entries(data)) {
    for (const tl of Object.entries(institute[1])) {
      for (const group of Object.entries(tl[1])) {
        for (const el of group[1]) {
          el.startTime = new Date(0, 0, 0, ...el.startTime.split(':').map(el => Number(el)))
          el.endTime = new Date(0, 0, 0, ...el.endTime.split(':').map(el => Number(el)))
          el.date = new Date(el.date)
        }
      }
    }
  }

  return data
}



export const bootstrap = async () => {
  let resp = await fetch('/static/timetable.json')
  let data = await resp.json()
  abitsTimetable.setData(parseTimetable(data))

  resp = await fetch('/static/teachers.json')
  data = await resp.json()
  teachers.setData(data)

  resp = await fetch('/static/subjects.json')
  data = await resp.json()
  subjects.setData(data)

  resp = await fetch('/static/tl.json')
  data = await resp.json()
  teachingLevel.setData(data)
}
