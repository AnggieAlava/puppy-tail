import React from "react";
import { useParams } from "react-router-dom";
import { KeeperForm } from "../component/keeperForm";
import { KeeperInfo } from "../component/keeperInfo";
import { OwnerInfo } from "../component/ownerInfo";
import { Pets } from "../component/pets";
import { Bookings } from "../component/bookings";
import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/tabs.css"

export const Profile = ({ keeper }) => {
	const params = useParams();
	const {store} = useContext(Context)

	return (
		<div className="container-fluid px-0">
			
			{(store.userInfo.userId===store.currentUser.id)&&store.userInfo.user_type=='owner'?
			<div>
				<ul className="nav nav-tabs d-flex justify-content-center align-items-center bg-custom" id="pills-tab" role="tablist">
					<li className="nav-item" role="presentation">
						<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i className="now-ui-icons shopping_shop"></i> Perfil</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><i className="now-ui-icons shopping_cart-simple"></i> Reservas</button>
					</li>
				</ul>
				<div className="tab-content" id="pills-tabContent">
					<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
					{/* PROFILE */}
						<div className="bg-custom pb-3">
							{(params.type == 'owner' ? <OwnerInfo /> : <KeeperInfo />)}
						</div>
					{/* END OF PROFILE */}
					</div>
					<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
						{/* BOOKINGS */}
						<div className="bg-custom pb-3">
							<Bookings />
						</div>
						{/* END OF BOOKINGS */}
					</div>
				</div>
			</div>
			:
			<div className="bg-custom pb-3">
				{(params.type == 'owner' ? <OwnerInfo /> : <KeeperInfo />)}
			</div>
			}
				<img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" />


			{/* FIN */}
			
			{/* Componente condicional aqui, pasar user type por props */}
			{(params.type == 'owner' ? < Pets owner_id={params.theid} /> : store.userInfo.user_type=="owner"?<KeeperForm keeper={keeper} />:store.userInfo.user_type=="keeper"?<Bookings />:"Registrate o inicia sesion para interactuar con el cuidador")}

		</div>
	);
};
