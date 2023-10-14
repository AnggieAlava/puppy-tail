import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { HidePassword } from "../component/hidePassword"
import "../../styles/changePassword.css"
import Swal from "sweetalert2";

export const ChangePassword = () => {
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();
    const [error, setError] = useState(""); // Declaración de error
    const [searchParams] = useSearchParams();
    const [tokenPassword, setTokenPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password"); // Added to control input type

    useEffect(() => {
        // Leer el valor del parámetro "token" de la URL cuando se monta el componente
        const tokenFromURL = searchParams.get("token");

        // Almacenar el token en la variable de estado
        setTokenPassword(tokenFromURL);
    }, [searchParams]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

        // Toggle input type between "password" and "text"
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

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
        <>
        <div className="bottom-squiggle-wrapper container-fluid p-0"><img src="https://assets.website-files.com/64149f79022d0c5fc8ce46e8/64149f79022d0cc5c4ce4784_Bottom%20Squiggle.svg" loading="lazy" width="1792" height="128" alt="" className="bottom-squiggle" /></div>
        <div className="container-fluid change-page text-center pt-5">
        <div className="bg-change p-5">
            <form className="pe-3" onSubmit={submitForm}>
            <h4>Cambiar Contraseña</h4>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type={passwordType} 
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
                        type={passwordType} 
                        className="form-control"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        aria-describedby="emailHelp"
                        required
                    />
                    <button
                        type="button"
                        className="btn"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                    </button>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button id="btn-login" type="submit" className="btn btn-change btn-orange">
                    Cambiar Contraseña
                </button>
            </form>
        </div>
        </div>
        </>
    );
};