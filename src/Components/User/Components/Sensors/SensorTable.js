import * as React from "react";
import SensorListItem from "./SensorListItem"

class SensorTable extends React.Component {
    render() {
        return (
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Measurement</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {this.props.sensors.map(sensor => (
                        <SensorListItem key={sensor.id}
                                        sensor={sensor}
                                        onButtonClick={this.props.onButtonClick}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}

export default SensorTable;