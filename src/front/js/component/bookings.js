import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';
import stock_avatar from "../../img/avatar.jpg";
import '../../styles/bookings.css'

export const Bookings = () => {
    const params = useParams();
    const [bookings, setBookings] = useState([]);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        let response = await actions.getBookings(params.type, params.theid)
        setBookings(response.data)
    }
    function imgErrorHandler(e) {
        e.target.src = stock_avatar
    }
    function formatDate(date) {
        let jsDate = new Date(date)
        return jsDate.getUTCDate() + "-" + (jsDate.getUTCMonth() + 1).toString() + "-" + jsDate.getUTCFullYear() + " " + jsDate.getUTCHours() + ":" + (jsDate.getUTCMinutes() < 10 ? '0' : '') + jsDate.getUTCMinutes()
    }
    return (
        <div className='container-fluid text-left'>
            <div className='d-flex flex-row flex-nowrap gap-3 align-items-center booking-card-container'>
                {bookings.length < 1 ? "Sin reservas" :
                    bookings.map((booking, index) => {
                        return (
                            <div className="card booking-custom-card rounded" style={{ width: "16rem" }} key={index}>
                                <img onError={imgErrorHandler} src={(params.type == "owner" ? booking.keeper.profile_pic : booking.pets[0].profile_pic)} className="card-img-top booking-rounded-img object-fit-cover p-2" />
                                <div className="card-body booking-body-custom">
                                    <h5 className='card-title'>{booking.service}</h5>
                                    <p className="card-text">Inicio: <strong>{formatDate(booking.start_date)}</strong></p>
                                    <p className="card-text">Fin: <strong>{formatDate(booking.end_date)}</strong></p>
                                    {(params.type == 'owner' ?
                                        <p>Cuidador(a): {booking.keeper.first_name + " " + booking.keeper.last_name}</p> :
                                        <p>Dueño(a): {(Array.isArray(booking.pets) ? `${booking.pets[0].owner_first_name + " " + booking.pets[0].owner_last_name}` : "Sin mascotas")}</p>
                                    )}
                                    <hr className='my-1'></hr>
                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                        <small>Costo: ${booking.cost}</small>
                                        {(store.userInfo.user_type == 'owner' ?
                                            <a href={`https://api.whatsapp.com/send?phone=${booking.keeper.phone_number}`} target='_blank'><i class="fa-brands fa-whatsapp fa-xl"></i></a>
                                            : "")}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}