import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { lazy,Suspense } from 'react'
const Login =lazy(()=>import('./pages/public/Login'))
const Register=lazy(()=>import('./pages/public/Register'))
const TrainerDashboard=lazy(()=>import('./pages/trainer/TrainerDashboard'))
const UserDashboard=lazy(()=>import('./pages/user/UserDashboard'))


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>....Loading</div>}>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          {/* admin route start */}
          {/* <Route path='/admindashboard' element={<AdminDashboard/>}></Route> */}
          {/* admin route end */}

          {/* trainer dashboard start */}
          <Route path='/trainerdashboard' element={<TrainerDashboard/>}></Route>
          {/* learner dashboard start */}
          <Route path='/userdashboard' element={<UserDashboard/>}></Route>
        </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App