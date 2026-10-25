import { useState, useRef, useEffect } from "react";
import UseProductsContext from "../context/ProductContext";
import UseMyUserContext from "../context/UserContext";
import Input from "../components/Basicos/Input";
import Fonts from "../components/Basicos/Fonts";
import Imagenes from "../components/Basicos/Imagenes";
import Select from "../components/Basicos/Select";
import Buttons from "../components/Basicos/Buttons";
import Textarea from "../components/Basicos/Textarea";
import addImage from "../assets/addImage.png";
import { Categories } from "../data/dropdownOptios";
import { v4 as uuidv4 } from "uuid";
import useUploadImage from "../hooks/useUploadImage";
import { toast } from "react-toastify";
import { Products } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
// import Msg from "../components/Basicos/Msg";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { ProductsState } = UseProductsContext();
  const { userState } = UseMyUserContext();
  const user = userState.dataUser;
  const { handleAdd, isPending } = Products();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [ImgOr, setPicOr] = useState("");

  // console.log("Products State:", ProductsState);
  // console.log("User State: ", userState);
  const myPic = useRef();

  // useEffect(() => {
  //   if (error) {
  //     const timer = setTimeout(() => {
  //       navigate("/");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [error, navigate]);

  // form field values
  const [formData, setFormData] = useState({
    PieceName: "",
    year: new Date().getFullYear(),
    price: 100,
    countInStock: 1,
    details: "",
    category: "categories",
    rating: 0,
    ImgLandscape: true,
    numReviews: 0,
    comments: [],
    createdBy: {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.id,
    },
  });

  const {
    PieceName,
    year,
    price,
    countInStock,
    details,
    category,
    ImgLandscape,
  } = formData;
  // console.log(user);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    handleAdd(formData, "projects");
    navigate(-1);
  };

  // console.log(formData);

  return (
    <section className="min-h-[40%] w-dvw lg:w-2/4">
      {isPending ? (
        <div>Loading....</div>
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-8 md:py-0">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Fonts tamano="title" color="primary" className="my-6">
              Create a New Piece
            </Fonts>
          </div>
          {/* {error && <Msg type="error" msg={error.message} />} */}
          <div className="mt-10 sm:mx-auto sm:w-full md:w-120">
            <form onSubmit={handleOnSubmit}>
              {/* *****************  Linea *********************** */}
              <Input
                onChange={onChange}
                labelname="Name of new Piece"
                name="PieceName"
                value={PieceName}
                variant="text"
                required
                placeholder="Name of new Piece"
                type="text"
              />
              {/* *********** line of Form ******** */}
              <div className="flex w-full justify-around border border-gray-300 p-2 rounded-lg">
                <div className="flex items-center  ">
                  <input
                    // onChange={onChange}
                    onChange={(e) => {
                      setPicOr("land");
                      onChange(e);
                    }}
                    id="ImgLandscape"
                    type="radio"
                    value={true}
                    name="ImgLandscape"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:bg-green-500 transition-all"
                  />
                  <label
                    htmlFor="ImgLandscape"
                    className="select-none ms-2 text-sm font-medium text-heading"
                  >
                    Landscape
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    // onChange={onChange}
                    onChange={(e) => {
                      setPicOr("port");
                      onChange(e);
                    }}
                    id="ImgLandscape"
                    type="radio"
                    value={false}
                    name="ImgLandscape"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:bg-green-500 transition-all"
                  />
                  <label
                    htmlFor="ImgLandscape"
                    className="select-none ms-2 text-sm font-medium text-heading"
                  >
                    Portrait
                  </label>
                </div>
              </div>
              {/* *****************  Linea *********************** */}
              <div className="flex flex-col items-center">
                {preview ? (
                  <Imagenes
                    src={preview}
                    estilo={ImgOr}
                    tamano={ImgOr}
                  ></Imagenes>
                ) : (
                  <>
                    <span
                      className="cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        myPic.current.click();
                      }}
                    >
                      <p className="font-bold text-center tracking-wider mb-1.5">
                        Image must be less 700kb preferable 1080 X 720 pixels
                        landscape or 800 X 1000 pixels portrail
                      </p>
                      <div className="flex justify-center">
                        <Imagenes
                          src={addImage}
                          estilo="square"
                          tamano="square"
                        ></Imagenes>
                      </div>
                    </span>
                    <Input
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (!file) {
                          toast.error("Please select a file");
                          return;
                        }
                        if (!file.type.includes("image")) {
                          toast.error("Selected file must be and image Moron!");
                          return;
                        }
                        if (file.size > 700000) {
                          toast.error(
                            "Image file size must be less than 700kb",
                          );
                          return;
                        }
                        let nameFile = "";
                        if (file && file.type.substr(0, 5) === "image") {
                          setFile(file);
                          nameFile = `${uuidv4()}-${file.name}`;
                          setFileName(nameFile);
                          setFormData((prev) => ({
                            ...prev,
                            ["photoRef"]: nameFile,
                          }));
                        } else {
                          setFile(null);
                        }
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const Base64 = reader.result;
                            setPreview(Base64);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setPreview(null);
                        }
                        useUploadImage(
                          file,
                          nameFile,
                          setProgress,
                          setFormData,
                          "projects",
                        );
                      }}
                      ref={myPic}
                      accept="image/*"
                      style={{ display: "none" }}
                      labelname=""
                      type="file"
                      name="file"
                      // value=''
                      variant="text"
                      required
                    />
                    {/* *****************  Linea *********************** */}
                    {/* <div className="mt-2">
                    <progress value={progress} max="100" />
                  </div> */}
                  </>
                )}
              </div>

              {/* *********** line of Form ******** */}
              <div className="flex w-full justify-around">
                <Select
                  setFormData={setFormData}
                  value={category}
                  variant="select"
                  name={category}
                  MenuOptions={Categories}
                ></Select>
              </div>
              {/* *****************  Linea *********************** */}
              <Textarea
                onChange={onChange}
                labelname="Art Piece Information"
                name="details"
                value={details}
                variant="text"
                required
                placeholder="Art Piece Information"
                type="text"
              />

              <div>
                <Buttons
                  name="Add new Piece to Gallery"
                  estilo="withEffect"
                  tamano=""
                  type="submit"
                ></Buttons>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateProduct;
