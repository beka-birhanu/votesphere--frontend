import { Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import DashBoard from './components/groupDashboard/dashboard';
import PrivateRoute from './components/route/privateRoute';
import Home from './components/route/home';

function App() {
    return (
        <Routes>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/login' element={<SignIn />} />
            <Route
                path='/dashboard'
                element={
                    <PrivateRoute>
                        <DashBoard />
                    </PrivateRoute>
                }
            />
            <Route path='/' element={<Home></Home>} />
        </Routes>
    );
}

export default App;
