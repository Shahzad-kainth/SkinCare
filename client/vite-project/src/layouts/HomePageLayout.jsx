import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
function HomePageLayout(){
    return(
        <>
        <Navbar/>
          <Outlet></Outlet>
         <Footer/>
        </>
    )
}
export default HomePageLayout;