import React from "react";
import { USER_ROLES } from "../../../utils/constants";
import { getCounsellors } from "../../../utils/services/role.services";
import { DashboardContext } from "../../dashboard";
import PageTitle from "../../pageTitle";

function Counsellors() {
  const { roles } = React.useContext(DashboardContext);
  const [counsellors, setCounsellors] = React.useState([]);
  React.useEffect(() => {
    const init = async () => {
      const res = await getCounsellors();
      if (res.counsellors) {
        setCounsellors(res.counsellors);
      }
    };
    init();
  }, []);

  return (
    <div className="container mx-auto">
      <PageTitle title="Counselors" sutitle="counsellor" />
      <div className="card mx-2 py-5 px-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
              <th scope="col">Expertise</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.map((counsellor) => (
              <tr key={counsellor.counsellorId}>
                <th scope="row">{counsellor.counsellorId}</th>
                <td>{counsellor.name}</td>
                <td>{counsellor.email}</td>
                <td>{counsellor.phone}</td>
                <td>{counsellor.gender}</td>
                <td>{counsellor.expertise}</td>
                <td>{counsellor.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {roles.includes(USER_ROLES.admin) && (
          <div className="py-3">
            <button className="btn btn-primary d-flex align-items-center py-1">
              <span className="material-icons">add</span>
              Add Counsellor
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Counsellors;
