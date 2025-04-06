import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";


export function DeleteAppointment() {

    let params = useParams();

    let naviagte = useNavigate();

    const [appointment , setAppointment] = useState({id:0 , title:'' , date:'' , userid:''});

    useEffect( () => {
        axios.get(`http://127.0.0.1:3370/appointments/${params.id}`)
        .then(response => {
            setAppointment(response.data);
        })
    })

    function handleDelete() {
        axios.delete(`http://127.0.0.1:3370/appointments/${params.id}`)
        .then( () => {
            console.log('appointment deleted..');
        })
        naviagte('/dashboard');
    }

    return(
        <div className="container-fluid bg-light w-50 p-4">
            <h3> Delete Appointment </h3>

            <h5> Are you sure want to delete ? <br/><br/> {appointment.title} </h5>

            <button onClick={handleDelete} className="btn btn-danger"> Yes </button>
            <Link to='/dashboard' className='btn btn-warning mx-2'> Cancel </Link>
        </div>
    )
}