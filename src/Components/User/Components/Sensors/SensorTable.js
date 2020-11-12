import * as React from "react";
import SensorListItem from "./SensorListItem"

class SensorTable extends React.Component {
    state = {
        sensors: this.props.sensors
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
                {this.state.sensors.map(sensor => (
                    <SensorListItem key={sensor.id} id={sensor.id} name={sensor.name}></SensorListItem>
                ))}
                </tbody>
            </table>
        );
    }
}

export default SensorTable;