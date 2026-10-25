import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const Msg = ({ type = "error", msg, ...props }) => {
  const [show, setShow] = useState(true);
  const types = {
    error: "outline-3 outline-offset-2 outline-red-500 bg-red-100",
    success: "outline-3 outline-offset-2 outline-green-500 bg-green-100",
    warning: "outline-3 outline-offset-2 outline-yellow-500 bg-yellow-100",
  };

  const baseStyles = " grid grid-cols-6 gap-4 my-4 ";
  const combinedStyles = `${baseStyles} `;

  return (
    <>
      {show ? (
        <div {...props} className={combinedStyles}>
          <div className={`${types[type]} col-span-2 col-start-3 min-h-22 `}>
            <div className="w-full flex justify-center outline-1 outline-offset-2 outline-red-500">
              <div className="flex flex-row w-full justify-between">
                <div className="ml-2 font-bold">{type}</div>
                <div>
                  <FaRegWindowClose
                    onClick={() => setShow(false)}
                    // show={show.toString()}
                    className="text-danger cursor-pointer"
                    size={22}
                  />
                </div>
              </div>
            </div>
            <div className="w-full  text-center m-2">{msg}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Msg;
