import React, {useContext, useEffect, useState} from "react";
import {Context} from "../store/appContext"
import { useParams } from "react-router-dom";
import stock_avatar from "../../img/avatar.jpg";

export const KeeperInfo = ({keeper}) => {
  
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [currentUser, setcurrentUser] = useState({})
    const [avatar, setAvatar] = useState(stock_avatar)
    
    useEffect(()=>{
        loadUser()
    },[])
    async function loadUser(){
        let response = await actions.getKeeper(params.theid)
        setcurrentUser(response)
        setAvatar(response.profile_pic)
    }
    function loadServices(){
        document.getElementById("petSitter").checked = currentUser.services.includes("Cuidador(a) de mascotas")
        document.getElementById("petWalker").checked = currentUser.services.includes("Paseador(a) de mascotas")
        document.getElementById("partyPlanner").checked = currentUser.services.includes("Organizador(a) de fiestas")
    }
    function imgErrorHandler(e){
        e.target.src = stock_avatar
    }
    function yearsExperience(b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        let today = new Date();
        let startDate = new Date(b);
        const utc1 = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
        );
        const utc2 = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
        );
        //difference in days (eg. 360 days)
        let difference = Math.floor((utc1 - utc2) / _MS_PER_DAY);
        //Return first digit as string
        return (difference / 365).toString().slice(0, 1)+"+ years";
    }
    async function updateUser() {
        //Services
        let arr = [];
        if (document.getElementById("petWalker").checked) arr.push("Paseador(a) de mascotas");
        if (document.getElementById("petSitter").checked) arr.push("Cuidador(a) de mascotas");
        if (document.getElementById("partyPlanner").checked)
        arr.push("Organizador(a) de fiestas");
        if (arr.length === 0) arr.push("No services yet");
        //Experience
        let xp = document.getElementById("experienceInput").value
        if(xp ==""){
            xp = currentUser.experience
        }
        let obj = {
            id: currentUser.id,
            first_name: document.getElementById("firstNameInput").value,
            last_name: document.getElementById("lastNameInput").value,
            hourly_pay: document.getElementById("feeInput").value,
            description: document.getElementById("descriptionInput").value,
            experience: xp,
            services: arr,
            location: document.getElementById("locationInput").value,
        }
        actions.updateKeeper(obj);
        if(avatar != store.currentUser.profile_pic){
            uploadAvatar()
        }
    }
    async function uploadAvatar(){
        const formData = new FormData()
        formData.append("avatar",document.getElementById("avatarImg").files[0])
        let resp = await actions.uploadPicture(formData, store.currentUser.id)
        store.currentUser["profile_pic"] = resp.public_url;
    }

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editUser" onClick={loadServices} >Editar</button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editUserLabel">Editar</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div className="modal-body textLeft">
                            {/* FORM BODY */}
                            <form id="formID">
                                <div className="mb-3 d-flex justify-content-center">
                                    <div className="ratio ratio-1x1" style={{maxWidth: "350px"}}>
                                        <img onError={imgErrorHandler} src={avatar} className="card-img-top rounded-circle object-fit-cover" alt="..." />
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <input type="file" name="avatar" id="avatarImg" onChange={(event) => setAvatar(URL.createObjectURL(event.target.files[0]))} hidden />
                                    <label className="btn btn-outline-dark" htmlFor="avatarImg">Seleccionar foto</label>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="firstNameInput" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="firstNameInput" aria-describedby="nameHelp" defaultValue={currentUser.first_name}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="lastNameInput" className="form-label">Apellido</label>
                                        <input type="text" className="form-control" id="lastNameInput" aria-describedby="nameHelp" defaultValue={currentUser.last_name}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="categoryInput" className="form-label">Fecha de Inicio (Experiencia)</label>
                                        <input type="date" className="form-control" id="experienceInput"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="feeInput" className="form-label">Tarifa por hora</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="text" className="form-control" defaultValue={currentUser.hourly_pay} id="feeInput" aria-label="Amount (to the nearest dollar)" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Ubicacion</label>
                                    <input type="text" className="form-control" id="locationInput" aria-describedby="nameHelp" defaultValue={currentUser.location}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="flexSwitchCheckDefault" className="form-label">Servicios</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="petWalker" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Paseador(a) de mascotas</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="petSitter" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Cuidador(a) de mascotas</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="partyPlanner" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Organizador(a) de fiestas</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripcion</label>
                                    <textarea className="form-control" id="descriptionInput" rows="4" defaultValue={currentUser.description}></textarea>
                                </div>
                            </form>
                            {/* END OF FORM BODY */}
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={updateUser}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fin de modal */}
            </div>
			<div className="mb-3 d-flex justify-content-center">
                <div className="ratio ratio-1x1" style={{maxWidth: "350px"}}>
                    <img onError={imgErrorHandler} src={store.currentUser.profile_pic} className="card-img-top rounded-circle object-fit-cover" alt="..." />
                </div>
            </div>
			<div className="row d-flex flex-row flex-wrap justify-content-between mb-2">
                <h2>{store.currentUser.first_name}</h2>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around mb-2">
                <div className="d-block">
                    <p><strong>Experiencia</strong></p>
                    <p>{yearsExperience(store.currentUser.experience)}</p>
                </div>
                <div className="d-block">
                    <p><i className="fa-solid fa-location-dot"></i><strong> Ubicacion</strong></p>
                    <p>{store.currentUser.location}</p>
                </div>
                <div className="d-block">
                    <p><strong>Servicios</strong></p>
                    <ul style={{textAlign:"left"}}>
                        {(!Array.isArray(store.currentUser.services) ? "Sin servicios": store.currentUser.services.map((service, index)=> {return (
                            <li key={index}>{service}</li>
                        )}))}
                    </ul>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>Sobre mi</strong></h3>
                <p>{store.currentUser.description}</p>
            </div>
    </div>
  );
};
