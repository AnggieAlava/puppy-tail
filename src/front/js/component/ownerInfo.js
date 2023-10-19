import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import stock_avatar from "../../img/avatar.jpg";
import "../../styles/profile.css"

export const OwnerInfo = ({ owner }) => {

    const params = useParams();
    const { store, actions } = useContext(Context);
    const [avatar, setAvatar] = useState(stock_avatar)
    const [currentUser, setUser] = useState({})

    useEffect(() => {
        loadData()
    }, [])
    async function loadData() {
        let resp = actions.getOwner(params.theid)
        setAvatar(resp.profile_pic)
    }
    function fillForm() {
        setAvatar(store.currentUser.profile_pic)
        setUser(store.currentUser)
    }
    function imgErrorHandler(e) {
        e.target.src = stock_avatar
    }

    async function updateUser() {
        let obj = {
            id: store.currentUser.id,
            first_name: document.getElementById("firstNameInput").value,
            last_name: document.getElementById("lastNameInput").value,
            description: document.getElementById("descriptionInput").value,
            location: document.getElementById("locationInput").value,
        }
        actions.updateOwner(obj);
        if (avatar != store.currentUser.profile_pic) {
            const formData = new FormData()
            formData.append("avatar", document.getElementById("avatarImg").files[0])
            actions.uploadPicture(formData, store.currentUser.id)
        }
    }

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-end">
                <button type="button" className="btn btn-green" data-bs-toggle="modal" data-bs-target="#editUser" onClick={fillForm}>Editar</button>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="editUserLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content border-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editUserLabel">Editar</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body textLeft">
                                {/* FORM BODY */}
                                <form id="formID">
                                    <div className="mb-3 d-flex justify-content-center">
                                        <div className="ratio ratio-1x1 w-75">
                                            <img onError={imgErrorHandler} src={avatar} className="card-img-top rounded-circle object-fit-cover" alt="..." />
                                        </div>
                                    </div>
                                    <div className="text-center mb-3">
                                        <input type="file" name="avatar" id="avatarImg" onChange={(event) => setAvatar(URL.createObjectURL(event.target.files[0]))} hidden />
                                        <label className="btn btn-green" htmlFor="avatarImg">Seleccionar foto</label>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="firstNameInput" className="form-label">Nombre</label>
                                            <input type="text" className="form-control" id="firstNameInput" aria-describedby="nameHelp" defaultValue={currentUser.first_name} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="lastNameInput" className="form-label">Apellido</label>
                                            <input type="text" className="form-control" id="lastNameInput" aria-describedby="nameHelp" defaultValue={currentUser.last_name} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nameInput" className="form-label">Ubicacion</label>
                                        <input type="text" className="form-control" id="locationInput" aria-describedby="nameHelp" defaultValue={currentUser.location} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripcion</label>
                                        <textarea className="form-control" id="descriptionInput" rows="4" defaultValue={currentUser.description}></textarea>
                                    </div>
                                </form>
                                {/* END OF FORM BODY */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-orange" data-bs-dismiss="modal" onClick={() => setAvatar(currentUser.profile_pic)}>Cancelar</button>
                                <button type="submit" className="btn btn-green" data-bs-dismiss="modal" onClick={updateUser}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Fin de modal */}
            </div>
            <div className="mb-3 d-flex justify-content-center" >
                <div className="ratio ratio-1x1" style={{ maxWidth: "350px" }}>
                    <img onError={imgErrorHandler} src={store.currentUser.profile_pic} className="card-img-top rounded-circle object-fit-cover" alt="..." />
                </div>
            </div>
            <div className="row d-flex text-center mb-2">
                <h2>{store.currentUser.first_name}</h2>
            </div>
            <div className="d-flex flex-row flex-wrap text-center mb-2">
                <div className="col">
                    <h5><i className="fa-solid fa-location-dot"></i><strong> Ubicacion</strong></h5>
                    <h6>{store.currentUser.location}</h6>
                </div>
            </div>
            <div className="d-block" style={{ textAlign: "left" }}>
                <h3 className="mb-0"><strong>Sobre mi</strong></h3>
                <h6 className="m-0 pb-2">{(store.currentUser.description == ""  || null ? "Sin descripción" : store.currentUser.description)}</h6>
            </div>
        </div>
    );
};
