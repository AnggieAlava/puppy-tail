import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../../styles/profile.css"
import stock_pet from "../../img/stock_pet_black.png"

export const KeeperForm = ({ }) => {
  const { store, actions } = useContext(Context)
  //Calendar use
  const [value, setValue] = useState([]);
  const [selectedPets, setSelectedPets] = useState([])
  const [isRange, setisRange] = useState(false)
  const [times, setTimes] = useState([])
  const [secondTimes, setsecondTimes] = useState([])
  const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const [disabledCalendar, setdisabledCalendar] = useState([0, 1, 2, 3, 4, 5, 6])
  const [hour, setHour] = useState("")
  const [maxDate, setmaxDate] = useState(new Date(new Date().getTime() + (366 * 24 * 60 * 60 * 1000)))
  const [finalHour, setfinalHour] = useState("")
  const [edit, setEdit] = useState(true) //Editar los campos de horas
  const [currentService, setCurrentService] = useState(" ");
  const params = useParams();

  useEffect(() => {
    setcheckoutData();
  }, [hour, finalHour, selectedPets])

  function setcheckoutData(){
    if (hour != "" && finalHour != "") {
      //Unir fechas y horas para enviar a checkout
      let start_hour = hour.split(":")[0]
      let start_minutes = hour.split(":")[1]
      let utc_start_time = new Date(Date.UTC(2020,1,1,Number(start_hour),Number(start_minutes),0,0))
      console.log(utc_start_time)
      let new_start = new Date(Date.UTC(value[0].getUTCFullYear(), value[0].getUTCMonth(), value[0].getUTCDate(),0,0,0,0)) //Formato de tiempo para guardar en booking
      let start_time = new Date(`Dec 20 2019 ${hour}`)
      new_start.setUTCHours(start_time.getUTCHours(), start_time.getMinutes(),0,0)
      
      let new_end = new Date(value[1]) //Formato de tiempo para guardar en booking
      let end_time = new Date(`Dec 20 2019 ${finalHour}`)
      new_end.setUTCHours(end_time.getUTCHours(), end_time.getMinutes(),0,0)

      let start_date = value[0].getDate().toString() + "-" + (value[0].getMonth() + 1).toString() + "-" + value[0].getFullYear().toString()
      let end_date = value[1].getDate().toString() + "-" + (value[1].getMonth() + 1).toString() + "-" + value[1].getFullYear().toString()
      let obj = {
        "start_date": start_date,
        "end_date": end_date,
        "new_start": new_start, //Formato de tiempo para booking
        "new_end": new_end,
        "start_hour": hour,
        "end_hour": finalHour,
        "service": currentService,
        "pets": selectedPets
      }
      actions.setDates(obj);
    }
  }
  function setRange(service) {
    //Reset everything when choosing another service type
    actions.setDates(null)
    setCurrentService(service)
    setValue([])
    setTimes([])
    setdisabledCalendar([])
    if (service == "Cuidar mascotas") {
      setisRange(true)
    }
    else {
      setisRange(false)
    }
  }
  async function getSlots(date) {
    setValue(date)
    setHour("")
    setfinalHour("")
    setTimes([])
    setsecondTimes([])
    if (isRange) {
      setEdit(true) //Editar los campos de horas
      pickMultipleHours(date)
      return;
    };
    let new_date = date[0].getFullYear().toString() + "-" + (date[0].getMonth() + 1).toString() + "-" + date[0].getDate().toString()
    let slots = await actions.getdailySlots(store.currentUser.id, new_date)
    setTimes(slots)
    setEdit(false)
  }
  async function pickMultipleHours(date) {
    if (date[0] != null && date[1] == null) {
      //This is the state when the user has clicked the first date and we have to set the calendar to only be able to be clicked at the following days without conflicts
      setTimes([])
      return;
    }
    let first_date = date[0].getFullYear().toString() + "-" + (date[0].getMonth() + 1).toString() + "-" + date[0].getDate().toString()
    let second_date = date[1].getFullYear().toString() + "-" + (date[1].getMonth() + 1).toString() + "-" + date[1].getDate().toString()
    let slots = await actions.getrangeSlots(store.currentUser.id, first_date, second_date)
    setTimes(slots[0])
    setsecondTimes(slots[1])
    if (slots[0].length == 0 && slots[1].length == 0) {
      document.getElementById("datesText1").textContent = "No hay disponibilidad para estas fechas"
      document.getElementById("datesText2").textContent = "No hay disponibilidad para estas fechas"
      setEdit(true)
    }
    else {
      setEdit(false)
      document.getElementById("datesText1").textContent = ""
      document.getElementById("datesText2").textContent = ""
    }//Editar los campos de horas
  }
  function sendDate(e) {
    if (isRange && e.target.id == "startHour" && e.target.value != "") {
      setHour(e.target.value)
    }
    if (!isRange && e.target.id == "startHour" && e.target.value != "") {
      setHour(e.target.value)
      let date = new Date(`20 December 2019 ${e.target.value}`) //Dummy date info to strip time from it
      date.setHours(date.getHours() + 1)
      date = date.getHours().toString() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes().toString()
      setfinalHour(date)
    }
    if (e.target.id == "endHour") {
      setfinalHour(e.target.value)
    }
  }
  function imgErrorHandler(e) {
    e.target.src = stock_pet
  }
  function checkPet(index, id){
    let petCard = document.getElementById("pet"+index)
    let cardContainer = document.getElementById('card'+index)
    let petImg = document.getElementById('petImg'+index)
    let isChecked = petCard.checked
    if(isChecked){
      petCard.checked = !isChecked
      cardContainer.classList.remove('pet-card-checked')
      petImg.classList.remove('pet-card-img')
      let index = selectedPets.indexOf(id)
      if(index!==-1){
        let tempArr = selectedPets
        tempArr.splice(index, 1)
        setSelectedPets(tempArr)
        setcheckoutData()
      }
    }
    else if (!isChecked){
      petCard.checked = !isChecked
      cardContainer.classList.add('pet-card-checked')
      petImg.classList.add('pet-card-img')
      let tempArr = [...selectedPets,id]
      setSelectedPets(tempArr)
    }
  }
  return (
    <div className="container-fluid snow-bg">
      <div className="container d-flex flex-column justify-content-center pb-4 text-start p-4" id="calendar">
        <h2 className="row"><strong>Reservar</strong></h2>
        <div className="row gap-2">
          {/* Dos columnas principales */}
          <div className="col px-0">
            <h2 className="input-group-text">Servicios</h2>
            {/* Escogencia de servicios */}
            {Array.isArray(store.currentUser.services) && (store.currentUser.hourly_pay != null) ? store.currentUser.services.map((service, index) => {
              return (
                <div className="form-check form-check-inline" key={index}>
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={() => setRange(service)} id={"option" + index} value={service} />
                  <label className="form-check-label" htmlFor={"option" + index}>{service}</label>
                </div>
              )
            }) : store.currentUser.first_name + " no ha establecido servicios o tarifa"}

            <h2 className="input-group-text">Mascotas</h2>
            {Array.isArray(store.ownerPets) ? store.ownerPets.map((pet, index) => {
              return (
                <div className="form-check form-check-inline py-1 px-0" key={index}>
                  {/* <label className="btn" htmlFor={"pet"+index}>{pet.name}</label> */}
                  <div className="text-center d-block custom-button-check pb-1" id={"card"+index} onClick={()=>checkPet(index, pet.id)}>
                    <input className="btn btn-check" type="checkbox" disabled autoComplete="off" id={"pet" + index} />
                    <div className="pb-3"><img id={"petImg"+index}onError={(event)=>imgErrorHandler(event)} src={pet.profile_pic} className="pet-avatar p-1" /></div>
                    <label className="larger-label" htmlFor={"pet"+index}>{pet.name}</label>
                  </div>
                </div>
              )
            }) : "Inicia sesion en este dispositivo para escoger mascota"}


            <h2 className="input-group-text mt-2">Disponibilidad</h2>
            <div className="d-flex justify-content-center">
              <Calendar onChange={(date) => getSlots(date)} minDate={new Date()} maxDate={maxDate} allowPartialRange={true}
                tileDisabled={({ date }) => disabledCalendar.includes(date.getDay())} selectRange={isRange}
                returnValue="range" value={value} locale="es" />
            </div>
            {/* Aqui irian las horas del calendario si fueran en la columna 1*/}
          </div>
          <div className="col">
            {/* Horas a escoger, se esconde si escoges el rol de cuidador */}
            <div className="row">
              <h2 className="input-group-text">Reserva</h2>
            </div>
            <div className="d-block">
              <small>Tarifa</small>
              <p>{(store.currentUser.hourly_pay ? "$" + store.currentUser.hourly_pay + "/hora" :
                "Sin tarifa establecida por " + store.currentUser.first_name)}</p>
            </div>
            <div className="row mb-2">
              {value.map((date, index) => {
                return (
                  <div key={index} id="Reserva">
                    <strong>
                      {((index == 0) ?
                        <div className="mb-3">
                          <label htmlFor="basic-url" className="form-label">Fecha de inicio</label>
                          <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">
                              {days[date.getDay()] + " " + date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString()}
                            </span>
                            <select className="form-select" id="startHour" disabled={edit} onChange={(e) => sendDate(e)}>
                              {times.map((time, index) =>
                                <option key={index} value={time}>{time}</option>
                              )}
                            </select>
                          </div>
                          {(isRange ? <div className="form-text" id="datesText1">Escoge las horas despues de escoger las fechas</div> : "")}
                        </div>
                        :
                        <div className="mb-3">
                          <label htmlFor="basic-url" className="form-label">Fecha final</label>
                          <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">
                              {(date == null ? "Escoger fecha final" :
                                (`${days[date.getDay()] + " " + date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString()}`))}
                            </span>
                            <select className="form-select" id="endHour" disabled={(isRange ? edit : true)} onChange={(e) => sendDate(e)}
                              defaultValue={"Escoge hora"}>
                              {(isRange ?
                                secondTimes.map((time, index) =>
                                  <option key={index} value={time}>{time}</option>)
                                : <option value={finalHour}>{finalHour}</option>)}
                            </select>
                          </div>
                          {(isRange ? <div className="form-text" id="datesText2">Escoge las horas despues de escoger las fechas</div> : "")}
                        </div>
                      )}
                    </strong>
                  </div>
                )
              })}
            </div>
            {(value.length > 1 ?
              <Link to={(((finalHour == "" || hour == "") ? "#" : selectedPets[0]!==undefined?`/checkout/keeper/${store.currentUser.id}`:'#'))}>
                <button className="btn btn-green" onMouseDown={() => console.log(hour + "" + finalHour)} role="button" disabled={((finalHour == "" || hour == "") ? true : (selectedPets[0]!==undefined)?false:true)}>Reservar</button>
              </Link> : "")}
              {(selectedPets.length<1? value.length>1?<div className="form-text"><strong>Selecciona al menos una mascota para continuar con la reserva</strong></div>:"" : "")}
          </div>
        </div>
      </div>
    </div>
  );
};