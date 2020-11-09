import React from "react";
import "./spinner.css"

const LoadingComponent = () => {
    return (
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default LoadingComponent;