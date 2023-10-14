import React from "react";
import { useParams } from "react-router-dom";
import { KeeperForm } from "../component/keeperForm";
import { KeeperInfo } from "../component/keeperInfo";
import { OwnerInfo } from "../component/ownerInfo";
import { Pets } from "../component/pets";
import "../../styles/tabs.css"

export const Profile = ({ keeper }) => {
	const params = useParams();

	return (
		<div className="container-fluid px-0">
			
			<ul class="nav nav-tabs d-flex justify-content-center align-items-center bg-custom" id="pills-tab" role="tablist">
				<li class="nav-item" role="presentation">
					<button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i class="now-ui-icons shopping_shop"></i> Perfil</button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"><i class="now-ui-icons shopping_cart-simple"></i> Reservas</button>
				</li>
			</ul>
				<div class="tab-content" id="pills-tabContent">
				<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
				{/* PROFILE */}
					<div className="bg-custom">
						{(params.type == 'owner' ? <OwnerInfo /> : <KeeperInfo />)}
					</div>
					<img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" />
				{/* END OF PROFILE */}
				</div>
				<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
				{/* BOOKINGS */}
				<div className="bg-custom">
					<div className="container">
						<h2 className="m-0 text-center">Reservas</h2>
					</div>
				</div>
				<img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" />
				{/* END OF BOOKINGS */}
				</div>
			</div>


			{/* FIN */}
			
			{/* Componente condicional aqui, pasar user type por props */}
			{(params.type == 'owner' ? < Pets owner_id={params.theid} /> : <KeeperForm keeper={keeper} />)}
			<div className="text-center container pt-3">
				
			</div>
		</div>
	);
};
