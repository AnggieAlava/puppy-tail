import { CLIENT_ID } from '../config/config'
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import "../../styles/checkout.css"

const Checkout = () => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const { store, actions } = useContext(Context);
    const { createPayment } = actions;
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const phoneNumber = store.currentUser.phone_number;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`;



    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `${store.currentUser.first_name}`,
                    amount: {
                        currency_code: "USD",
                        value: store.currentUser.hourly_pay,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, paypal_actions) => {
        return paypal_actions.order.capture().then(function (details) {
            const { payer } = details;
            console.log(details)
            console.log(actions)
            setSuccess(true);
            actions.createPayment(details)
            const { createPayment } = actions;

        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const handleGoBack = () => {
        window.history.back();
    };

    useEffect(() => {
        if (success) {
            openModal()
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);


    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="container-fluid wrap-checkout py-5">
                <div className="container d-flex justify-content-center align-items-center flex-column bg-checkout p-3 w-75">
                    <h5 className="p-3 text-center">Por favor confirma <br />la informacion de tu reserva</h5>
                    <div className="product-img">
                        <img
                            src={store.currentUser.profile_pic}
                            alt=""
                            height="200"
                            width="200"
                            className="checkout-img p-2" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h6 className="m-2"><i className="fa-solid fa-user checkout-icon"></i> Cuidador: {store.currentUser.first_name} {store.currentUser.last_name}</h6>
                            <hr/>
                            <h6 className="m-2"><i className="fa-regular fa-calendar checkout-icon"></i> Desde: {store.dates.start_date} / {store.dates.start_hour} </h6>
                            <hr/>
                            <h6 className="m-2"><i className="fa-solid fa-calendar checkout-icon"></i> Hasta: {store.dates.end_date} / {store.dates.end_hour}</h6>
                            <hr/>
                            <h6 className="m-2"><i className="fa-solid fa-shop checkout-icon"></i> Reserva: {store.dates.service}</h6>
                            <hr/>
                            <h6 className="m-2"><i className="fa-solid fa-location-dot checkout-icon"></i> Ubicacion: {store.currentUser.location}</h6>
                            <hr/>
                        </div>
                        <div className="product-price-btn">
                            <h6 className="m-2"><i className="fa-brands fa-paypal checkout-icon"></i> Precio: {store.currentUser.hourly_pay}</h6>
                        </div>
                    </div>
                    <PayPalButtons
                        className="paypal-buttons"
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                    <button className='btn btn-orange' onClick={handleGoBack}>Cancelar</button>
                </div>
            </div>{showModal && (
                <div className="container-fluid">
                    <div className="container d-flex justify-content-center align-items-center flex-column ">
                        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                            <div className="modal-dialog modal-fullscreen" role="document">
                                <div className="modal-content modal-checkout">
                                    <div className="modal-header">
                                        <h6 className="modal-title"><i className="fa-solid fa-check exit-checkout"></i>Tu reserva fue exitosa</h6>
                                    </div>
                                    <div className="modal-body">
                                        <h6>Haz clic en el siguiente link para contactarte con tu cuidador</h6>
                                        <div className="d-flex justify-content-center align-items-center me-4" >
                                            <a href={`mailto:${store.currentUser.email}`} target="_blank">
                                                <button><i className="fa-solid fa-envelope"></i></button>
                                            </a>
                                            <a href={whatsappLink} target="_blank">
                                                <button><i className="fa-brands fa-whatsapp"></i></button>
                                            </a>
                                        </div>

                                        <h6><i className="fa-solid fa-user checkout-icon"></i> {store.currentUser.first_name} {store.currentUser.last_name}</h6>
                                        <hr/>
                                        <h6><i className="fa-solid fa-calendar-days checkout-icon"></i> {store.dates.start_date} {store.dates.end_date} {store.dates.start_hour} {store.dates.end_hour}</h6>
                                        <hr/>
                                        <h6><i className="fa-solid fa-earth-americas checkout-icon"></i> {store.currentUser.location}</h6>
                                        <hr/>
                                        <h6><i className="fa-solid fa-handshake checkout-icon"></i> {store.dates.service}</h6>
                                        <hr/>
                                        <h6><i className="fa-solid fa-dollar-sign checkout-icon"></i> {store.currentUser.hourly_pay}</h6>
                                    </div>
                                    <div className="modal-body">
                                    <button className="btn-green me-3  d-print-none"onClick={() => window.print()}>Imprimir</button>
                                        <Link to={"/profile/" + store.userInfo.user_type + "/" + store.userInfo.userId}>
                                            <button className="btn-green d-print-none">Ir a mi perfil</button></Link>
                                    </div>
                                    <div className="modal-footer">
                                        <Link to="/home"><button type="button" className="btn btn-orange d-print-none" onClick={closeModal}>
                                            Cerrar
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PayPalScriptProvider>

    );
}
export default Checkout;