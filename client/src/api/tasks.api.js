import axios from 'axios'

const getCookie = (key) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
    headers: {
        'X-UserID': getCookie('user'),
        'Content-Type': 'application/json',
    },
})
export const getAllTasks = () => tasksApi.get('/')

export const createTask = (task) => tasksApi.post('/', task)

export const deleteTask = (id) => tasksApi.delete(`/${id}/`)

export const updateTask = (id, data) => tasksApi.put(`/${id}/`, data)

export const getTask = (id) => tasksApi.get(`/${id}/`)