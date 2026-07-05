import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";
import Suggetion from "../Suggetion";

export default function Layout() {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            
            <div className="w-full h-28 flex flex-col justify-center items-center shrink-0">
                <Header />
                <Navbar />
            </div>

            <div className="flex-1 w-full flex flex-col lg:flex-row min-h-0 p-2">
                
                <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 border border-gray-300 rounded-2xl">
                    <Outlet />
                </div>

                <div className="w-full lg:w-96 h-auto lg:h-full overflow-y-auto p-4 shrink-0">
                    <Suggetion />
                </div>

            </div>
        </div>
    );
}