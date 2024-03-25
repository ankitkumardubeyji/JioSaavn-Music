/* DOUBT TO BE RESOLVED
1. HOW TO ADD EVENT LISTENERS ON THE REACT ELEMENTS OTHER THAN onClick
2. HOW TO PROPOGATE THE EVENT FROM PARENT TO CHILD VIA ONCLICK IN REACT

*/


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from "./componets/Home"
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Music from './componets/SongAlbum'
import {Route} from "react-router-dom"
import Layout from "./Layout"
import SongAlbum from './componets/SongAlbum'
import { CurrentSongProvider } from './contexts/CurrentSongContext'
function App() {

  const [currentSong,setCurrentSong] = useState({songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"});
  const [currentAlbumSong,setCurrentAlbumSong] = useState({songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"})
  const updateSong = (song)=> {
    setCurrentSong(song)}

  const updateCurrentAlbumSong= (song)=>{
    setCurrentSong(song)
  } 


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<Layout/>}>
        <Route path = '' element = {<Home/>}/>
        <Route path='music' element = {<SongAlbum/>}/>
    </Route>
  )
)


  return (
    <>
      <CurrentSongProvider value= {{updateSong,currentSong,currentAlbumSong,updateCurrentAlbumSong}}>
        <RouterProvider router={router}></RouterProvider>
      </CurrentSongProvider>
     
    </>
  )
}

export default App
