import React, { useContext, useState } from 'react';
import dogWalk from "../../img/dogWalk.png"
import dogShower from "../../img/shower.png"
import dogParty from "../../img/dogParty.png"
import "../../styles/ourServices.css"
import "../../styles/ourServices.css"

const OurServices = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Arreglo de keepers disponibles
    const keepers = [
        {
            title: 'Keeper 1',
            description: 'Descripción del Keeper 1.'
        },
        {
            title: 'Keeper 2',
            description: 'Descripción del Keeper 2.'
        },
        {
            title: 'Keeper 3',
            description: 'Descripción del Keeper 3.'
        },
        // Agrega más keepers aquí según sea necesario
    ];

    return (

<div className="container-fluid p-0 d-flex justify-content-center align-items-center services-wrap mt-5">
<h2 className="text-center mt-2 services-title w-100">Nuestros keepers</h2>
  {filteredKeepers.map((keeper, index) => (
    <div className="col p-4 " key={index}>
      <Link
        to={"/profile/keeper/" + keeper.id}
        onClick={() =>
          localStorage.setItem("keeper", JSON.stringify(keeper))
        }
        style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card">
          <img
            onError={imgErrorHandler}
            src={keeper.profile_pic}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {keeper.first_name} {keeper.last_name}
            </h5>
            <h6 className="card-text">{keeper.location}</h6>
            <p className="card-text">{keeper.description}</p>
          </div>
        </div>
      </Link>
    </div>
    
  )}
  </div>
  )
};

export default OurKeepers;