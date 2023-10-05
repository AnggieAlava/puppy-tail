import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


//Calendar use
const ValuePiece = Date | null;
const Value = ValuePiece | [ValuePiece, ValuePiece];

function getDate() {
  let today = new Date()
  return today
}

export const KeeperForm = ({ }) => {
  const { store, actions } = useContext(Context)
  //Calendar use
  const [value, onChange] = useState([]);
  const params = useParams();
  const keeper = useState(JSON.parse(localStorage.getItem('keeper')))
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  return (
    <div className="container" id="calendar">
      <div className="row">
        <div className="col-auto">
          {/* Dos columnas principales */}
          <div style={{ textAlign: "left" }}>
            <div className="d-block">
              <small>Service fee</small>
              <p>{(store.currentUser.hourly_pay ? "$" + store.currentUser.hourly_pay + "/hour" : "No service fee established yet for " + store.currentUser.first_name)}</p>
            </div>
            <div>
              <form>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Availability
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body sample_container_content">
                        <div className="row">
                          <div className="col">
                            <Calendar onChange={onChange} minDate={getDate()} selectRange={true} returnValue="range" value={value} />
                          </div>
                          <div className="col">
                            {value.map((date, index) => {
                              return (
                                <div index={index}>
                                  {((index == 0) ? (`Start date: ${date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString()}`) : (`End date: ${date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString()}`))}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className="ml-auto mt-4">

        <Link to={`/checkout/keeper/${store.currentUser.id}`}>
          <button className="btn btn-dark btn-lg" role="button">Book this keeper</button>
        </Link>
      </div>
    </div>
  );
};
//console.log((index==0)?(`Start date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`):(`End date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`))
