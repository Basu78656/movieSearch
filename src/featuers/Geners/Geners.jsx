/*eslint-disable*/
import "./Geners.css";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiFillCloseCircle,
  AiTwotoneHeart,
} from "react-icons/ai";
import { HiTrendingUp } from "react-icons/hi";
import { FaGun } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { CgMediaLive } from "react-icons/cg";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { MdArrowDropDownCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

function Geners() {
  const [isopen, setIsOpen] = useState(false);

  function handleOpenClose() {
    setIsOpen(!isopen);
  }

  return isopen ? (
    <div className="geners_container">
      <button className="close" onClick={() => handleOpenClose()}>
        <AiFillCloseCircle />
      </button>
      <Link className="geners_btn" to="/">
        <span>
          <AiOutlineHome />
          Home
        </span>
      </Link>
      <Link className="geners_btn" to="/topRated">
        <span>
          <HiTrendingUp />
          Top-Rated
        </span>
      </Link>
      <Link className="geners_btn" to="/romanticMovies">
        <span>
          <AiTwotoneHeart />
          Romance
        </span>
      </Link>
      <Link className="geners_btn" to="/actionMovies">
        <span>
          <FaGun />
          Action
        </span>
      </Link>
      <Link className="geners_btn" to="/thrillerCrime">
        <span>
          <PiTelevisionSimpleDuotone />
          Thriller-Crime
        </span>
      </Link>
      <Link className="geners_btn" to="/watchList">
        <span>
          <RiTodoLine />
          Watchlist
        </span>
      </Link>
    </div>
  ) : (
    <div className="open_container">
      <button onClick={() => handleOpenClose()}>
        <MdArrowDropDownCircle />
      </button>
    </div>
  );
}

export default Geners;
