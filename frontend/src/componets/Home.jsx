import useCurrentSong from "../contexts/CurrentSongContext";
import Image  from "./Image"



function Home(){
    const {updateSong,currentSong} = useCurrentSong();

    const Images = document.querySelectorAll("Image");
    Images.forEach((image)=>{
        image.addEventListener('click',function(e){
                console.log("here")
                updateSong(songs[e.target.key])
                console.log(currentSong)
        })
    })


    let songs = [
        {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
        {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
        {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
        {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
        {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
        {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
        {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
        {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
        {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
        {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
    ]

    return(
        
        <>  
            <div className="box">
            {
                songs.map((song,index)=> <Image src= {song.coverPath} songName ={song.songName} audiosrc= {song.filePath} id= {index}/>)
            }

            </div>
    </>
    )
}

export default Home