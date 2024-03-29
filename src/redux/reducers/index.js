import { ADD_TO_LIST } from "../actions";

const initialState = {
  favoriteslist: {
    content: [],
    isLoading: true,
    isError: false,
  },
  user: {
    username: "",
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        ...state,
        favoriteslist: {
          ...state.favoriteslist,
          content: state.favoriteslist.content.concat(action.payload),
        },
      };

    default:
      return state;
  }
};

export default Reducer;
