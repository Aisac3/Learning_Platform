import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { userLogout } from "../../services/userServices";
import { persistor } from "../../redux/store";
import { clearUser } from "../../redux/features/userSlice";

const Header = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData, "user data from header");

const dispatch=useDispatch()

  const handleLogout=()=>{
    try {
      userLogout().then(()=>{
        persistor.purge()
        dispatch(clearUser())
      })
      
    } catch (error) {
        console.log(error)
    }
  }
  const navigate = useNavigate();
  return (
    <div className="navbar bg-transparent shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Courses</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Logo
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li onClick={() => navigate("/")}>
            <a>Home</a>
          </li>
          <li onClick={() => navigate("/about")}>
            <a>About</a>
          </li>
          <li onClick={() => navigate("/courses")}>
            <a>Courses</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
        {userData.user &&Object.keys(userData.user).length>0 ? (
          <div className="gap-2">
            <span>{userData.user.name}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-gray-100 hover:bg-gray-200 text-black px-8"
          >
            Join Us
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
