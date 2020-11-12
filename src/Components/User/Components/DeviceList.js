import * as React from "react";
import DeviceTable from "./Devices/DeviceTable"
import {DeviceController_GetDevices} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import { setupToken } from "../../../Kernel/Networking/AxiosApiConfig";
import {Helmet} from "react-helmet";

class DeviceList extends React.Component {
    state = {
        books: []
    }

    async componentDidMount(){
        setupToken();
        const { data: result } = await http.get(DeviceController_GetDevices);

        console.log("books: ", result);

        this.setState({ books: result.result });
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Devices</title>
                </Helmet>
                {
                    this.state.books.length === 0
                        ? <h2 className="text-light">No books</h2>
                        : <DeviceTable books={this.state.books} />
                }
            </React.Fragment>
        )
    }
}

export default DeviceList;