import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'
import { useSelector } from 'react-redux';
import UserMenu from '../../components/UserMenu';
import Notificationhovercomp from '../../components/notificationHover/Nonificationhovercomp';
import { useEffect } from 'react';

function Header() {

  const user = useSelector((state) => state.user?.currentUser);
  const { pathname } = useLocation();
  const location = pathname.split("/")[1];
  const navigate = useNavigate();

  console.log(user)
  console.log(location)

  function Side() {
    var SideCon = document.getElementById('SideCon');
    if (SideCon.classList.contains('active')) {
      SideCon.classList.remove('active');
    } else {
      SideCon.classList.add('active');
    }
  }

  useEffect(() => {
    if (location === "profile" && !user) {
      navigate("/sign")
    }
  }, [location, navigate, user])


  return (
    <>
      <header>
        <Link to="/" className='Link'><div className='Lo'><img src="/Photo/logo.jpg" className='logo' alt="" /></div></Link>
        <div className='List'>
          <Link to="quiz">Take Our Quiz</Link>
          <Link to="reviews">Reviews</Link>
          <Link to="contact">Contact</Link>
          <Link to="about">About</Link>
          {user && <a>

            <div className="notification"><Notificationhovercomp /></div>
          </a>}
          {
            user ? <UserMenu /> : <Link to="Sign"><button type='Log' >Sign In</button></Link>
          }


        </div>
        <div className='SideBar' onClick={Side}><ion-icon name="menu-outline" ></ion-icon></div>

      </header>
    </>

  )
}
export default Header;