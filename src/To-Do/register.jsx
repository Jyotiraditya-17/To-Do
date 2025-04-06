import axios from "axios"
import { useFormik } from "formik"
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom"

export function TodoRegister() {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
            email: ""
        } ,

        validationSchema: yup.object().shape({
            name : yup.string().required('Name is required').min(4) ,
            password : yup.string().required('Password is required') ,
            email : yup.string().email('Invalid email').required('Email is required')
        }) ,

        onSubmit : (user) => {
            axios.post(`http://127.0.0.1:3370/users` , user)
            .then( () => {
                console.log("Posted..")
            })
            alert('Registered Successfully..')
            navigate('/login')
        }
    })
    return(
        <div className="container-fluid p-4 w-50 bg-light">
            <h3> Register User </h3>

            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt> User Id </dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} className="form-control" name="name" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.name} </dd>

                    <dt> Password </dt>
                    <dd>
                        <input type="password" onChange={formik.handleChange} className="form-control" name="password" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.password} </dd>

                    <dt> Email </dt>
                    <dd>
                        <input type="email" onChange={formik.handleChange} className="form-control" name="email" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.email} </dd>

                </dl>

                <button className="btn btn-warning"> Register </button>

                <p>
                    Existing User <Link to='/login'> login </Link>
                </p>
            </form>
        </div>
    )
}