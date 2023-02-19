import { Outlet } from "react-router-dom"
import useTitle from "../hooks/useTitle"
import DashFooter from "./DashFooter"
import DashHeader from "./DashHeader"


const DashLayout = () => {
  useTitle('XYZ Tech Company - Dashboard')
  return (
   <>
     <DashHeader />
    <div className="dash-container">
        <Outlet />
    </div>
         <DashFooter />
   </>
  )
}

export default DashLayout
