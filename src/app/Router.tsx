import { Routes, Route } from "react-router-dom"

// import SignInPage from "@/modules/auth/pages/SigninPage"

// import SigninPage from "@/modules/auth/pages/SignInPage"
import Dashboard from "@/modules/dashboard/pages/mainDashboard"
import EVRManual from "@/modules/evr/manualCreation/pages/evrManual"
import ERForm from "@/modules/evr/evaluation/pages/evrForm"
import EvrFormCreation from "@/modules/evr/manualCreation/pages/evrFormCreation"
import Signin from "@/modules/auth/pages/Signin"
import ForgotPasswordFlow from "@/modules/auth/pages/ForgotPassword"

export default function Router() {
    return <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/password-reset" element={<ForgotPasswordFlow />} />
        <Route path="/evr-manual" element={<EVRManual />} />
        <Route path="/evr-form-creation/:id" element={<EvrFormCreation />} />
        <Route path="/evr-form" element={<ERForm />} />
        {/* <Route path="/" element={<SigninPage />} /> */}
    </Routes>
}
