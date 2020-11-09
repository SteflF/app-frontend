import * as React from "react";
import {Helmet} from "react-helmet";

class Home extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <section className="jumbotron text-center w-100">
                    <h1>Library</h1>
                </section>
                <div className="col-3"></div>
                <div className="text-center text-light col-6">
                    Neco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNecoNeco maloNeco
                </div>
                <div className="col-3"></div>

            </React.Fragment>
        );
    }
}

export default Home;