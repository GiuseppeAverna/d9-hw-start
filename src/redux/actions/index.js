export const ADD_TO_LIST = "ADD_TO_LIST";

export const addToListAction = (jobData) => {
  return {
    type: ADD_TO_LIST,
    payload: jobData,
  };
};
