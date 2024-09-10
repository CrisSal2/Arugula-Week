import './App.css'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './containers/Home'
import About from './containers/About'
import MyWeek from './containers/MyWeek'
import GroceryList from './containers/GroceryList'
import SignIn from './containers/SignIn'

function App() {

  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/my-week' element={<MyWeek />} />
          <Route path='/grocery-list' element={<GroceryList />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
