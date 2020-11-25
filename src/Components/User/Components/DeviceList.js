import * as React from "react";
import DeviceTable from "./Devices/DeviceTable"
import {DeviceController_GetDevices, DeviceController_CreateDevice, DeviceController_EditDevice, DeviceController_DeleteDevice} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import { setupToken } from "../../../Kernel/Networking/AxiosApiConfig";
import {Helmet} from "react-helmet";
import {Button} from "react-bootstrap";
import DeviceModal from "./Devices/DeviceModal";
import {toast, ToastContainer} from "react-toastify";

class DeviceList extends React.Component {
    state = {
        devices: [],
        deviceToEdit: { id: '', name: ''},
        show: false,
        modalAction: '',
        modalTitle: '',
        modalButtonText: ''
    }

    async componentDidMount(){
        setupToken();
        const { data: response } = await http.get(DeviceController_GetDevices);

        if (response.result.length !== 0) {
            this.setState({ devices: response.result });
        }
    }

    showDeviceModal = (device, action) => {
        if (action === 'create') {
            this.setState({
                deviceToEdit: { id: '', name: ''},
                show: true,
                modalAction: action,
                modalTitle: 'Vytvořit produkt',
                modalButtonText: "Vytvořit"
            });
        }else if (action === 'edit') {
            this.setState({
                deviceToEdit: device,
                show: true,
                modalAction: action,
                modalTitle: 'Upravit produkt',
                modalButtonText: 'Upravit'
            });
        }else {
            this.setState({
                deviceToEdit: device,
                show: true,
                modalAction: action,
                modalTitle: 'Smazat produkt',
                modalButtonText: 'Smazat'
            });
        }
    }

    handleCloseModel = () => {
        this.setState({ show: false })
    }

    handleSubmit = async (device) => {
        setupToken();
        const action = this.state.modalAction;

        if (action === 'create') {
            const { data: response } = await http.post(DeviceController_CreateDevice, device);

            if (response.status === 200) {
                toast.success('Creation of new device was successful!');
                this.setState({devices: [...this.state.devices, response.result]});
            }else {
                toast.error('Something went wrong!');
            }
        }else if (action === 'edit') {
            const { data: response } = await http.put(DeviceController_EditDevice(this.state.deviceToEdit.id), device);

            if (response.status === 200) {
                const devices = [...this.state.devices];
                const index = devices.indexOf(this.state.deviceToEdit);
                devices[index].name = device.name;

                toast.success('The device was successfully edited!');
                this.setState({ devices });
            }else {
                toast.error('Something went wrong!');
            }
        }else if (action === 'remove') {
            const { data: response } = await http.delete(DeviceController_DeleteDevice(this.state.deviceToEdit.id));

            if (response.status === 200) {
                const devices = this.state.devices.filter(d => d.id !== device.id);

                toast.success('The device was successfully removed!');
                this.setState({ devices });
            }else {
                toast.error('Something went wrong!');
            }
        }

        this.setState({ show: false });
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Devices</title>
                </Helmet>
                <div className="container">
                    <ToastContainer/>

                    <div className="row">
                        <h2 className="text-light">Devices</h2>
                    </div>

                    <div className="row">
                        {
                            this.state.devices.length === 0
                                ? <h2 className="text-light">No devices</h2>
                                : <DeviceTable devices={this.state.devices}
                                               onButtonClick={this.showDeviceModal} />
                        }
                    </div>

                    <Button variant="primary" onClick={() => this.showDeviceModal(null, 'create')}>
                        Add device
                    </Button>

                    <DeviceModal title={this.state.modalTitle}
                                 action={this.state.modalAction}
                                 buttonText={this.state.modalButtonText}
                                 device={this.state.deviceToEdit}
                                 show={this.state.show}
                                 onHide={this.handleCloseModel}
                                 onSubmit={this.handleSubmit} />
                </div>
            </React.Fragment>
        )
    }
}

export default DeviceList;