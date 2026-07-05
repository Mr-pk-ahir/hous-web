import { Routes, Route } from 'react-router-dom'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Overview from '../sections/Overview/Overview'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}
