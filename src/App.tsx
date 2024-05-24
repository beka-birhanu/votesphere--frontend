import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import DashBoard from './components/groupDashboard/dashboard';
import PrivateRoute from './components/route/privateRoute';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SignUp />} />
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
        </Routes>
    );
}

export default App;
