import UseMyUserContext from "../context/UserContext";
import UseProductsContext from "../context/ProductContext";
import Imagenes from "../components/Basicos/Imagenes";
import Buttons from "../components/Basicos/Buttons";
import Input from "../components/Basicos/Input";
import Fonts from "../components/Basicos/Fonts";
import { MdOutlineEditNote } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Products } from "../hooks/useProducts";

export default function ProductsCases() {
  const { ProductsState } = UseProductsContext();
  const { userState } = UseMyUserContext();
  const [showEdit, SetShowEdit] = useState(null);
  const [show, SetShow] = useState(false);
  const items = ProductsState.items;
  const { handleUpdate, handleDelete, isPending } = Products();

  const [formData, setFormData] = useState({
    PieceName: "",
    year: "",
    price: 0,
    details: "",
  });

  // console.log(ProductsState);

  const { PieceName, year, price, details } = formData;

  const deleteItem = (item) => {
    handleDelete(item.id, "projects");
  };

  // console.log(show);

  const handleEditForm = (e, item) => {
    e.preventDefault();
    // console.log(formData);
    handleUpdate(item.id, formData, "projects");
    SetShowEdit(null);
  };

  const EditItem = ({ id }) => {
    SetShowEdit(id);
    SetShow(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex min-h-full w-full lg:w-3/4 flex-col justify-center px-6 py-8 md:py-0">
        {isPending ? (
          <div>Loading..... </div>
        ) : (
          <>
            <div className="h-14 w-full text-white bg-black text-center pt-3 mb-5">
              useReducer with create-contec, use-contex and Provider
            </div>

            <div className="flex flex-row justify-evenly ">
              {userState.user && (
                <button className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer">
                  <Link to="/createProduct">Create</Link>
                </button>
              )}
            </div>
            <hr />
            <div className="flex flex-col w-full">
              <form>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row  justify-center items-center min-h-10"
                  >
                    <div className="h-30 w-30 hidden  md:flex justify-center items-center">
                      <Imagenes
                        className={
                          item.ImgLandscape ? "w-30 h-20" : "h-30 w-20"
                        }
                        src={item.photoURL}
                        estilo={item.ImgLandscape ? "land" : "port"}
                        tamano={item.ImgLandscape ? "land" : "port"}
                      ></Imagenes>
                    </div>
                    {showEdit === item.id ? (
                      <div className="w-40">
                        <Input
                          style={{ fontSize: "12px" }}
                          name="PieceName"
                          onChange={(e) => handleChange(e)}
                          labelname=""
                          value={PieceName ? PieceName : item.PieceName}
                          variant="text"
                          // required
                          placeholder=""
                          type="text"
                        />
                      </div>
                    ) : (
                      <div className="w-34">{item.PieceName}</div>
                    )}
                    {showEdit === item.id ? (
                      <div className="w-16">
                        <Input
                          style={{ fontSize: "12px" }}
                          name="price"
                          onChange={(e) => handleChange(e)}
                          labelname=""
                          value={price ? price : item.price}
                          variant="text"
                          // required
                          placeholder=""
                          type="text"
                        />
                      </div>
                    ) : (
                      <Fonts className="mx-2" tamano="title">
                        ${item.price}
                      </Fonts>
                    )}
                    {showEdit === item.id ? (
                      <div className="w-16">
                        <Input
                          style={{ fontSize: "12px" }}
                          name="year"
                          onChange={(e) => handleChange(e)}
                          labelname=""
                          value={year ? year : item.year}
                          variant="text"
                          // required
                          placeholder=""
                          type="text"
                        />
                      </div>
                    ) : (
                      <Fonts className="mx-2" tamano="subtitle">
                        {item.year}
                      </Fonts>
                    )}
                    {showEdit === item.id ? (
                      <div className="w-60">
                        <Input
                          style={{ fontSize: "12px" }}
                          name="details"
                          onChange={(e) => handleChange(e)}
                          labelname=""
                          value={details ? details : item.details}
                          variant="text"
                          // required
                          placeholder=""
                          type="text"
                        />
                      </div>
                    ) : (
                      <Fonts tamano="texto">{item.details}</Fonts>
                    )}

                    <div className="w-10 m-6">
                      {show && showEdit === item.id ? (
                        <div
                          onClick={(e) => {
                            handleEditForm(e, item);
                            SetShow(false);
                          }}
                        >
                          <Buttons
                            name="Update"
                            tamano="small"
                            background="primary"
                            color="white"
                          ></Buttons>
                        </div>
                      ) : (
                        <div className={show ? "" : "cursor-pointer"}>
                          <MdOutlineEditNote
                            onClick={
                              show
                                ? undefined
                                : () =>
                                    EditItem(
                                      { id: item.id },
                                      setFormData((prev) => ({
                                        ...prev,
                                        PieceName: item.PieceName,
                                        price: item.price,
                                        year: item.year,
                                        details: item.details,
                                      })),
                                    )
                            }
                            size={30}
                            color="green"
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-10 m-6 cursor-pointer">
                      <MdOutlineDeleteForever
                        onClick={() => deleteItem(item)}
                        size={30}
                        color="red"
                      />
                    </div>
                  </div>
                ))}
              </form>
            </div>
            <div>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
}
