export const initialState = {
  FormData: {
    nombre: "",
    question: "",
    email: "",
    comment: "",
    role: "user",
    agreeToTerms: false,
  },
  errors: {},
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      const { name, value } = action.payload;
      const errors = {};

      if (name === "nombre" && /\d/.test(value)) {
        errors.name = "Name cannot contain numbers";
      } else if (name === "email" && !value.includes("@")) {
        errors.email = "Invalid email address";
      } else if (name === "email" && !value.endsWith(".com")) {
        errors.email = "Email must end with .com";
      } else {
        delete errors[name];
      }
      return {
        ...state,
        FormData: { ...state.FormData, [name]: value },
        errors,
      };
    case "TOGGLE_TOGGLE":
      return {
        ...state,
        FormData: {
          ...state.FormData,
          [action.field]: !state.FormData[action.field],
        },
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
};
