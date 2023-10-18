import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../store/appContext';
import { useParams } from 'react-router-dom';
import stock_avatar from "../../img/avatar.jpg";
import '../../styles/bookings.css'

export const Bookings = () => {
    const params = useParams();
    const [bookings, setBookings] = useState([]);
    const {store, actions} = useContext(Context);

    useEffect(()=>{
        loadData()
    },[])

    async function loadData(){
        let response = await actions.getBookings(params.type, params.theid)
        setBookings(response.data)
    }
    function imgErrorHandler(e){
        console.log("HANDLING ERROR IMAGE")
        e.target.src = stock_avatar
    }
    function formatDate(date){
        let jsDate = new Date(date)
        return jsDate.getDate()+"-"+(jsDate.getMonth()+1).toString()+"-"+jsDate.getFullYear()+" "+jsDate.getHours()+":"+(jsDate.getMinutes() < 10 ? '0' : '') + jsDate.getMinutes()
    }
    return (
        <div className='container-fluid text-left'>
            <div className='d-flex flex-row flex-nowrap gap-3 align-items-center card-container'>
                {bookings.length<1?"Sin reservas":
                bookings.map((booking, index)=>{
                    return(
                        <div className="card rounded" style={{width: "16rem"}} key={index}>
                            <img onError={imgErrorHandler} src={(params.type=="owner"?booking.keeper.profile_pic:booking.pets[0].profile_pic)} className="card-img-top rounded-img object-fit-cover p-2" />
                            <div className="card-body">
                                <h5 className='card-title'>{booking.service}</h5>
                                <p className="card-text">Inicio: <strong>{formatDate(booking.start_date)}</strong></p>
                                <p className="card-text">Fin: <strong>{formatDate(booking.end_date)}</strong></p>
                                {(params.type=='owner'?
                                <p>Cuidador(a): {booking.keeper.first_name+" "+booking.keeper.last_name}</p>:
                                <p>Dueño(a): {(Array.isArray(booking.pets)?`${booking.pets[0].owner_first_name+" "+booking.pets[0].owner_last_name}`:"Sin mascotas")}</p>
                                )}
                                <hr className='my-1'></hr>
                                <small>Costo: ${booking.cost}</small>
                            </div>
                        </div>
                )})
            }
            </div>
        </div>
    )
}


{/* <div className="card mb-3"  key={index}>
    <div className="row g-0">
        <div className="col-md-4">
            <img src={booking.keeper.profile_pic} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">Paseo a mascotas</h5>
                <p className="card-text">Fecha inicial: {booking.start_date}</p>
                <p className="card-text">Fecha final: {booking.end_date}</p>
                <p className="card-text">Cuidador: {booking.keeper.first_name}</p>
                <p className="card-text"><small className="text-body-secondary">Total: $15</small></p>
            </div>
        </div>
    </div>
</div> */}