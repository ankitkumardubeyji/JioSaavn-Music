
import {Link, NavLink} from 'react-router-dom'

function Header(){
    return (
        <>
         <div className="header">
        <nav>
            <div className="logo">
                <img src="https://tse2.mm.bing.net/th?id=OIP.R137HYqG1Wnv0ADZ2bFkbQHaCn&pid=Api&P=0&h=180" alt=""/>
                <div className="items">
                <Link to="/music">Music</Link>
                <a href="">Podcasts</a>
                <Link to="/">Home</Link>
            </div>
            </div>

            <div className="search-box">
                <p>
                    <form action="/submit" method="POST">
                        <input className="form-input" type="text" name="search" placeholder="Article Search"/>
                        <button className="btn"><img src="search.png" alt=""/></button>
                    </form>
                </p>
            </div>

            <div className="side-nav">
                <a href="">Music Languages</a>
                <a href="">Log in</a>
                <a href="">Sign Up</a>
            </div>
        </nav>
    </div>
        </>
      )
}

export default Header