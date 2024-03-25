import useCurrentSong from "../contexts/CurrentSongContext";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import { useState } from "react";



function Footer(){

    const [play,setPlay] = useState(true)
    const {currentSong} = useCurrentSong()
    return(
        <>
        <div className="foot">
            <input type="range" name="range" id="myProgressBar" min="0" value="0" max="100" id="myProgressBar"/>
            <div className="footer">
                <div className="songInfo">
                    <img src= {currentSong.coverPath} width="42px" alt="" id="gif"/>
                    <div className="titles">
                        <p id="masterSongName">{currentSong.songName}<br/></p>
                        <p id="singer">{currentSong.singer}</p>
                    </div>
                     
                </div>

                <div className="song-control">
                   <SkipPreviousIcon />
                   {!play && (  <PlayArrowIcon onClick={()=>setPlay(true)}/>) }
                   {play && (<PauseIcon onClick = {()=> setPlay(false)} />) }
                   <SkipNextIcon id= "next" />
                  
                </div>

                <div className="time-duration">
                    <p><span className="timepassed"></span>/ <span className="timeduration"></span></p>
                    <a href="ind.html"><i className="fa-solid fa-ellipsis"></i></a>
                    <i className="fa-sharp fa-solid fa-volume"></i>
                    <i className="fa-solid fa-arrow-down-left-and-arrow-up-right-to-center"></i>

                </div>
        </div>
</div>
        
        </>
    )
}


export default Footer;