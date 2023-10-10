import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../../styles/changePassword.css"
import Swal from "sweetalert2";
export const ChangePassword = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();
    const [error, setError] = useState(""); // Declaración de error
    const [searchParams] = useSearchParams();
    const [tokenPassword, setTokenPassword] = useState("");

    useEffect(() => {
        // Leer el valor del parámetro "token" de la URL cuando se monta el componente
        const tokenFromURL = searchParams.get("token");

        // Almacenar el token en la variable de estado
        setTokenPassword(tokenFromURL);
    }, [searchParams]);

    const submitForm = async (event) => {
        event.preventDefault();

        const password = event.target.password.value;
        const passwordConfirm = event.target.passwordConfirm.value;

        if (password !== passwordConfirm) {
            setError("Las contraseñas no coinciden");
            return;
        } else {
            setError(""); // Limpia el mensaje de error si las contraseñas coinciden.
        }

        let data = new FormData(event.target);
        let resp = await actions.changePasswordWithToken(tokenPassword, data.get("password"));

        if (resp.status === 200) {

            Swal.fire({
                icon: "success",
                title: "Contraseña modificada",
                text: "Has cambiado tu contraseña!",
            });
            navigate("/login");
        }
    };

    return (
        <div className="container-fluid change-page text-center pt-5">

            <h2>Cambiar Contraseña</h2>

            <form className="pe-3" onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        aria-describedby="emailHelp"
                        required
                    />
                    <label htmlFor="passwordConfirm" className="form-label">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>} {/* Muestra el mensaje de error si existe */}
                <button id="btn-login" type="submit" className="btn btn-change">
                    Cambiar Contraseña
                </button>
            </form>
        </div>

    );

};