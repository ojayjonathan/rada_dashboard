import React from "react";
import {
  Campus,
  ErrorMessage,
  PeerCounsellor,
  User,
  UserRoles,
} from "../../../types/types";
import { addCounsellor } from "../../../utils/services/counselling";
import { getCampuses, getPeerCounsellors } from "../../../utils/services/roles";
import { queryUser } from "../../../utils/services/user";
import { DashboardContext } from "../../dashboard";
import Modal from "../../modal";
import PageTitle from "../../pageTitle";
import { UserCard } from "../counselors";

function PeerCounsellors() {
  const { roles, onPageLoadError } = React.useContext(DashboardContext);
  const [PeerCounsellors, setPeerCounsellors] = React.useState<
    PeerCounsellor[]
  >([]);
  const init = async () => {
    const res = await getPeerCounsellors();
    if (res.ok) {
      setPeerCounsellors(res.response);
    } else {
      const error: ErrorMessage = res.errorMessage;
      onPageLoadError?.({ message: error.message, status: error.status });
    }
    const campusRes = await getCampuses();
    if (campusRes.ok) {
      seCampuses(campusRes.response);
    } else {
      const error: ErrorMessage = campusRes.errorMessage;
      onPageLoadError?.({ message: error.message, status: error.status });
    }
  };
  React.useEffect(() => {
    init();
  });
  const [showModal, setShowModal] = React.useState(false);
  const [campuses, seCampuses] = React.useState<Campus[]>([]);

  return (
    <div className="mx-2">
      <PageTitle title="Peer Counselors" subtitle="counsellors" />
      <div className="card py-5 px-3">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Expertise</th>
                {/* <th scope="col">Rating</th> */}
              </tr>
            </thead>
            <tbody>
              {PeerCounsellors.map((counsellor) => (
                <tr key={counsellor.peerCounsellorId}>
                  <th scope="row">{counsellor.peerCounsellorId}</th>
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
        {roles?.includes(UserRoles.Admin) && (
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

type AddCounsellorProps = {
  campuses: Campus[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCounsellorCard = ({ setShowModal, campuses }: AddCounsellorProps) => {
  const { showSnackBar } = React.useContext(DashboardContext);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<Partial<User>>();
  const queryUserByEmail = async () => {
    const email = emailRef.current!.value;
    if (email) {
      setError(null);
      const res = await queryUser(email);
      if (res.ok) {
        setUser(res.response);
      } else {
        setError(res.errorMessage.message);
      }
    } else {
      setError("Email is required");
    }
  };
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const campusRef_ = React.useRef<HTMLSelectElement | null>(null);
  const expertiseRef_ = React.useRef<HTMLInputElement | null>(null);
  const handleAdd = async () => {
    const result = await addCounsellor(
      user!._id!,
      campusRef_.current!.value,
      expertiseRef_.current!.value
    );
    if (result.ok) {
      showSnackBar?.({
        className: "success",
        message: "Counsellor added successfuly",
      });
    } else {
      showSnackBar?.({
        className: "danger",
        message: result.errorMessage.message,
      });
    }
    setShowModal(false);
    setUser({});
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
              {campuses.map((c: Campus) => (
                <option key={c._id} value={c._id}>
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
