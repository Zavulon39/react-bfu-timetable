import React from "react"
import {Grid} from "@material-ui/core";
import {NotFound} from "./NotFound";

export const Teachers = ({teachers, clickHandler}) => {

  return (
    <Grid container style={{marginTop: 8}}>
      {teachers.length ? teachers.map(el => {
        return (
          <Grid item md={3} key={el.teacher + el.institut} onClick={() => clickHandler(el.teacher)}>
            <div className="teacher-item anim-item">
              <div className="name">
                {el.teacher}
              </div>
              <div className="institute">
                {el.institut}
              </div>
            </div>
          </Grid>
        )
      }) : <NotFound/>}
    </Grid>
  )
}