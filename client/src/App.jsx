import { Navigation } from "./components/Navigation"
import { TaskFormPage } from "./pages/TaskFormPage"
import { TasksPage } from "./pages/TasksPage"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import { useEffect } from "react"
import { v4 as uuid } from "uuid"

function App() {
  const [cookies, setCookie] = useCookies(['user'])
  useEffect(() => {
    if (!cookies.user) setCookie('user', uuid(), { path: '/' })
  }, [])
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation/>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks"/>}/>
          <Route path="/tasks" element={<TasksPage/>}/>
          <Route path="/tasks-create" element={<TaskFormPage/>}/>
          <Route path="/tasks/:id" element={<TaskFormPage/>}/>
        </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  )
}

export default App