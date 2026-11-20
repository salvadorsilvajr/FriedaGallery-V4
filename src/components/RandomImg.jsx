import UseProductsContext from "../context/ProductContext";
import { useEffect } from "react";
import Imagenes from "../components/Basicos/Imagenes";

const RandomImg = ({ setShow }) => {
  const { ProductsState } = UseProductsContext();
  const items = ProductsState.items;

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3500);
  }, []);

  const r = items[Math.floor(Math.random() * items.length)];
  return (
    <div className="fixed inset-0 w-screen h-[100%] z-0">
      <Imagenes src={r.photoURL} estilo="full" tamano="full"></Imagenes>
    </div>
  );
};

export default RandomImg;
