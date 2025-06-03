import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginForm} from "@/components/login-form.jsx";
import {SectionCards} from "@/components/section-cards.jsx";
import {EmployeeTable} from "@/components/Employee/EmployeeTable.jsx";
import ReportsPage from "@/components/Report/charts.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/" element = {<App/>} >
                <Route path="" element={<SectionCards/>}/>
                <Route path="/employees" element={<EmployeeTable />}/>
                <Route path="/reports" element={<ReportsPage />}/>

            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
