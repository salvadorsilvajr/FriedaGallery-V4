export const ProductsInitialState = {
  items: [],
  isPending: true,
  error: null,
};

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload, isPending: false };
    case "ADD_ITEM":
      console.log(action);
      return { ...state, items: [...state.items] };
    case "UPDATE_ITEM":
      // console.log(action);
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                PieceName: action.payload.formData.PieceName,
                price: action.payload.formData.price,
                year: action.payload.formData.year,
                details: action.payload.formData.details,
              }
            : item,
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
