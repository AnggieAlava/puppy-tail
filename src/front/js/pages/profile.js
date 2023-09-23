import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";
import { KeeperForm } from "../component/keeperForm";
import { Pets } from "../component/pets";

export const Profile = ({keeper}) => {
	const params = useParams();
	const { store, actions } = useContext(Context);
    const [currentUser, setcurrentUser] = useState(JSON.parse(localStorage.getItem(params.type)))
    //USED TO CHECK SERVICES IN EDIT MENU. REMOVE
    const petW = currentUser.services.includes("Pet Walker")
    const petS = currentUser.services.includes("Pet Sitter")
    const partyP = currentUser.services.includes("Party Planner")
    //Profile picture
    const [file, setFile] = useState(stock_avatar) //TEMP PROFILE PIC. FOR PREVIEW ONLY
    const [avatar, setAvatar] = useState(currentUser.profile_pic)
  
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
		<div className="text-center container w-75 my-2">
            <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editUser" >Edit</button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editUserLabel">Edit</h1>
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
                                        {(file != stock_avatar? <div className="input-group d-flex justify-content-center"><button className="btn btn-outline-dark" type="button" onClick={()=>uploadAvatar(document.getElementById("avatarImg").event)}>Upload</button>
                                        <button type="button" className="btn btn-outline-danger" onClick={()=>setFile(stock_avatar)}><i className="fa-solid fa-trash"></i></button></div>:<label className="btn btn-outline-dark" htmlFor="avatarImg">Select picture</label>)}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="firstNameInput" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="firstNameInput" aria-describedby="nameHelp" defaultValue={currentUser.first_name}/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="lastNameInput" aria-describedby="nameHelp" defaultValue={currentUser.last_name}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="categoryInput" className="form-label">Start date (Experience)</label>
                                        <input type="date" className="form-control" id="experienceInput"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="feeInput" className="form-label">Hourly Fee</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="text" className="form-control" defaultValue={currentUser.hourly_pay} id="feeInput" aria-label="Amount (to the nearest dollar)" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Location</label>
                                    <input type="text" className="form-control" id="locationInput" aria-describedby="nameHelp" defaultValue={currentUser.location}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="flexSwitchCheckDefault" className="form-label">Services</label>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked={petW} role="switch" id="petWalker" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pet Walker</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked={petS} role="switch" id="petSitter" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pet Sitter</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" defaultChecked={partyP} role="switch" id="partyPlanner" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Party Planner</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" id="descriptionInput" rows="4" defaultValue={currentUser.description}></textarea>
                                </div>
                            </form>
                            {/* END OF FORM BODY */}
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={updateUser}>Save Changes</button>
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
                    <p><strong>Experience</strong></p>
                    <p>{yearsExperience(currentUser.experience)}</p>
                </div>
                <div className="d-block">
                    <p><i className="fa-solid fa-location-dot"></i><strong> Location</strong></p>
                    <p>{currentUser.location}</p>
                </div>
                <div className="d-block">
                    <p><strong>Services</strong></p>
                    <ul style={{textAlign:"left"}}>
                        {(!Array.isArray(currentUser.services) ? "No services yet": currentUser.services.map((service, index)=> {return (
                            <li key={index}>{service}</li>
                        )}))}
                    </ul>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>About me</strong></h3>
                <p>{currentUser.description}</p>
            </div>
            <hr className="mt-4 mb-2" />
            {/* Componente condicional aqui, pasar user type por props */}
            {(params.type == 'owner'? < Pets owner_id={params.theid} />:<KeeperForm keeper={currentUser} />)}
		</div>
	);
};