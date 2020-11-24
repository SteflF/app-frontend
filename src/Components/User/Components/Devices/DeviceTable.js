import * as React from "react";
import DeviceListItem from "./DeviceListItem"

class DeviceTable extends React.Component {
    state = {
        devices: this.props.devices
    };

    render() {
        return (
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.state.devices.map(device => (<DeviceListItem key={device.id}
                                                                          device={device}
                                                                          onButtonClick={this.props.onButtonClick}
                        />))
                    }
                </tbody>
            </table>
        );
    }
}

export default DeviceTable;