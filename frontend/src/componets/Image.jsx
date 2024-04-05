import { useState } from "react";
import useCurrentSong from "../contexts/CurrentSongContext";
import { useSelector } from "react-redux";
function Image(props){
    console.log(props)
    const {updateSong,currentSong,musicControl} = useCurrentSong();
      let song = useSelector((state)=>state.song.songsData)
      
   
    console.log(song)

    let songs = [
        {id:0,songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"},
        {id:1,songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",singer:"YO YO HONEY SINGH"},
        {id:2,songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",singer:"Raftar"},
        {id:3,songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",singer:"Badhshah"},
        {id:4,songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",singer:"Raftar"},
        {id:5,songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg",singer:"Jolu"},
        {id:6,songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg",singer:"Neha Kakkar"},
        {id:7,songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg",singer:"Jollu"},
        {id:8,songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg",singer:"Nikk"},
        {id:9,songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg",singer:"Ninja"},
    ]

    function update(e){
        let index = e.target.parentElement.className==="box1"?e.target.parentElement.id:e.target.id
       console.log(songs[e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id]) 
       console.log(e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id)
       updateSong(song[e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id],index)
       musicControl(song[index])
       console.log(currentSong)
       
    }
    


   

    console.log(props)
    return (
        <>
          <div className="box1" onClick={(e)=>update(e)} id={props.id}>
                        <img src= {props.src} alt=""/>
                        <p className="songName">{props.songName}</p>
                        <div className="layer">
                           
                            <p><span></span></p>
                        </div>
                    </div>
        </>
      )
}

export default Image