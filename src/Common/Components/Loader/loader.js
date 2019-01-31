import React from 'react';
import './loader.css';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='loader-view-wrap'>
                Loading ....
            </div>
        );
    }
}
