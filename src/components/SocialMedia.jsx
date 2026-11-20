import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  return (
    <div className=" border-1 border-gray-300 w-[90%] mx-auto rounded-md">
      <div className="text-center font-Artifika">Follow us</div>
      <div className="flex flex-row items-center justify-evenly my-3">
        <Link
          rel="noopener noreferrer"
          target="_blank"
          to="https://www.facebook.com/profile.php?id=100083307700773"
        >
          <ImFacebook2 size="3rem" color="#3b5998" />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          to="https://www.instagram.com/friedagallery.com2/"
        >
          <FaInstagramSquare size="3.4rem" color="#f56040" />
        </Link>
        <Link rel="noopener noreferrer" target="_blank" to="#!">
          <IoLogoLinkedin size="3.4rem" color="#0e76a8" />
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
