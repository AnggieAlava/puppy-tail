import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";
import { KeeperForm } from "../component/keeperForm";
import  { Pets } from "../component/pets";

export const Profile = (props) => {
	const { store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState({})
	const params = useParams();
    
    let owner_id = params.theid;
    let user_type = params.type;

    useEffect(()=>{
        setUserInfo({
            name : "Lucy",
            description : `Pets are the main reason people require sitters and so their welfare is my main priority and I spend much of the time in their company at your home following your instructions meticulously.

            I have had numerous cats since I was young and am definitely a cat lover. Through house and pet sitting, I have had the pleasure of looking after and loving many cats, from young kittens to 22 year olds, all with different personalities and some requiring medication; as well as different breeds of dogs, from Labradors to miniature cavoodles, all whose company I thoroughly enjoyed. I also had Beau, my budgie, for quite a few years and taught him to talk! Libby, my sister, who sometimes accompanies me on sits, has had dogs for pets, from a German shepherd to a silky terrier, a cat and a budgie.`,
            experience : "2+ years",
            services : ["Dog walker", "Pet sitter"],
            location : "Miami, FL"
        })
    },[])

    function yearsExperience(b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        let today = new Date();
        let startDate = new Date(b);
        const utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        const utc2 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        //difference in days (eg. 360 days)
        let difference = Math.floor((utc1 - utc2) / _MS_PER_DAY);
        //Return first digit as string
        return (difference/365).toString().slice(0,1);
      }

    function updateUser(){
        //Services
        let arr = []
        if(document.getElementById('petWalker').checked) arr.push("Pet Walker");
        if(document.getElementById('petSitter').checked) arr.push("Pet Sitter");
        if(document.getElementById('partyPlanner').checked) arr.push("Party Planner");
        if(arr.length === 0) arr.push("No services yet");
        //Experience
        let xp = yearsExperience(document.getElementById('experienceInput').value);
        setUserInfo({
            name : document.getElementById('userNameInput').value,
            description : document.getElementById('descriptionInput').value,
            experience : xp+"+ years",
            services : arr,
            location : document.getElementById('locationInput').value
        })
    }

	return (
		<div className="text-center container w-75 my-2">
            <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#editUser" >Edit</button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="editUser" tabindex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editUserLabel">Edit</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        <div className="modal-body textLeft">
                            {/* FORM BODY */}
                            <form>
                                <div class="mb-3">
                                    <label for="nameInput" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="userNameInput" aria-describedby="nameHelp" defaultValue={userInfo.name}/>
                                </div>
                                <div class="mb-3">
                                    <label for="categoryInput" class="form-label">Start date (Experience)</label>
                                    <input type="date" class="form-control" id="experienceInput" defaultValue=""/>
                                </div>
                                <div class="mb-3">
                                    <label for="nameInput" class="form-label">Location</label>
                                    <input type="text" class="form-control" id="locationInput" aria-describedby="nameHelp" defaultValue={userInfo.location}/>
                                </div>
                                <div class="mb-3">
                                    <label for="flexSwitchCheckDefault" class="form-label">Services</label>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="petWalker" />
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Pet Walker</label>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="petSitter" />
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Pet Sitter</label>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="partyPlanner" />
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Party Planner</label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                    <textarea class="form-control" id="descriptionInput" rows="4" defaultValue={userInfo.description}></textarea>
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
                <img src={stock_avatar} style={{borderRadius:"50%", width:"auto", height:"35vh", objectFit:"contain"}}/>
            </div>
			<div className="row d-flex flex-row flex-wrap justify-content-between mb-2">
                <h2>{userInfo.name}</h2>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-around mb-2">
                <div className="d-block">
                    <p><strong>Experience</strong></p>
                    <p>{userInfo.experience}</p>
                </div>
                <div className="d-block">
                    <p><i class="fa-solid fa-location-dot"></i><strong> Location</strong></p>
                    <p>{userInfo.location}</p>
                </div>
                <div className="d-block">
                    <p><strong>Services</strong></p>
                    <ul style={{textAlign:"left"}}>
                        {(!Array.isArray(userInfo.services) ? "No services yet": userInfo.services.map((service, index)=> {return (
                            <li index={index}>{service}</li>
                        )}))}
                    </ul>
                </div>
            </div>
            <div className="d-block mb-2"  style={{textAlign:"left"}}>
                <h3><strong>About me</strong></h3>
                <p>{userInfo.description}</p>
            </div>
            <hr className="mt-4 mb-2" />
            {/* Componente condicional aqui, pasar user type por props */}
            {(user_type == user_type? < Pets owner_id={owner_id} />:<KeeperForm />)}
		</div>
	);
};
