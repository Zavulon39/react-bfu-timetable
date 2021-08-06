import datetime
import json
import requests


def parse_json_to_timetable(data):
    resp = {}

    for el in data:
        resp[el['Faculty']] = {}

        for d in el['Directions']:
            resp[el['Faculty']][d['Direction']] = {}

            for c in d['Сourses']:

                for g in c['Groups']:

                    for date in g['Dates']:
                        resp[el['Faculty']][d['Direction']][f"{g['Group']}(Общая)"] = []
                        resp[el['Faculty']][d['Direction']][f"{g['Group']}(1 подгруппа)"] = []
                        resp[el['Faculty']][d['Direction']][f"{g['Group']}(2 подгруппа)"] = []

                        for detail in filter(lambda el: el['Subgroup'] == 'Общая', date['Details']):
                            resp[el['Faculty']][d['Direction']][f"{g['Group']}({detail['Subgroup']})"].append({
                                'title': detail['Discipline'],
                                'type': detail['Load'],
                                'startTime': str(
                                    datetime.time(
                                        *map(int, detail['StartDate'].split(':'))
                                    )),
                                'endTime': str(
                                    datetime.time(
                                        *map(int, detail['EndDate'].split(':'))
                                    )),
                                'teacher': detail['Teacher'],
                                'place': detail['Room'] or 'Test timetable, no room',
                                'date': date['Date']
                            })

                        for detail in filter(lambda el: el['Subgroup'] == '1 подгруппа', date['Details']):
                            resp[el['Faculty']][d['Direction']][f"{g['Group']}({detail['Subgroup']})"].append({
                                'title': detail['Discipline'],
                                'type': detail['Load'],
                                'startTime': str(
                                    datetime.time(
                                        *map(int, detail['StartDate'].split(':'))
                                    )),
                                'endTime': str(
                                    datetime.time(
                                        *map(int, detail['EndDate'].split(':'))
                                    )),
                                'teacher': detail['Teacher'],
                                'place': detail['Room'] or 'Test timetable, no room',
                                'date': date['Date']
                            })

                        for detail in filter(lambda el: el['Subgroup'] == '2 подгруппа', date['Details']):
                            resp[el['Faculty']][d['Direction']][f"{g['Group']}({detail['Subgroup']})"].append({
                                'title': detail['Discipline'],
                                'type': detail['Load'],
                                'startTime': str(
                                    datetime.time(
                                        *map(int, detail['StartDate'].split(':'))
                                    )),
                                'endTime': str(
                                    datetime.time(
                                        *map(int, detail['EndDate'].split(':'))
                                    )),
                                'teacher': detail['Teacher'],
                                'place': detail['Room'] or 'Test timetable, no room',
                                'date': date['Date']
                            })

    return resp


def parse_json_to_subjects(data):
    resp = {}

    for el in data:
        resp[el['Faculty']] = set()
        for d in el['Directions']:
            for c in d['Сourses']:
                for g in c['Groups']:
                    for date in g['Dates']:
                        for detail in date['Details']:
                            resp[el['Faculty']].add(json.dumps({
                                'title': detail['Discipline']
                            }))
    for k, v in resp.items():
        resp[k] = list(map(json.loads, v))

    return resp


def parse_json_to_teachers(data):
    resp = set()

    for el in data:
        for d in el['Directions']:
            for c in d['Сourses']:
                for g in c['Groups']:
                    for date in g['Dates']:
                        for detail in date['Details']:
                            resp.add(json.dumps({
                                'teacher': detail['Teacher'],
                                'institut': el['Faculty']
                            }))
    return list(map(json.loads, resp))


def parse_json_to_tl(data):
    resp = set()

    for el in data:
        for d in el['Directions']:
            resp.add(d['Direction'])

    return list(resp)


_data = json.load(open('schedule.json', encoding='utf-8'))
# resp = requests.get('...')
# _data = resp.json()

json.dump(
    parse_json_to_timetable(_data),
    open('./static/timetable.json', 'w', encoding='utf-8')
)
json.dump(
    parse_json_to_teachers(_data),
    open('./static/teachers.json', 'w', encoding='utf-8')
)
json.dump(
    parse_json_to_subjects(_data),
    open('./static/subjects.json', 'w', encoding='utf-8')
)
json.dump(
    parse_json_to_tl(_data),
    open('./static/tl.json', 'w', encoding='utf-8')
)

