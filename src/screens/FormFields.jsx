import { useFormContext } from "../hooks/UseFormContext";
import { useReducer } from "react";
import { formReducer, initialState } from "../reducer/formReducer";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../styles/Button";
import Input from "../styles/Input";
import Textarea from "../styles/Textarea";

export default function FormFields() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { FormData, errors } = state;

  const onChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      // field: e.target.name,
      payload: { name: e.target.name, value: e.target.value },
      errors,
    });
  };

  const sendNotification = async (e) => {
    e.preventDefault();

    toast.success(
      "Gracias por contactaenos Alguin se comunicara a la brevedad  ... !",
    );
    // createNewInfoRequest(FormData, formatPhoneNumber);

    console.log(FormData);

    // setFormData(() => ({
    //   name: "",
    //   question: "",
    //   email: "",
    //   comment: "",
    //   // telefono: "",
    // }));
    // const myTimeout = setTimeout(getHome, 2000);

    // function getHome() {
    //   clearTimeout(myTimeout);
    //   navigate("/");
    // }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-8 md:py-0">
      <div className="h-14 w-full text-white bg-black text-center pt-3">
        useReducer Sample for a FORM
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center font-Artifika text-2xl/9 text-gray-900">
          Contact Me
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full md:w-120">
        <form onSubmit={sendNotification}>
          {/* *****************  Linea *********************** */}
          <Input
            onChange={onChange}
            labelname="Your Name"
            name="nombre"
            value={FormData.nombre}
            variant="text"
            required
            placeholder="Add your Name here"
            type="text"
          />

          {/* *****************  Linea *********************** */}
          <Input
            onChange={onChange}
            labelname="Company Title or Question"
            name="question"
            value={FormData.question}
            variant="text"
            required
            placeholder="Title o Question Here"
            type="text"
          />
          {/* *****************  Linea *********************** */}
          <Input
            onChange={onChange}
            labelname="Your Email"
            name="email"
            value={FormData.email}
            variant="email"
            required
            placeholder="Title o Question Here"
            type="email"
          />

          {/* *****************  Linea *********************** */}
          <Textarea
            onChange={onChange}
            labelname="Comments"
            name="comment"
            value={FormData.comment}
            variant="text"
            required
            placeholder="Add your Comment here 300 caracters..."
            type="text"
          />
          <div className="border border-black">
            <select
              name="role"
              value={FormData.role}
              onChange={onChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              required
              checked={FormData.agreeToTerms}
              onChange={() =>
                dispatch({ type: "TOGGLE_TOGGLE", field: "agreeToTerms" })
              }
            />{" "}
            I agree to the terms and conditions
          </label>
          <div className="w-full">
            {Object.entries(errors).map(([field, msg]) => (
              <p key={field} className="text-red-600 text-sm">
                {msg}
              </p>
            ))}
            <button
              type="button"
              onClick={() => dispatch({ type: "RESET_FORM" })}
              style={{
                padding: "8px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
            <Button name="Send Request" variant="secundary">
              Primary Button
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
