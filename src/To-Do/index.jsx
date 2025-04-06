import { BrowserRouter, Route, Routes , Link} from 'react-router-dom';
import './todo-index.css';
import { Todo_Home } from './home';
import { TodoLogin } from './login';
import { TodoRegister } from './register';
import { Dashboard } from './user-dashboard';
import { AddAppointment } from './addAppointment';
import { DeleteAppointment } from './deleteAppointment';
import { EditAppointment } from './editAppointment';

export function To_Do() {

    return(
        <div className="bg-image">
            <BrowserRouter>
                <header className='p-2 text-center text-white'>
                    <h1> <Link to='/' className='btn btn-light w-50'> To-Do App </Link> </h1>
                </header>

                <section>
                    <Routes>
                        <Route path="/" element={<Todo_Home />} />
                        <Route path='login' element={<TodoLogin />} />
                        <Route path='register' element={<TodoRegister />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='add-appointment' element={<AddAppointment />} />
                        <Route path='delete-appointment/:id' element={<DeleteAppointment />} />
                        <Route path='edit-appointment/:id' element={<EditAppointment />} />
                    </Routes>
                </section>
            </BrowserRouter>
        </div>
    )
}