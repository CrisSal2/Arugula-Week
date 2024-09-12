import './App.css'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './containers/Home'
import About from './containers/About'
import MyWeek from './containers/MyWeek'
import SignIn from './containers/SignIn'
import Dashboard from './containers/Dashboard'
import SignUp from './containers/SignUp'
import SignOut from './containers/SignOut'

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/my-week' element={<MyWeek />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-out' element={<SignOut />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
