import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export function EditAppointment() {

    const [appointment , setAppointment] = useState({id:0 , title:'' , date:'' , userid:''});

    let params = useParams();

    let navigate = useNavigate();

    const formik = useFormik( {
        initialValues: {
            id : appointment.id ,
            title: appointment.title ,
            date: appointment.date ,
            userid : appointment.userid
        } ,

        onSubmit : (appointment) => {
            axios.put(`http://127.0.0.1:3370/appointments/${params.id}` , appointment)
            .then( () => {
                console.log("Updated..")
            })
            navigate('/dashboard');
        } ,

        enableReinitialize : true
    })


    useEffect( () => {
        axios.get(`http://127.0.0.1:3370/appointments/${params.id}`)
        .then( response => {
            setAppointment(response.data);
        })
    } , [])


    return(
        <div className="container-fluid bg-light w-50 p-4">
            <h3> Edit Appointment </h3>

            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt> Title </dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} value={formik.values.title} className="form-control"  name="title" placeholder="Enter title"/>
                    </dd>

                    <dt> Date </dt>
                    <dd>
                        <input type="date" onChange={formik.handleChange} value={formik.values.date} className="form-control" name="date" />
                    </dd>
    
                </dl>

                <button type="submit" className="btn btn-success mx-2"> Save </button>
                <Link to='/dashboard' className="btn btn-danger"> Cancel </Link>
            </form>
        </div>
    )
}