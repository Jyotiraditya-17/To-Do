import { useCookies } from "react-cookie"
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export function AddAppointment() {

    const [cookies , setCookie , removeCookie] = useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik( {
        initialValues: {
            title : '' ,
            date : '',
            userid : cookies['userid']
        } ,

        validationSchema : yup.object({
            title : yup.string().required('Please enter title').min(7),
            date : yup.string().required('Please enter date'),
        }) ,

        onSubmit : (appointment) => {
            axios.post(`http://127.0.0.1:3370/appointments` , appointment)
            .then( () => {
                console.log('appointment added');
            })
            navigate('/dashboard');
        }
    })

    return(
        <div className="container-fluid bg-light w-50 p-4">
            <h3>
                Add new Appointment - {cookies['userid']}
            </h3>

            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt> Title </dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} className="form-control" name="title" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.title} </dd>

                    <dt> Date </dt>
                    <dd>
                        <input type="date" onChange={formik.handleChange} className="form-control" name="date" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.date} </dd>
        
                </dl>

                <button type="submit" className="btn btn-primary"> Add </button>
                <Link to='dashboard' className="btn btn-danger mx-2"> Cancel </Link>
            </form>
        </div>
    )
}