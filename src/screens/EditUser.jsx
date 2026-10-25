import { useState, useRef } from "react";
import UseMyUserContext from "../context/UserContext";
import Input from "../components/Basicos/Input";
import Buttons from "../components/Basicos/Buttons";
// import Msg from "../components/Basicos/Msg";
import Imagenes from "../components/Basicos/Imagenes";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useUploadImage from "../hooks/useUploadImage";
import { useUpdateDoc, delOldUserPic } from "../hooks/useUpdateDoc";

const EditUser = () => {
  const navigate = useNavigate();
  const { updateUser, error, isPending } = useUpdateDoc();
  const { dispatchUser } = UseMyUserContext();
  const myPic = useRef();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const { userState } = UseMyUserContext();
  const { dataUser } = userState;
  const id = userState.dataUser.id;
  const [formData, setFormData] = useState({
    userId: dataUser.id,
    displayName: dataUser.displayName,
    photoURL: "",
    photoRef: "",
    company: dataUser.company,
    title: dataUser.title,
  });
  const userOldPic = userState.dataUser.photoRef;
  // console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    delOldUserPic(userOldPic, "userImages");
    updateUser(id, formData);
    dispatchUser({ type: "UPDATE", payload: { formData } });
  };

  return (
    <section id="login" className="w-full">
      <p>Log In Componet </p>
      {!userState.dataUser ? (
        <p className="text-red-500 font-bold"> not user</p>
      ) : (
        <p>{userState.dataUser.displayName}</p>
      )}

      <hr />

      {/* {error && <Msg type="error" msg={error.message} />} */}
      <div className="grid grid-cols-7 gap-4">
        <div className="lg:col-span-3 col-span-5 lg:col-start-3 col-start-2">
          <form onSubmit={handleOnSubmit}>
            <div className="flex justify-evenly my-3 items-center">
              <div>
                <p className="text-center">Current</p>
                <Imagenes
                  src={userState.dataUser.photoURL}
                  estilo="square"
                  tamano="square"
                ></Imagenes>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-center">New Pic</p>
                {preview ? (
                  <Imagenes
                    src={preview}
                    estilo="square"
                    tamano="square"
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
                      <Imagenes estilo="square" tamano="squa"></Imagenes>
                    </span>
                    <Input
                      onChange={(event) => {
                        const file = event.target.files[0];
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
                          "userImages",
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
            </div>
            <Input
              onChange={handleChange}
              labelname="Your Name"
              name="displayName"
              value={formData.displayName}
              variant="text"
              required
              placeholder="Your name Here.."
              type="text"
            />
            <Input
              onChange={handleChange}
              labelname="Company"
              name="company"
              value={formData.company}
              variant="text"
              required
              placeholder="Company Name"
              type="text"
            />

            <Input
              onChange={handleChange}
              labelname="Your Title"
              name="title"
              value={formData.title}
              variant="text"
              required
              placeholder="Ypur Title in the Company"
              type="text"
            />
            {isPending ? (
              <Buttons
                estilo="full"
                tamano="full"
                name="Loading..."
                background="primary"
                type="submit"
              ></Buttons>
            ) : (
              <Buttons
                estilo="full"
                tamano="full"
                name="Submit"
                background="primary"
                type="submit"
              ></Buttons>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
