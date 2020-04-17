import {
  FETCH_ALL,
  TOGGLE_COMPLETE,
  HIDE_COMPLETE,
  TOGGLE_COMPLETE_ALL,
  SET_ADD_TODO_TEXT,
  FILTER_TODOS,
} from "./types";
import axios from "axios";
import { api_domain } from "../configs.json";

export const fetchTodos = (query = "", callback = () => {}) => (dispatch) => {
  axios
    .get(`${api_domain}todos?${query}`)
    .then((res) => {
      callback();
      dispatch({
        type: FETCH_ALL,
        payload: res.data,
      });
    })
    .catch((err) => alert(err.message));
};

export const toggleComplete = (id) => ({
  type: TOGGLE_COMPLETE,
  payload: id,
});

export const toggleHideComplete = () => ({
  type: HIDE_COMPLETE,
});

export const toggleCompleteAll = () => ({
  type: TOGGLE_COMPLETE_ALL,
});

export const setTodoText = (text) => ({
  type: SET_ADD_TODO_TEXT,
  payload: text,
});

export const filterTodos = (title) => ({
  type: FILTER_TODOS,
  payload: title,
});
