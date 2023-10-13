import React from "react";
import { useParams } from "react-router-dom";
import { KeeperForm } from "../component/keeperForm";
import { KeeperInfo } from "../component/keeperInfo";
import { OwnerInfo } from "../component/ownerInfo";
import { Pets } from "../component/pets";

export const Profile = ({ keeper }) => {
	const params = useParams();

	return (
		<div className="container-fluid px-0">
			<div className="bg-custom">
				{(params.type == 'owner' ? <OwnerInfo /> : <KeeperInfo />)}
			</div>
			<img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" class="bottom-squiggle" />
			{/* Componente condicional aqui, pasar user type por props */}
			{(params.type == 'owner' ? < Pets owner_id={params.theid} /> : <KeeperForm keeper={keeper} />)}
			<div className="text-center container pt-3">
				
			</div>
		</div>
	);
};