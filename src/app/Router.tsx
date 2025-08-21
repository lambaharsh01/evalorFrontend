import { Routes, Route } from "react-router-dom"

// import SignInPage from "@/modules/auth/pages/SigninPage"

// import SigninPage from "@/modules/auth/pages/SignInPage"
import Dashboard from "@/modules/dashboard/pages/mainDashboard"

export default function Router() {
    return <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<SigninPage />} /> */}
    </Routes>
}
