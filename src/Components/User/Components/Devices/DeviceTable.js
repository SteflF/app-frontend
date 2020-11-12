import * as React from "react";
import DeviceListItem from "./DeviceListItem"

class DeviceTable extends React.Component {
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
                    {
                        this.state.books.map(book => (<DeviceListItem key={book.id} id={book.id} name={book.name} />))
                    }
                </tbody>
            </table>
        );
    }
}

export default DeviceTable;