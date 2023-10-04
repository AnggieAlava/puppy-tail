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
  const [times, setTimes] = useState([])
  const [disabledCalendar, setdisabledCalendar] = useState([0, 1, 2, 3, 4, 5, 6])
  const [hour, setHour] = useState("")
  const [finalHour, setfinalHour] = useState("")
  const params = useParams();

  function getDate(){
    let today = new Date()
    return today
  }
  function setTime(time){
    setHour(time)
    let date = new Date(`20 December 2019 ${time}`)
    date.setHours(date.getHours(),60)
    console.log(date)
    console.log(date.getMinutes())
    console.log(date.getHours().toString()+":"+date.getMinutes().toString())
  }
  function setRange(service){
    setValue([])
    setTimes([])
    setdisabledCalendar([])
    if(service=="Cuidador(a) de mascotas"){
      setisRange(true)
    }
    else{
      setisRange(false)
    }
  }
  async function getSlots(date){
    setValue(date)
    setHour("")
    setTimes(["Obteniendo horas..."])
    let new_date = date[0].getFullYear().toString()+"-"+(date[0].getMonth()+1).toString()+"-"+date[0].getDate().toString()
    let slots = await actions.getdailySlots(store.currentUser.id, new_date)
    setTimes(slots)
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
            <div className="form-check form-check-inline" key={index}>
            <input href="#calendar" className="form-check-input" type="radio" name="inlineRadioOptions" onChange={()=>setRange(service)} id={"option"+index} value={service} />
            <label className="form-check-label" htmlFor={"option"+index}>{service}</label>
          </div>
          )}):""}
          <h2 className="input-group-text mt-2">Disponibilidad</h2>
          <Calendar onChange={(date)=>getSlots(date)} minDate={getDate()} allowPartialRange={true} 
          tileDisabled={({date}) => disabledCalendar.includes(date.getDay())} selectRange={isRange} 
          returnValue="range" value={value} locale="es"/>
          {/* Horas a escoger, se esconde si escoges el rol de cuidador */}
          {(value.length>1 && isRange==false)?
            <div className="my-2">
              <h2 className="input-group-text mt-2">Horas disponibles</h2>
              {(times.length > 0)?
                <div className="d-flex flex-row flex-wrap gap-2">
                {(times.map((time, index)=>{return(
                  <a key={index} href="#Reserva" className="btn btn-outline-dark" onClick={()=>setTime(time)}>{time}</a>
                )}))}
              </div>
              :"No hay disponibilidad para este día"}
            </div>
          :""}  
        </div>
        <div className="col">
          <div className="row">
            <h2 className="input-group-text">Reserva</h2>
          </div>
          <div className="d-block">
            <small>Tarifa</small>
            <p>{(store.currentUser.hourly_pay? "$"+store.currentUser.hourly_pay+"/hora":"Sin tarifa establecida por "+store.currentUser.first_name)}</p>
          </div>
          <div className="row mb-2">
            {value.map((date, index) => {
            return(
              <div key={index} id="Reserva">
                {((index==0)?(`Inicio: ${date.getDate().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getFullYear().toString()+" "+hour}`):(date == null?"":(`Fin: ${date.getDate().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getFullYear().toString()+" "+hour}`)))}
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

