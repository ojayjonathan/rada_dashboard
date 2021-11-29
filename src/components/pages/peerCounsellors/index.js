import React from "react";
import { USER_ROLES } from "../../../utils/constants";
import { addCounsellor } from "../../../utils/services/counselling.services";
import {
  getCampuses,
  getCounsellors,
} from "../../../utils/services/role.services";
import { queryUser } from "../../../utils/services/user.services";
import { DashboardContext } from "../../dashboard";
import Modal from "../../modal";
import PageTitle from "../../pageTitle";
import { snackBarClasses } from "../../snackar";
import { UserCard } from "../counselors";

function PeerCounsellors() {
  const { roles } = React.useContext(DashboardContext);
  const [PeerCounsellors, setPeerCounsellors] = React.useState([]);
  React.useEffect(() => {
    const init = async () => {
      const res = await getCounsellors(true);
      if (res.counsellors) {
        setPeerCounsellors(res.counsellors);
      }
      const campusRes = await getCampuses();
      if (campusRes.campuses) {
        seCampuses(campusRes.campuses);
      }
    };
    init();
  }, []);
  const [showModal, setShowModal] = React.useState(false);
  const [campuses, seCampuses] = React.useState([]);

  return (
    <div className="mx-2">
      <PageTitle title="Peer Counselors" sutitle="counsellors" />
      <div className="card py-5 px-3">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th Peerscope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Expertise</th>
                {/* <th scope="col">Rating</th> */}
              </tr>
            </thead>
            <tbody>
              {PeerCounsellors.map((counsellor) => (
                <tr key={counsellor.counsellorId}>
                  <th scope="row">{counsellor.peer_counsellorId}</th>
                  <td>{counsellor.name}</td>
                  <td>{counsellor.email}</td>
                  <td>{counsellor.phone}</td>
                  <td>{counsellor.gender}</td>
                  <td>{counsellor.expertise}</td>
                  {/* <td>{counsellor.rating}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {roles.includes(USER_ROLES.admin) && (
          <div className="py-3">
            <button
              className="btn btn-primary d-flex align-items-center py-1"
              onClick={() => setShowModal(true)}
            >
              <span className="material-icons">add</span>
              Add Peer Counsellor
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <AddCounsellorCard campuses={campuses} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default PeerCounsellors;

const AddCounsellorCard = ({ setShowModal, campuses }) => {
  const { showSnackBar } = React.useContext(DashboardContext);
  const [error, setError] = React.useState();
  const [user, setUser] = React.useState();
  const queryUserByEmail = async () => {
    const email = emailRef.current.value;
    if (email) {
      setError(null);
      const res = await queryUser(email);
      if (res.user) {
        setUser(res.user);
      } else {
        setError(res.message);
      }
    } else {
      setError("Email is required");
    }
  };
  const emailRef = React.useRef();
  const campusRef_ = React.useRef();
  const expertiseRef_ = React.useRef();
  const handleAdd = async () => {
    const result = await addCounsellor(
      user._id,
      campusRef_.current.value,
      expertiseRef_.current.value,
      true
    );
    if (result.counsellor) {
      showSnackBar({
        message: result.counsellor.msg,
        className: snackBarClasses.primary,
      });
    } else {
      showSnackBar(result.message, snackBarClasses.danger);
    }
    setShowModal(false);
    setUser(null);
  };
  return (
    <Modal
      title="Add Counsellor"
      closeModal={() => setShowModal(false)}
      confirm={() => setShowModal(false)}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3 input-group">
          <input
            ref={emailRef}
            className="form-control"
            placeholder="User email"
            type="email"
            required
          />
          <button
            onClick={queryUserByEmail}
            className="btn btn-primary py-1 d-flex align-items-center"
          >
            search
            <span className="material-icons">search</span>
          </button>
        </div>
        {user && (
          <div className="form-control">
            <UserCard user={user} />
            <select className="form-select mb-2" ref={campusRef_}>
              <option>Select Campus</option>
              {campuses.map((c) => (
                <option key={c} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              ref={expertiseRef_}
              className="mb-2 form-control"
              placeholder="Expertise"
              required
            />
            <button
              onClick={handleAdd}
              className="mx-auto btn btn-primary py-1 d-flex align-items-center"
            >
              add
              <span className="material-icons">add</span>
            </button>
          </div>
        )}
      </form>

      {error && <small className="text-danger">{error}</small>}
    </Modal>
  );
};
