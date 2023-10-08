import { CLIENT_ID } from '../config/config'
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const { store, actions } = useContext(Context);
    const { createPayment } = actions;


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
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            console.log(details)
            setSuccess(true);
            actions.createPayment(details)
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
                <div className="wrapper">
                    <div className="product-img">
                        <img
                            src={store.currentUser.profile_pic}
                            alt="Keeper"
                            height="520"
                            width="300" />
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>{store.currentUser.first_name} {store.currentUser.last_name}</h1>
                        </div>
                        <div className="product-price-btn">
                            <p>{store.currentUser.hourly_pay}</p>
                            <br></br>
                            <button className='buy-btn' type="submit" onClick={() => setShow(true)}>
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
                <br></br>
                {show ? (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}
            </div>
        </PayPalScriptProvider>
    );
}

export default Checkout