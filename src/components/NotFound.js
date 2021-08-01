import React from "react"
import img from '../images/not_found.png'
import '../scss/not-found.scss'

export const NotFound = ({text = 'Ничего не найдено'}) => {
  return <div className="not-found anim-item">
    <img src={img} alt="not found"/>
    <h3>{text}</h3>
  </div>
}