
import {Link, NavLink, Navigate, useNavigate} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import {useDispatch, useSelector } from 'react-redux';
import { logout} from '../Reducer/authSlice';


function Header(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogOut(event){
        event.preventDefault()
        console.log("came here for logout")
       const res =  dispatch(logout())
       console.log(res);
    }

    function handleLogin(event){
        navigate("/login");
    }

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const data = useSelector(state => state.auth.data)
    console.log(isLoggedIn)
    console.log("here comes the data "+data.avatar)

    return (
        <>
         <div className="header">
        <nav>
            <div className="logo">
                <img src="https://tse2.mm.bing.net/th?id=OIP.R137HYqG1Wnv0ADZ2bFkbQHaCn&pid=Api&P=0&h=180" alt=""/>
                <div className="items">
                <Link to="/music">Music</Link>
                <a href="/upload">UploadSong</a>
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
                {isLoggedIn?(<a href="" onClick={handleLogOut}>LogOut</a>):<a href="" onClick={handleLogin} >Login</a>}
                {isLoggedIn?(<a href="" style={{borderRadius:"100%", width:"50px", padding:"2px 2px "}}><img src={data.avatar} width={"100%"}/></a>):<a href=""><PersonIcon/></a>}
                
            </div>
        </nav>
    </div>
        </>
      )
}

export default Header