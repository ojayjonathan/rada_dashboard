import Modal from "../modal/index";
import React, { useState } from "react";
import Card from "../card";
import "./index.css";
import { DashboardContext } from "../dashboard";
import {
  getCounsellor,
  updateSchedule,
} from "../../utils/services/role.services";

function ScheduleItem({ item, openModel }) {
  return (
    <div className="schedule my-2 d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-between align-items-center">
        <i className="material-icons calender">event_note</i>
        <div>
          <h6 className="my-0 text-capitalize">{item.day}</h6>
          <small className="text-muted">{`${item.active.from} - ${item.active.from}`}</small>
        </div>
      </div>
      <i
        className="material-icons text-primary btn fs-3"
        onClick={() => openModel(item)}
      >
        edit
      </i>
    </div>
  );
}

function Schedule() {
  const { user } = React.useContext(DashboardContext);
  const [schedule, setSchedule] = React.useState({});
  const [openEditModal, open] = useState(false);
  const from_ = React.useRef();
  const to_ = React.useRef();
  const day_ = React.useRef();
  React.useEffect(() => {
    const init = async () => {
      //TODO - remove hardcorded value
      const res = await getCounsellor(1);
      if (res.counsellor) {
        const scheduleObj = {};
        res.counsellor.Schedule.map((item) => (scheduleObj[item.day] = item));
        setSchedule(scheduleObj);
      }
    };
    init();
  }, []);

  const update = async () => {
    const newItem = {
      day: day_.current.value,
      active: {
        from: from_.current.value,
        to: to_.current.value,
      },
    };
    let schedule_ = { ...schedule, [newItem.day]: newItem };
    setSchedule(schedule_);
    open(false);
    const res = await updateSchedule(Object.values(schedule_));
    //TODO - show success message
  };

  return (
    <Card title="Schedule">
      {Object.values(schedule).map((item, i) => (
        <ScheduleItem item={item} key={i} openModel={() => open(true)} />
      ))}
      <button
        className="btn btn-primary d-flex align-items-center py-0"
        onClick={() => open(true)}
      >
        Add
        <span className="material-icons">add</span>
      </button>
      {openEditModal && (
        <Modal
          title="Update schedule"
          closeModal={() => open(false)}
          confirm={update}
        >
          <div className="row my-3">
            <div className="my-3">
              <select className="form-select" ref={day_}>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <select className="form-select" ref={from_}>
                {timeRange().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <select className="form-select" ref={to_}>
                {timeRange().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}

export default Schedule;

const timeRange = () => {
  const time = [];
  for (let i = 1; i <= 24; ++i) {
    if (i > 12) {
      time.push(`${i - 12}:00 pm`);
      time.push(`${i - 12}:30 pm`);
    } else {
      time.push(`${i}:00 am`);
      time.push(`${i}:30 am`);
    }
  }
  return time;
};

const days = ["monday", "tuesday", "wednesday", "tursday", "friday"];
