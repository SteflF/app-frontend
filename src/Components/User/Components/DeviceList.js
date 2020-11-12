import * as React from "react";
import DeviceTable from "./Devices/DeviceTable"
import {DeviceController_GetDevices, DeviceController_CreateDevice} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import { setupToken } from "../../../Kernel/Networking/AxiosApiConfig";
import {Helmet} from "react-helmet";
import {Button} from "react-bootstrap";
import DeviceModal from "./Devices/DeviceModal";
import {toast, ToastContainer} from "react-toastify";

class DeviceList extends React.Component {
    state = {
        devices: [],
        show: false
    }

    async componentDidMount(){
        setupToken();
        const { data: response } = await http.get(DeviceController_GetDevices);

        if (response.result.length !== 0) {
            this.setState({ devices: response.result });
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleShowModal = () => {
        this.setState({ show: true })
    }

    handleCloseModel = () => {
        this.setState({ show: false })
    }

    handleSubmit = async (value) => {
        let device = {name: value};
        setupToken();
        const { data: response } = await http.post(DeviceController_CreateDevice, device);

        if (response.status === 200) {
            let devices = this.state.devices.slice();
            devices.push(response.result);

            toast.success('Creation of new device was successful!');
            this.setState({devices: devices});
        }else {
            toast.error('Something went wrong!');
        }
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Devices</title>
                </Helmet>
                <ToastContainer/>
                {
                    this.state.devices.length === 0
                        ? <h2 className="text-light">No devices</h2>
                        : <DeviceTable devices={this.state.devices} />
                }

                <Button variant="primary" onClick={this.handleShowModal}>
                    Add device
                </Button>

                <DeviceModal title="New device"
                             buttonText="Create"
                             show={this.state.show}
                             onHide={this.handleCloseModel}
                             onSubmit={this.handleSubmit} />
            </React.Fragment>
        )
    }
}

export default DeviceList;