from fastapi import FastAPI, Query
from fastapi.staticfiles import StaticFiles
from json import load
from datetime import datetime, timedelta
from copy import deepcopy

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get('/get_timetable/')
def get_timetable(start: str = Query(str(datetime.now()))):

    with open('static/timetable.json', 'r') as file:
        json = load(file)
        resp = deepcopy(json)
        _start = datetime(*map(int, start.split('T')[0].split('-')))

        for _el, el in resp.items():
            for _institute, institute in el.items():
                for _directions, directions in institute.items():
                    directions.clear()

        for _el, el in json.items():
            for _institute, institute in el.items():
                for _directions, directions in institute.items():
                    for item in directions:
                        date = datetime.fromisoformat(item['date'])
                        

                        if _start <= date <= _start + timedelta(7):
                            resp[_el][_institute][_directions].append(item)
                                
        return resp
