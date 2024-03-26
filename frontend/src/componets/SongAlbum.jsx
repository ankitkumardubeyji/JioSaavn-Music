import useCurrentSong from "../contexts/CurrentSongContext";
import Music from "./Music"
function SongAlbum(){
    const {currentAlbumSong} = useCurrentSong()
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

    return(
        <>
      
    <div className="rowi">
        <div className="left">
            <div className="image">
                <img src={currentAlbumSong.coverPath} alt=""/>
            </div>
            <h1>{currentAlbumSong.songName}</h1>
            <p>{currentAlbumSong.singer}</p>

        </div>

        <div className="songItemsList">

            <div className="topi">
                <h1>Queue</h1>
                <div className="f">
                    <i className="fa-solid fa-ellipsis"></i>
                    <button className="save">Save</button>
                    <button className="clear">Clear</button>
                </div>
            </div>
        
       
{
    
    songs.map((song,index)=><Music songName={song.songName} src="" singer={song.singer} id = {index}/>)
}
</div>
       </div>

        
        </>
    )
}

export default SongAlbum;