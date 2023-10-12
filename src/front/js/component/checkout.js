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

    useEffect(() => {
        if (success) {
            openModal()
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className="container-fluid">
                <div className="container d-flex justify-content-center align-items-center flex-column">
                    <h4 className="p-5">Por favor confirma los datos de tu compra</h4>
                    <div className="product-img">
                        <img
                            src={store.currentUser.profile_pic}
                            alt=""
                            height="300"
                            width="300" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h6>{store.currentUser.first_name} {store.currentUser.last_name}</h6>
                            <h6>{store.currentUser.location}</h6>
                        </div>
                        <div className="product-price-btn">
                            <h6>{store.currentUser.hourly_pay}</h6>
                           
                        </div>
                    </div>
                <PayPalButtons
                    className="paypal-buttons"
                    style={{ layout: "vertical"}}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
                </div>
               

            </div>{showModal && (
                <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-fullscreen" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title"><i className="fa-solid fa-check"></i>Tu reserva fue exitosa</h6>
                                <h6>Haz clic en el siguiente boton para que tu y tu cuidador confirmen los detalles de la cita </h6>
                                <a href={`mailto:${store.currentUser.email}`} target="_blank">
                                    <button><i className="fa-solid fa-envelope"></i></button>
                                </a>
                            </div>
                            <div className="modal-body">
                                <h6><i className="fa-solid fa-user"></i>{store.currentUser.first_name} {store.currentUser.last_name}</h6>
                                <h6><i className="fa-solid fa-calendar-days"></i>Usuario fechas y horas de reserva</h6>
                                <h6><i className="fa-solid fa-earth-americas"></i>{store.currentUser.location}</h6>
                                <h6><i className="fa-solid fa-handshake"></i>Usuario servicio</h6>
                                <h6><i className="fa-solid fa-dollar-sign"></i>{store.currentUser.hourly_pay}</h6>
                            </div>
                            <div className="modal-body">
                                   <Link to="/home"><button>Home</button></Link>
                                   <Link  to={"/profile/" + store.userInfo.user_type + "/" + store.userInfo.userId}>
                                   <button>Ir a mi perfil</button></Link>
                
                            </div>
                            <div className="modal-footer">
                            <Link  to={"/profile/" + store.userInfo.user_type + "/" + store.userInfo.userId}><button type="button" className="btn btn-danger" onClick={closeModal}>
                                    Cerrar
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PayPalScriptProvider>

    );
}

export default Checkout;