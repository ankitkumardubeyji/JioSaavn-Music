function Sidebar(){
    return(
        <>
           
        <div className="left-slide">
            <h1>BROWSE</h1>
            <p>New Releases</p>
            <p>Top Charts</p>
            <p>Top Playlists</p>
            <p>Podcasts</p>
            <p>Top Artists</p>
            <p>Radio</p>

            <h1>LIBRARY</h1>
            <p><i className="fa-thin fa-clock-rotate-left"></i>History</p>
            <p><i className="fa-regular fa-music-note"></i>Songs</p>
            <p><i className="fa-sharp fa-regular fa-record-vinyl"></i>Albums</p>
            <p><i className="fa-thin fa-podcast"></i>Podcasts</p>
            <p><i className="fa-thin fa-microphone-stand"></i>Artists</p>

          <span> + New Playlist</span>
        </div>
      
        
        </>
    )

}


export default Sidebar;