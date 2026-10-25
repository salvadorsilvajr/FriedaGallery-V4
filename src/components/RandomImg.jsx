import UseProductsContext from "../context/ProductContext";
import { useEffect } from "react";
import Imagenes from "../components/Basicos/Imagenes";

const RandomImg = ({ setShow }) => {
  const { ProductsState } = UseProductsContext();
  const items = ProductsState.items;

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);

  const r = items[Math.floor(Math.random() * items.length)];
  return (
    <div className="p-4 h-screen w-screen flex">
      <Imagenes
        className={
          r.ImgLandscape
            ? "  p-4 h-screen-2xl  outline-offset-2 outline-solid   "
            : " w-screen-md outline-2 outline-offset-2 outline-solid  "
        }
        src={r.photoURL}
        estilo={r.ImgLandscape ? "land" : "port"}
        tamano={r.ImgLandscape ? "land" : "port"}
      ></Imagenes>
    </div>
  );
};

export default RandomImg;
