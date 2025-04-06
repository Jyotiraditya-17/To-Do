import { Link } from "react-router-dom";

export function Todo_Home() {

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:'500px'}}>
            <div className="d-flex" style={{width:'500px'}}>
                <Link to='/register' className="btn btn-dark w-50"> Register </Link>
                <Link to='/login' className="btn btn-warning mx-2 w-50"> Login </Link>
            </div>
        </div>
    )
}