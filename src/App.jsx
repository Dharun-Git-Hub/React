import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import MainMenu from './components/MainMenu/MainMenu'
import TextEditor from './components/TextEditor/TextEditor'
import Coder from './components/Coder/Coder'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import Login from './components/Login/Login'
import ImageGen from './components/ImageGen/ImageGen'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login /> } />
      <Route path="/main" element={ <> <Sidebar /><Main /> </> } />
      <Route path="/mainmenu" element={<MainMenu/>} />
      <Route path="/text-editor" element={<TextEditor />} />
      <Route path="/coder" element={<Coder />} />
      <Route path="/musicplayer" element={<MusicPlayer />} />
      <Route path="/imagegen" element={<ImageGen />} />
     </Routes>
     </Router>
    )
}

export default App