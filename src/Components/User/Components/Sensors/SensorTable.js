import * as React from "react";
import SensorListItem from "./SensorListItem"

class SensorTable extends React.Component {
    state = {
        books: this.props.books
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
                {this.state.books.map(book => (
                    <SensorListItem key={book.id} id={book.id} name={book.name}></SensorListItem>
                ))}
                </tbody>
            </table>
        );
    }
}

export default SensorTable;