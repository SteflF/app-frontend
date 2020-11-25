import * as React from "react";
import {setupToken} from "../../../../Kernel/Networking/AxiosApiConfig";
import http from "../../../../Kernel/Networking/HttpService";
import {
    DeviceController_GetDevice,
    SensorController_GetDeviceSensors,
    SensorController_CreateSensor,
    SensorController_EditSensor,
    SensorController_DeleteSensor } from "../../../../ApiClient/routes";
import {Button} from "react-bootstrap";
import {Helmet} from "react-helmet";
import {toast, ToastContainer} from "react-toastify";
import SensorTable from "../Sensors/SensorTable";
import SensorModal from "../Sensors/SensorModal";

class DeviceDetail extends React.Component{
    state = {
        device: { id: '', name: '' },
        sensor: { id: '', name: '' },
        sensors: [],
        showModal: false,
        modalAction: '',
        modalTitle: '',
        modalButtonText: ''
    }

    async componentDidMount() {
        setupToken();
        const { id } = this.props.match.params;
        const { data: response } = await http.get(DeviceController_GetDevice(id));

        if (response.result.length !== 0) {
            const { data: sensors } = await http.get(SensorController_GetDeviceSensors(id));

            if (sensors.result.length !== 0) {
                this.setState({ device: response.result, sensors: sensors.result });
            }else {
                this.setState({ device: response.result });
            }
        }
    }

    handleCloseModel = () => {
        this.setState({ showModal: false });
    }

    showSensorModal = (sensor, action) => {
        if (action === 'create') {
            this.setState({
                sensor: { id: '', name: ''},
                showModal: true,
                modalAction: action,
                modalTitle: 'Vytvořit senzor',
                modalButtonText: "Vytvořit"
            });
        }else if (action === 'edit') {
            this.setState({
                sensor: sensor,
                showModal: true,
                modalAction: action,
                modalTitle: 'Upravit senzor',
                modalButtonText: 'Upravit'
            });
        }else {
            this.setState({
                sensor: sensor,
                showModal: true,
                modalAction: action,
                modalTitle: 'Smazat senzor',
                modalButtonText: 'Smazat'
            });
        }
    }

    handleSubmit = async (sensor) => {
        setupToken();
        const action = this.state.modalAction;

        if (action === 'create') {
            sensor = { deviceId: this.state.device.id, name: sensor.name };
            const { data: response } = await http.post(SensorController_CreateSensor, sensor);

            if (response.status === 200) {
                toast.success('Creation of new sensor was successful!');
                this.setState({sensors: [...this.state.sensors, response.result]});
            }else {
                toast.error('Something went wrong!');
            }
        }else if (action === 'edit') {
            sensor = { deviceId: this.state.device.id, name: sensor.name };
            const { data: response } = await http.put(SensorController_EditSensor(this.state.sensor.id), sensor);

            if (response.status === 200) {
                const sensors = [...this.state.sensors];
                const index = sensors.indexOf(this.state.sensor);
                sensors[index].name = sensor.name;

                toast.success('The sensor was successfully edited!');
                this.setState({ sensors });
            }else {
                toast.error('Something went wrong!');
            }
        }else if (action === 'remove') {
            const { data: response } = await http.delete(SensorController_DeleteSensor(this.state.sensor.id));

            if (response.status === 200) {
                const sensors = this.state.sensors.filter(d => d.id !== sensor.id);

                toast.success('The sensor was successfully removed!');
                this.setState({ sensors });
            }else {
                toast.error('Something went wrong!');
            }
        }

        this.setState({ showModal: false });
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Device</title>
                </Helmet>
                <div className="container">
                    <ToastContainer/>
                    <div className="row">
                        <h2 className="text-light">Device: {this.state.device.name}</h2>
                    </div>

                    <div className="row">
                        <h3 className="text-light">Sensors:</h3>
                    </div>

                    <div className="row">
                        {
                            this.state.sensors.length !== 0
                            ? <SensorTable
                                    sensors={this.state.sensors}
                                    onButtonClick={this.showSensorModal}
                                />
                            : <text className="text-danger">No sensors</text>
                        }
                    </div>

                    <div className="row mt-2">
                        <Button className="btn btn-primary" onClick={() => this.showSensorModal(null, 'create')}>
                            Add sensor
                        </Button>
                    </div>

                    <SensorModal title={this.state.modalTitle}
                                 action={this.state.modalAction}
                                 buttonText={this.state.modalButtonText}
                                 sensor={this.state.sensor}
                                 show={this.state.showModal}
                                 onHide={this.handleCloseModel}
                                 onSubmit={this.handleSubmit} />

                </div>

            </React.Fragment>
        );
    }
}

export default DeviceDetail;