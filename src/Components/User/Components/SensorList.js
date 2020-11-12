import * as React from "react";
import SensorTable from "./Sensors/SensorTable"
import {SensorController_GetSensors} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import {Helmet} from "react-helmet";
import {setupToken} from "../../../Kernel/Networking/AxiosApiConfig";

class SensorList extends React.Component {
    state = {
        authors: []
    }

    async componentDidMount(){
        setupToken();
        const { data: authors } = await http.get(SensorController_GetSensors);

        console.log("authors: ", authors);

        this.setState({ authors: authors.result });
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Sensors</title>
                </Helmet>
                {
                    this.state.authors.length === 0
                    ? <h2 className="text-light">No authors</h2>
                    : <SensorTable books={this.state.authors} />
                }
            </React.Fragment>
        )
    }
}

export default SensorList;