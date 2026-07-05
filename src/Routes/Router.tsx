import { Routes, Route } from 'react-router-dom'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Overview from '../sections/Overview/Overview'
import Layout from '../sections/Layouts/Layout'
import Deshboard from '../sections/Deshboard'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/dashboard' element={<Layout/>}>
                <Route index element={<Deshboard/>}/>
            </Route>
        </Routes>
    )
}
