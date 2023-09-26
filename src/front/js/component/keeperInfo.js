import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";

export const KeeperInfo = ({keeper}) => {
  
  const params = useParams();
  const { store, actions } = useContext(Context);
    const [currentUser, setcurrentUser] = useState({})
    //Profile picture
    const petW = false;
    const petS = false;
    const partyP = false;
    const [file, setFile] = useState(stock_avatar) //TEMP PROFILE PIC. FOR PREVIEW ONLY
    const [avatar, setAvatar] = useState("")
    
    useEffect(()=>{
        loadUser()
    },[])
    async function loadUser(){
        let response = await actions.getKeeper(params.theid)
        console.log(response)
        setcurrentUser(response)
        //USED TO CHECK SERVICES IN EDIT MENU. REMOVE
        petW = currentUser.services.includes("Pet Walker")
        petS = currentUser.services.includes("Pet Sitter")
        partyP = currentUser.services.includes("Party Planner")
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
  async function uploadAvatar(){
    //Picture
    //e.preventDefault()
    const formData = new FormData()
    formData.append("avatar",document.getElementById("avatarImg").files[0])
    let resp = await actions.uploadPicture(formData, currentUser.id)
    console.log(resp)
    //Set picture as avatar in preview
    setAvatar(resp.public_url)
    currentUser["profile_pic"] = resp.public_url;
    localStorage.setItem("keeper",JSON.stringify(currentUser))
    //Set avatar = file
    //Call updateUser()
  }
  async function updateUser() {
    //Services
    let arr = [];
    if (document.getElementById("petWalker").checked) arr.push("Pet Walker");
    if (document.getElementById("petSitter").checked) arr.push("Pet Sitter");
    if (document.getElementById("partyPlanner").checked)
      arr.push("Party Planner");
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
    setcurrentUser(obj);
    actions.updateKeeper(obj);
  }

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editUser" >Editar</button>
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
                                <div className="mb-3">
                                    <div className="d-flex align-items-center justify-content-center"  style={{width: "100%", height:"12rem",overflow:"hidden", aspectRatio:"1"}}>
                                        <img onError={imgErrorHandler} style={{borderRadius:"50%", width:"12rem", height:"auto"}} src={file} className=""></img>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <input type="file" name="avatar" id="avatarImg" onChange={(event)=>setFile(URL.createObjectURL(event.target.files[0]))} hidden/>
                                    <div className="d-flex justify-content-center">
                                        {(file != stock_avatar? <div className="input-group d-flex justify-content-center"><button className="btn btn-outline-dark" type="button" onClick={()=>uploadAvatar(document.getElementById("avatarImg").event)}>Cargar foto</button>
                                        <button type="button" className="btn btn-outline-danger" onClick={()=>setFile(stock_avatar)}><i className="fa-solid fa-trash"></i></button></div>:<label className="btn btn-outline-dark" htmlFor="avatarImg">Seleccionar foto</label>)}
                                    </div>
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
                                        <input className="form-check-input" type="checkbox" defaultValue={petW} role="switch" id="petWalker" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Paseador(a) de mascotas</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultValue={petS} role="switch" id="petSitter" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Cuidador de mascotas</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultValue={partyP} role="switch" id="partyPlanner" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Organizador de fiestas</label>
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
			<div className="align-items-center justify-content-center row mb-2">
                <img onError={imgErrorHandler} src={currentUser.profile_pic} style={{borderRadius:"50%", width:"auto", height:"35vh", objectFit:"contain"}}/>
            </div>
			<div className="row d-flex flex-row flex-wrap justify-content-between mb-2">
                <h2>{currentUser.first_name}</h2>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around mb-2">
                <div className="d-block">
                    <p><strong>Experiencia</strong></p>
                    <p>{yearsExperience(currentUser.experience)}</p>
                </div>
                <div className="d-block">
                    <p><i className="fa-solid fa-location-dot"></i><strong> Ubicacion</strong></p>
                    <p>{currentUser.location}</p>
                </div>
                <div className="d-block">
                    <p><strong>Servicios</strong></p>
                    <ul style={{textAlign:"left"}}>
                        {(!Array.isArray(currentUser.services) ? "Sin servicios": currentUser.services.map((service, index)=> {return (
                            <li key={index}>{service}</li>
                        )}))}
                    </ul>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>Sobre mi</strong></h3>
                <p>{currentUser.description}</p>
            </div>
    </div>
  );
};
