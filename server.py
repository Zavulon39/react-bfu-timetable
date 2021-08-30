from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from json import load
from datetime import datetime, timedelta

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

_start: datetime = None


def parse(el: dict):
    for _, institute in el[1].items():
        for _, directions in institute.items():
            for item in directions:
                date = datetime.fromisoformat(item['date'])

                if _start <= date <= _start + timedelta(7):
                    return True

    return False


@app.get('/get_timetable/')
def get_timetable(start: str = Query(str(datetime.now()))):
    global _start

    with open('static/timetable.json', 'r') as file:
        json = load(file)
        _start = datetime(*map(int, start.split('T')[0].split('-')))

        json = list(filter(parse, json.items()))

        return json
