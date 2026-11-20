import React from "react";
import { useLocation } from "react-router-dom";
import Imagenes from "../components/Basicos/Imagenes";
import Fonts from "../components/Basicos/Fonts";
import Back from "../components/Back";

const DisplayDetails = () => {
  const location = useLocation();
  const item = location.state;
  console.log(item);
  return (
    <>
      <Back />
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className=" m-3 lg:m-12 md:flex justify-center items-center">
            <Imagenes
              // className={
              //   item.ImgLandscape ? "lg:w-100 lg:h-90" : "lg:h-110 lg:w-90"
              // }
              src={item.photoURL}
              estilo={item.ImgLandscape ? "land" : "port"}
              tamano={item.ImgLandscape ? "land" : "port"}
            ></Imagenes>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* <div className=" md:flex justify-center items-center"> */}
          <div className="flex mb-3 mx-3 justify-center items-center ">
            <Fonts tamano="title">{item.PieceName}</Fonts>
          </div>
          <div className="flex mb-3 mx-3 justify-center items-center ">
            <Fonts tamano="subtitle">{item.category}</Fonts>
          </div>
          <div className="flex mb-3 mx-3 justify-center items-center ">
            <Fonts tamano="subtitle">{item.details}</Fonts>
          </div>
          <div className="flex mb-3 mx-3 justify-evenly items-center ">
            <Fonts tamano="title">${item.price} USD</Fonts>
            <Fonts tamano="subtitle">{item.year}</Fonts>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default DisplayDetails;
