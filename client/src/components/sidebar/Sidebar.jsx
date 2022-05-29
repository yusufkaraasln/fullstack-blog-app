import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        
        <span className="sidebar-title">KATEGORİLER</span>
        <ul className="sidebar-list">
          {cats.map((c, i) => (
            <Link to={`/?cat=${c.name}`}>
              <li key={i} className="sidebar-list-item">
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
