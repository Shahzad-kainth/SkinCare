import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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