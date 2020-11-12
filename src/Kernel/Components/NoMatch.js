import React, {useEffect} from 'react';

const NoMatch = () => {

    useEffect(() => {
        document.title = 'Strana nenalezena';
    });

    return (
        <div className="notfound">
            <h1 className="text-center mt-5">404 - Not Found</h1>
        </div>
    );
}

export default NoMatch;