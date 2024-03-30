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
import Login from './componets/Login/Login'
import Register from './componets/Register/Register'
function App() {

  const [currentSong,setCurrentSong] = useState({songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"});
  const [play,setPlay] = useState(false)
  const [audioElement,setAudioElement] = useState(new Audio('songs/1.mp3'))
  const [currentAlbumSong,setCurrentAlbumSong] = useState({songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"})

  const updateSong = (song)=> {
    setCurrentSong(song)}

  const updateCurrentAlbumSong= (song)=>{
    setCurrentSong(song)
    setCurrentAlbumSong(song)
    
  } 

  const musicControl = (song) =>{
    console.log("chalo humare yaha to aaya ")
    console.log(song)
    const currentAudio = audioElement.src.substring(audioElement.src.lastIndexOf('/')+1,audioElement.src.length)
    const newAudio = song.filePath.substring(song.filePath.lastIndexOf('/')+1,song.filePath.length)
      
    // case if the audio that has been paused has been played again
      if(play==false && currentAudio == newAudio){
          audioElement.play()  
          setPlay(true)
      }

      // if audio is being played now and new audio has been clicked 
      else if(currentAudio!=newAudio){
        console.log("edhar bhi phuch hi gya tha ")
        audioElement.src= song.filePath
        setAudioElement(audioElement);
        console.log(audioElement.src)
        audioElement.play()
        setPlay(true)

      }

      // if the audio being currently played is being clicked again 
      else if(play==true && currentAudio == newAudio){
        audioElement.pause()
        setPlay(false)
      }

    }


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<Layout/>}>
        <Route path = '' element = {<Home/>}/>
        <Route path="login" element = {<Login/>}/>
        <Route path='music' element = {<SongAlbum/>}/>
        <Route path='register' element = {<Register/>}/>
    </Route>
  )
)


  return (
    <>
      <CurrentSongProvider value= {{updateSong,currentSong,currentAlbumSong,updateCurrentAlbumSong,play,musicControl,audioElement}}>
        <RouterProvider router={router}></RouterProvider>
      </CurrentSongProvider>
     
    </>
  )
}

export default App
