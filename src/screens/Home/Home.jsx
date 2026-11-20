import UseProductsContext from "../../context/ProductContext";
import { Categories } from "../../data/dropdownOptios";
import DisplayArtPieces from "./DisplayArtPieces";
import SocialMedia from "../../components/SocialMedia";

const Home = () => {
  const { ProductsState } = UseProductsContext();
  const items = ProductsState.items;

  let filters = [];
  let land = {};
  let port = {};
  Categories.map((cat) => {
    land = items.filter(
      (item) => item.ImgLandscape && item.category === cat.value,
    );
    port = items.filter(
      (item) => item.category === cat.value && !item.ImgLandscape,
    );
    filters.push({ cat: cat.value, land, port });
  });

  return (
    <>
      {filters && (
        <section className="my-3 mb-20">
          {filters.map((item, index) => (
            <DisplayArtPieces key={index} item={item} />
          ))}
          <SocialMedia />
        </section>
      )}
    </>
  );
};

export default Home;
