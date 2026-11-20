import { FaBackward } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Fonts from "./Basicos/Fonts";

export default function Back() {
  const navigate = useNavigate();
  return (
    <div className="w-[95%] ">
      <div className="flex bg-gray-100 p-2 cursor-pointer w-14">
        <div
          onClick={() => navigate(-1)}
          className="flex flex-col items-center"
        >
          <Fonts tamano="subtitle" color="secundary">
            Back
          </Fonts>
          <FaBackward color="green" />
        </div>
      </div>
    </div>
  );
}
