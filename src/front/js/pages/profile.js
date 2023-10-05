import React from "react";
import { useParams } from "react-router-dom";
import { KeeperForm } from "../component/keeperForm";
import { KeeperInfo } from "../component/keeperInfo";
import { OwnerInfo } from "../component/ownerInfo";
import { Pets } from "../component/pets";

export const Profile = ({ keeper }) => {
	const params = useParams();

	return (
		<div className="text-center container w-75 my-2">
			{(params.type == 'owner' ? <OwnerInfo /> : <KeeperInfo />)}
			<hr className="mt-4 mb-2" />
			{/* Componente condicional aqui, pasar user type por props */}
			{(params.type == 'owner' ? < Pets owner_id={params.theid} /> : <KeeperForm keeper={keeper} />)}
		</div>
	);
};