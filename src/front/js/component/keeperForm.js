import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const KeeperForm = ({}) => {
  const {store, actions} = useContext(Context)
  //Calendar use
  const [value, setValue] = useState([]);
  const [isRange, setisRange] = useState(false)
  const [times, setTimes] = useState(["5:00am", "5:30am", "6:00am", "6:30am", "7:00am", "7:30am", "8:00am", "8:30am", "9:00am", "9:30am"])
  const [disabledCalendar, setdisabledCalendar] = useState([0, 1, 2, 3, 4, 5, 6])
  const [hour, setHour] = useState()
  const params = useParams();

  function getDate(){
    let today = new Date()
    return today
  }
  function setTime(time){
    console.log(time)
    let arr = times
    arr = arr.filter(x=>x!=time)
    setTimes(arr)
  }
  function setRange(service){
    setValue([])
    setdisabledCalendar([])
    if(service=="Cuidador(a) de mascotas"){
      setisRange(true)
    }
    else{
      setisRange(false)
    }
  }

  return (
    <div className="container pb-4 text-start" id="calendar">
      <h2><strong>Reservar</strong></h2>
      <div className="row gap-2">
        {/* Dos columnas principales */}
        <div className="col px-0">
          <h2 className="input-group-text">Servicios</h2>
          {/* Escogencia de servicios */}
          {Array.isArray(store.currentUser.services)?store.currentUser.services.map((service, index)=>{return(
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={()=>setRange(service)} id={"option"+index} value={service} />
            <label className="form-check-label" htmlFor={"option"+index}>{service}</label>
          </div>
          )}):""}
          <h2 className="input-group-text mt-2">Disponibilidad</h2>
          <Calendar onChange={setValue} minDate={getDate()} allowPartialRange={true} 
          tileDisabled={({date}) => disabledCalendar.includes(date.getDay())} selectRange={isRange} 
          returnValue="range" value={value} locale="es"/>
          {/* Horas a escoger, se esconde si escoges el rol de cuidador */}
          {(value.length>1 && isRange==false)?
            <div className="my-2">
              <h2 className="input-group-text mt-2">Horas disponibles</h2>
              {(times.length > 0)?
                <div className="d-flex flex-row flex-wrap gap-2">
                {(times.map((time, index)=>{return(
                  <a href="#Reserva" class="btn btn-outline-dark" onClick={()=>setTime(time)}>{time}</a>
                )}))}
              </div>
              :"No hay disponibilidad para este día"}
            </div>
          :""}  
        </div>
        <div className="col">
          <div className="row">
            <h2 className="input-group-text" id="Reserva">Reserva</h2>
          </div>
          <div className="d-block">
            <small>Tarifa</small>
            <p>{(store.currentUser.hourly_pay? "$"+store.currentUser.hourly_pay+"/hora":"Sin tarifa establecida por "+store.currentUser.first_name)}</p>
          </div>
          <div className="row mb-2">
            {value.map((date, index) => {
            return(
              <div index={index}>
                {((index==0)?(`Inicio: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`):(date == null?"":(`Fin: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`)))}
              </div>
            )
            })}
          </div>
          {(value.length > 1?
          <Link to="/">
            <button className="btn btn-outline-dark btn-lg" role="button">Siguiente</button>
          </Link>:"")}
        </div>
      </div>
    </div>
  );
};

