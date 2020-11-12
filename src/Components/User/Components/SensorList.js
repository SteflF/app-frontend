import * as React from "react";
import SensorTable from "./Sensors/SensorTable"
import {SensorController_GetSensors} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import {Helmet} from "react-helmet";
import {setupToken} from "../../../Kernel/Networking/AxiosApiConfig";

class SensorList extends React.Component {
    state = {
        sensors: []
    }

    async componentDidMount(){
        setupToken();
        const { data: sensors } = await http.get(SensorController_GetSensors);

        console.log("sensors: ", sensors);

        this.setState({ sensors: sensors.result });
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Sensors</title>
                </Helmet>
                {
                    this.state.sensors.length === 0
                    ? <h2 className="text-light">No sensors</h2>
                    : <SensorTable books={this.state.sensors} />
                }
            </React.Fragment>
        )
    }
}

export default SensorList;