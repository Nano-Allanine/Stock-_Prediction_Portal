import Footer from "./Layout/Footer";
import Navbar from "./Layout/Navbar";
import AppRoutes from "./Routes/AppRoutes";

export default function App (){
  return(
    <>
    <Navbar />
    <AppRoutes/>
    <Footer />
    </>
  )
}