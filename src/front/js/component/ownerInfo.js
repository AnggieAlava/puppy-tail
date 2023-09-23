import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";

export const OwnerInfo = ({owner}) => {
  
  const params = useParams();
  const { store, actions } = useContext(Context);
  const [currentUser, setcurrentUser] = useState({})
  //useState(JSON.parse(localStorage.getItem(params.type)))
  //Profile picture
  const [file, setFile] = useState(stock_avatar) //TEMP PROFILE PIC. FOR PREVIEW ONLY
  const [avatar, setAvatar] = useState(currentUser.profile_pic)
  
  useEffect(()=>{
    loadUser()
  },[])

  async function loadUser(){
    let resp = await actions.getOwner(params.theid)
    console.log({resp})
  }

  function imgErrorHandler(e){
    e.target.src = stock_avatar
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
    let obj = {
        id: currentUser.id,
        first_name: document.getElementById("firstNameInput").value,
        last_name: document.getElementById("lastNameInput").value,
        description: document.getElementById("descriptionInput").value,
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
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Ubicacion</label>
                                    <input type="text" className="form-control" id="locationInput" aria-describedby="nameHelp" defaultValue={currentUser.location}/>
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
                <img onError={imgErrorHandler} src={avatar} style={{borderRadius:"50%", width:"auto", height:"35vh", objectFit:"contain"}}/>
            </div>
			<div className="row d-flex flex-row flex-wrap justify-content-between mb-2">
                <h2>{currentUser.first_name}</h2>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around mb-2">
                <div className="d-block">
                    <p><i className="fa-solid fa-location-dot"></i><strong> Ubicacion</strong></p>
                    <p>{currentUser.location}</p>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>Sobre mi</strong></h3>
                <p>{currentUser.description}</p>
            </div>
    </div>
  );
};
