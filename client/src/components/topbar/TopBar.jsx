import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.scss";

function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
     
      <div className="top-center">
        <ul className="top-list">
            {
              user && <li className="top-list__item">
                <Link  to="/settings">
              <img className="top-img" src={PF + user.profilePic} alt="" />
            </Link>
              </li>
            }

          <li className="top-list__item">
            <Link to="/">
              <i style={{color:"#b0b3b8"}} className="fa fa-home"></i>
            </Link>
          </li>

          <li className="top-list__item">
            <Link to="/write">
            <i style={{color:"#b0b3b8"}} class="fa-solid fa-file-pen"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-right">
        {user ? (
          <>
            

            <ul className="top-list-2">
              <li
                className="top-list__item"
                style={{
                  background: "#242526",
                }}
                onClick={handleLogout}
              >
                {user && 
                <i style={{color:"#b0b3b8"}} class="fa-solid fa-right-from-bracket"></i>
                

                }
              </li>
            </ul>
          </>
        ) : (
          <ul className="top-list-2">
            <li className="top-list__item">
              <Link to="/login">Giriş Yap</Link>
            </li>
            <li className="top-list__item">
              <Link to="/register">Kayıt Ol</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default TopBar;
