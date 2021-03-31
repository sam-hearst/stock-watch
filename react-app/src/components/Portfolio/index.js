import React, {useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getHoldings } from '../../store/holdings';
function Portfolio() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHoldings()); 
    })

    return (
        <h1>I'm working!!</h1>
    )
}


export default Portfolio
