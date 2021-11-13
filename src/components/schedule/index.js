import Modal from '../modal/index'
import React, { useState } from 'react'
import Card from '../card'
import "./index.css"



function ScheduleItem({ item }) {
    const [openEditModal, open] = useState(false);
    return (
        <div className="schedule my-2 d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
                <i className="material-icons calender">event_note</i>
                <div>
                    <h6 className="my-0">{item.day}</h6>
                    <small className="text-muted">{item.time}</small>
                </div>
            </div>
            <i className="material-icons text-primary btn fs-3" onClick={() => open(true)}>
                edit
            </i>
            {openEditModal &&
                <Modal
                    title={`Select your schedule for ${item.day}`}
                    closeModal={() => open(false)}>
                    <div className="row my-3">
                        <div className="col-6">
                            <select className="form-select" aria-label=".form-select-sm example">
                                {timeRange().map((time) =>
                                    <option value="1">{time}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-6">
                            <select className="form-select" aria-label=".form-select-sm example">
                                {timeRange().map((time) =>
                                    <option value="1">{time}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </Modal>}
        </div>
    )
}


function Schedule() {
    return (
        <Card title="Schedule">
            <ScheduleItem item={{ day: "monday", time: "10:00am - 12:00pm" }} />
            <ScheduleItem item={{ day: "Tuesday", time: "10:00am - 12:00pm" }} />
            <ScheduleItem item={{ day: "Wednesday", time: "10:00am - 12:00pm" }} />
            <ScheduleItem item={{ day: "Thursday", time: "10:00am - 12:00pm" }} />
            <ScheduleItem item={{ day: "Friday", time: "10:00am - 12:00pm" }} />
        </Card>
    )
}

export default Schedule

const timeRange = () => {
    const time = []
    for (let i = 1; i <= 24; ++i) {
        if (i > 12) {
            time.push(`${i - 12}:00 pm`)
            time.push(`${i - 12}:30 pm`)
        }
        else {
            time.push(`${i}:00 am`)
            time.push(`${i}:30 am`)
        }
    }
    return time
}