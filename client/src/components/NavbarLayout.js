import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const  NavbarLayout = () => {
    return (
        <div>
            <NavBar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}
export default NavbarLayout;