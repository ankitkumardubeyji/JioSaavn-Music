import { useState } from "react";
import useCurrentSong from "../contexts/CurrentSongContext";
function Image(props){
    const {updateSong,currentSong} = useCurrentSong();

    let songs = [
        {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"},
        {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",singer:"YO YO HONEY SINGH"},
        {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",singer:"Raftar"},
        {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",singer:"Badhshah"},
        {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",singer:"Raftar"},
        {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg",singer:"Jolu"},
        {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg",singer:"Neha Kakkar"},
        {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg",singer:"Jollu"},
        {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg",singer:"Nikk"},
        {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg",singer:"Ninja"},
    ]

    function update(e){
       console.log(songs[e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id]) 
       console.log(e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id)
       updateSong(songs[e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id])
    }
    


   

    console.log(props)
    return (
        <>
          <div className="box1" onClick={(e)=>update(e)} id={props.id}>
                        <img src= {props.src} alt=""/>
                        <p className="songName">{props.songName}</p>
                        <div className="layer">
                            <audio src={props.audiosrc} controls onClick={(e)=>update(e)}></audio>
                            <p><span></span></p>
                        </div>
                    </div>
        </>
      )
}

export default Image