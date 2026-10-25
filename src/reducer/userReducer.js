const defaulState = {
  dataUser: null,
  authIsReady: false,
  errors: {},
};

export const UserInitialState = localStorage.getItem("data")
  ? { dataUser: JSON.parse(localStorage.getItem("data")) }
  : defaulState;

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "LOGIN":
      return (
        // localStorage.setItem("user", JSON.stringify(action.payload.user)),
        (
          localStorage.setItem("data", JSON.stringify(action.payload.data)),
          state,
          {
            ...state,
            user: action.payload.user,
            dataUser: action.payload.data,
          }
        )
      );

    case "UPDATE":
      // console.log(action);
      return (
        state,
        {
          ...state,
          dataUser: action.payload.formData,
        }
      );
    case "LOGOUT":
      // localStorage.removeItem("data");
      return { ...state, user: null, authIsReady: false };
    default:
      return state;
  }
};
