import { Routes, Route, Navigate } from "react-router-dom";
import { MarvelPage } from "../heroes/pages/MarvelPage";
import { DcPage } from "../heroes/pages/DcPage";
import { LoginPage } from "../auth/pages/LoginPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="marvel" element={ <MarvelPage /> } />
        <Route path="dc" element={ <DcPage /> } />

        <Route path="login" element={ <LoginPage /> } />
        <Route path="/" element={ <Navigate to="/marvel" /> } />
      </Routes>
    </>
  )
}
