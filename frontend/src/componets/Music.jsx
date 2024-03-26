
import useCurrentSong from "../contexts/CurrentSongContext";

function Music({src,songName,singer,id}){
    const {updateSong,currentSong,updateCurrentAlbumSong,musicControl} = useCurrentSong();

    let songs= [
        {songName:"Desi Kalakar" ,filepath:"songs/12.mp3" , coverPath:"covers/1.jpg" ,singer:'Honey Singh,Neha Kakkar'},
        {songName:"I am Your Dj Tonight" ,filepath:"songs/15.mp3" , coverPath:"covers/2.jpg", singer:'Honey Singh,Badhshah'},
        {songName:"Love Dose " ,filepath:"songs/14.mp3" , coverPath:"covers/3.jpg", singer:'Honey Singh,Raftaar'},
        {songName:"Daftar Ki Girl " ,filepath:"songs/16.mp3" , coverPath:"covers/4.jpg", singer:'Honey Singh,Lil Golu'},
        {songName:"Stardom" ,filepath:"songs/18.mp3" , coverPath:"covers/5.jpg", singer:'Yo Yo Honey Singh'},
        {songName:"Brown Rang" ,filepath:"songs/11.mp3" , coverPath:"covers/6.jpg", singer:'Yo Yo Honey Singh'},
        {songName:"Dope Shope" ,filepath:"songs/19.mp3" , coverPath:"covers/7.jpg", singer:'Yo Yo Honey Singh,Astah Gill'},
        {songName:"Blue Eyes" ,filepath:"songs/13.mp3" , coverPath:"covers/8.jpg", singer:'Yo Yo Honey Singh,Justin'},
    ]
    function update(e){
        
        let index = e.target.parentElement.className==="song"?e.target.parentElement.id:e.target.id
        console.log(index)
        if(songs[index]===undefined || songs[index]===null ){
            console.log("here")
            return
        }
        console.log("edhar")
        updateCurrentAlbumSong(songs[index])
        updateSong(songs[e.target.parentElement.className==="song"?e.target.parentElement.id:e.target.id])
        musicControl(songs[index])
    }
    
    return(
        <>
           <div className="song" id={id} onClick={(e)=> update(e) }>
            <img src={src} className="active image"/>

            <div className="nonactive">
            <i className="far fa-3x fa-play-circle" id="playstate" ></i>
            </div>

            <img src="assets/playing.gif" alt="" className="gif nonactive"/>
            <div className="song-title">
                <h1 className="songName" onClick={(e)=>e.stopPropagation()}>{songName}</h1>
                <span className="singer">{singer}</span>
            </div>
            <i className="fa-regular fa-heart"></i>
            <span className="timestamp">5:34</span>
         </div>
        
        </>
    )
}

export default Music