import React from 'react'
import PieChart from '../../charts/piechart'
import SmallStats from '../../charts/smallStat';
import Chats from '../../chats';
import Forums from '../../forums';
import Layout from '../../layout';
import Schedule from '../../schedule';

function Home() {
    const data = {
        labels: ["O25", "U25"],
        datasets: [
            {
                data: [14, 10],
                backgroundColor: [
                    "rgba(45,203,126,0.9)",
                    "rgba(45,203,126,0.5)",

                ],
            },
        ],
    };
    const SmallStatData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                backgroundColor: "rgba(45,203,126,0.3)",
                borderColor: "rgba(45,203,126,1)",
                data: [0, 10, 5, 2, 20, 30, 45],
                fill: true,
            },
        ],
    };
    return (
        <Layout>
            <div className="container ">
                <h3 className="my-5">Welcome back, Brian</h3>
                <div className="row">
                    <div className="col-12 col-sm-4  mb-4">
                        <PieChart data={data} title="Age Comparison" />
                    </div>
                    <div className="col-12 col-sm-4 mb-4">
                        <PieChart data={data} title="Gender" />
                    </div>
                    <div className="col-12 col-sm-4 mb-4">
                        <SmallStats data={SmallStatData} label="User Online" value="30" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-sm-6 col-lg-5 mb-4">
                        <Schedule />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-7 mb-4">
                        <Chats />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-sm-6 col-lg-5 mb-4">
                    <Forums />
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Home
