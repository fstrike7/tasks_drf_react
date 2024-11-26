import axios from "axios";
const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";
const getCookie = (key) => {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
};
const tasksApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/tasks/`,
  headers: {
    "X-UserID": getCookie("user"),
    "Content-Type": "application/json",
  },
});
export const getAllTasks = () => tasksApi.get("/");

export const createTask = (task) => tasksApi.post("/", task);

export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

export const updateTask = (id, data) => tasksApi.put(`/${id}/`, data);

export const getTask = (id) => tasksApi.get(`/${id}/`);
