import React from "react";
import Fonts from "../../components/Basicos/Fonts";
import Imagenes from "../../components/Basicos/Imagenes";
import { Link } from "react-router-dom";

const DisplayArtPieces = ({ item }) => {
  return (
    <div>
      <div className="text-2xl text-center text-primary tracking-widest font-semibold">
        {item.cat}
      </div>

      <div className="flex w-screen  snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-3 pb-4">
        {item.land.map((item) => (
          <div key={item.id}>
            <div className="w-72 flex flex-col shrink-0 snap-center ">
              <Link
                className="gallery-div-img"
                state={item}
                to={`/displayDetails/${item.id}`}
              >
                <Imagenes
                  tamano="land"
                  estilo="land"
                  src={item.photoURL}
                ></Imagenes>
              </Link>
              <Fonts
                // className="absolute bottom-2 left-20"
                color="black"
                tamano="subtitle"
                font="artifiko"
              >
                {item.PieceName}
              </Fonts>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-screen snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-3 pb-4">
        <div className="flex w-screen snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-3 pb-4">
          {item.port.map((item) => (
            <div key={item.id}>
              <div className="w-48 flex flex-col shrink-0 snap-center ">
                <Link
                  className="gallery-div-img"
                  state={item}
                  to={`/displayDetails/${item.id}`}
                >
                  <Imagenes
                    tamano="port"
                    estilo="port"
                    src={item.photoURL}
                  ></Imagenes>
                </Link>
                <Fonts
                  // className="absolute bottom-2 left-5"
                  color="black"
                  tamano="subtitle"
                  font="Matemasie"
                >
                  {item.PieceName}
                </Fonts>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayArtPieces;
