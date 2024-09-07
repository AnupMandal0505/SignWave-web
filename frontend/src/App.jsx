//Css....................................................
import './App.css'

//Dependencies...........................................
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//Pages..................................................
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import VideoCall from './pages/VideoCall'
//Components............................................
// index.js
import '@fortawesome/fontawesome-free/css/all.min.css';
import Service from './pages/Service'
import SocketProvider from './Context/SocketProvider'
import Navbar from './components/Navbar'
import VideoCall2 from './pages/VideoCall2'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LiveAudioExtractor from './pages/LiveAudioExtractor'

function App() {
  return (

    <BrowserRouter>
      <SocketProvider>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signin' element={<><Navbar/><Signin /></>} />
          <Route path='/signup' element={<><Navbar/><Signup /></>} />
          <Route path='/service' element={<Service />} />
          <Route path='/audio' element={<LiveAudioExtractor />} />
          <Route path='/calltest' element={<>
            {/* <SocketProvider> */}
            <Navbar />
            <VideoCall />
            {/* </SocketProvider> */}
          </>} />
          <Route path='/call' element={<>
            {/* <SocketProvider> */}
            <Navbar />
            <VideoCall2 />
            {/* </SocketProvider> */}
          </>} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>

  )
}

export default App
