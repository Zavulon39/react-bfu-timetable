import abitsTimetable from './store/abitsTimetable'
import teachers from './store/teachers'
import subjects from './store/subjects'
import teachingLevel from './store/teachingLevel'

export const bootstrap = async () => {
  abitsTimetable.setData({
    'Институт природопользования, территориального развития и градостроительства':
      {
        Специалитет: {
          111222: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(2021, 5, 30),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          222111: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
        Бакалавриат: {
          444555: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(2021, 5, 30),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          666777: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
      },
    'Медицинский институт': {
      Специалитет: {
        333444: [
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'лекция',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Иванов Иван Инванович',
            place: 'Аудитория 312',
            date: new Date(2021, 5, 29),
          },
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'лекция',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Иванов Иван Инванович',
            place: 'Аудитория 312',
            date: new Date(Date.now()),
          },
        ],
        4443333: [
          {
            title: 'Теория вероятностей и математическая статистика',
            type: 'лекция',
            startTime: new Date(Date.now()),
            endTime: new Date(Date.now() + 1000000),
            teacher: 'Роман Иванович Романов',
            place: 'Аудитория 312',
            date: new Date(Date.now()),
          },
        ],
      },
    },
  })
  teachers.setData([
    {
      teacher: 'Иванов Иван Инванович',
      institut: 'Медицинский институт',
    },
    {
      teacher: 'Роман Иванович Романов',
      institut:
        'Институт природопользования, территориального развития и градостроительства',
    },
  ])
  subjects.setData({
    'Институт природопользования, территориального развития и градостроительства':
      [{title: 'Теория вероятностей и математическая статистика'}],
    'Медицинский институт': [
      {title: 'Теория вероятностей и математическая статистика'},
    ],
  })
  teachingLevel.setData(['Специалитет', 'Бакалавриат'])
}
