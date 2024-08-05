import React from "react";
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
const SampleComp = (props) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const packValue = params.get('pack');
    console.error('get params   --->', props.match.params.pack_type, packValue)
    return (
        <></>
    )
}

export default SampleComp;