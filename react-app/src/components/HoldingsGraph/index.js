import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2"
import "./HoldingsGraph.css"

function HoldingsGraph(props) {
    const [graphData, setGraphData] = useState([])
    const [loading, setLoading] = useState(true);

    const user = props?.user

    useEffect(() => {
        if (props.user) {
            async function getHoldingsData(user) {
                console.log(user.user.id);
                const res = await fetch(`/api/holdings/${user.user.id}`)

                if (res.ok) {
                    const data = await res.json();
                    console.log(data.data);
                    setGraphData(data.data);
                }
                setLoading(false);
            }
            getHoldingsData(user);
        }
    }, [user, props.user])

    const data = {
        labels: ["8 weeks", "7 weeks","6 weeks","5 weeks", "4 weeks", "3 weeks", "2 weeks", "1 weeks", "0 weeks"],
        datasets: [
            {
                label: "",
                data: graphData,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        title: {
            display: false,
            text: ""
        }
    }

    const legend = {
        display: false
    }

    if (loading) return null

    return (
        <>
            <Line data={data} legend={legend} options={options} />
        </>
    )
}

export default HoldingsGraph
