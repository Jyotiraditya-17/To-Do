import axios from "axios"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom"

export function TodoLogin() {

    const [cookies , setCookie , removeCookie] = useCookies(['userid']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userid: "",
            password: "",
        } ,

        validationSchema : yup.object( {
            userid: yup.string().required("Please enter your username").min(4),
            password: yup.string().required("Please enter your password"),
        }) ,

        onSubmit : (user) => {
            axios.get(`http://127.0.0.1:3370/users`)
            .then(response => {
                let userdetails = response.data.find( item => item.name === user.userid);

                if(userdetails) {
                    if(user.password === userdetails.password) {
                        alert("Login Success..");
                        setCookie('userid' , userdetails.userid)
                        navigate('/dashboard');
                    }
                    else{
                        alert("Invalid Password..");
                    }
                }
                else{
                    alert("User does not exist..");
                }
            })
        }
    })

    return(
        <div className="container-fluid p-4 w-50 bg-light">
            <h3> User Login </h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt> User Id </dt>
                    <dd>
                        <input type="text" onChange={formik.handleChange} className="form-control" name="userid" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.userid} </dd>

                    <dt> Password </dt>
                    <dd>
                        <input type="password" onChange={formik.handleChange} className="form-control" name="password" />
                    </dd>
                    <dd className="text-danger"> {formik.errors.password} </dd>
                    
                </dl>

                <button className="btn btn-primary"> Login </button>

                <p>
                    New User <Link to='/register'> Register </Link>
                </p>
            </form>
        </div>
    )
}