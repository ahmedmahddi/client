import { ReactElement,PropsWithChildren } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const LandingLayout = ({ children }: PropsWithChildren): ReactElement => {
    return (
        <div className="page-wrapper">
            <Header />
            <div>
                <main>{children}</main>
            </div>
            <Footer /> 
        </div>
    )
}

export default LandingLayout;