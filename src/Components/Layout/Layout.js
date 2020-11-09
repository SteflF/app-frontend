import * as React from "react";
import Header from "./Components/Header";

const Layout = (props: {children?: React.ReactNode}) => (
    <React.Fragment>
        <div className="bg-dark">
            <Header/>
            <main role="main">
                <div className="container min-vh-100">
                    <div className="row">
                        {props.children}
                    </div>
                </div>
                <div className="footer">
                    <div className="text-center text-light">Footer, s.r.o.</div>
                </div>
            </main>
        </div>
    </React.Fragment>
);

export default Layout;