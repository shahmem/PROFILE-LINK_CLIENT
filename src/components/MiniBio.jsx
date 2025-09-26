import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MiniBio({ user }) {
    const navigate = useNavigate();
    const goToDashboard = () => {
  navigate("/dashboard", { state: { user } });
};
  return (

    <div className="p-8 md:6">
      <div
        onClick={goToDashboard}
        className="p-8 rounded-3xl md:rounded-2xl bg-white flex shadow-xl flex-col items-center"
      >
        <div className="text-7xl">
          {user.img ? (
            <img src={user.img} />
          ) : (
            <FontAwesomeIcon
              className="opacity-45"
              icon={faCircleUser}
              size="2xl"
            />
          )}
        </div>
        <div className="text-center mt-5">
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className=" text-gray-500">@{user.username}</p>
        </div>
        <div className="flex gap-0.5 text-3xl mt-6">
          <div>
            <FaInstagram className="text-pink-600 hover:text-pink-800" />
          </div>
          <div>
            <FaWhatsapp className="text-green-600 hover:text-green-800" />
          </div>
          <div className="rounded-full text-xl w-7 h-7 flex justify-center items-center border border-gray-600 text-gray-600 pb-1">
            +
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default MiniBio;
