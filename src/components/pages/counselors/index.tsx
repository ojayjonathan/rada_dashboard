import React from "react";
import { useCampuses } from "../../../rest/hooks/admin";
import {
  useAddCounsellor,
  useCounselors,
} from "../../../rest/hooks/counselling";
import { useQueryUserData } from "../../../rest/hooks/users";
import { Campus, User, UserRoles } from "../../../types/types";
import { IMAGE_URL } from "../../../utils/constants";
import { DashboardContext } from "../../dashboard";
import Modal from "../../modal";
import Button from "../../ui/button";
import PageTitle from "../../ui/pageTitle";

function Counsellors() {
  const [showModal, setShowModal] = React.useState(false);
  const { roles, onPageLoadError } = React.useContext(DashboardContext);
  const {
    data: counsellors,
    isLoading,
    error: counselorsError,
  } = useCounselors();
  const { data: campuses, error: campusError } = useCampuses();
  if (campusError || counselorsError) {
    onPageLoadError?.({
      message: campusError?.message ?? counselorsError?.message,
    });
  }

  return (
    <div className="mx-2">
      <PageTitle title="Counselors" subtitle="counsellor" />
      <div className="card  py-5 px-3">
        <div className="table-container">
          <table className="table">
            {isLoading && (
              <thead>
                <tr>Loading...</tr>
              </thead>
            )}
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Expertise</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>
            <tbody>
              {counsellors?.counsellors.map((counsellor) => (
                <tr key={counsellor.counsellorId}>
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
        </div>
        {roles?.map((r) => r.name).includes(UserRoles.Admin) && (
          <div className="py-3">
            <button
              className="btn btn-primary d-flex align-items-center py-1"
              onClick={() => setShowModal(true)}
            >
              <span className="material-icons">add</span>
              Add Counsellor
            </button>
          </div>
        )}
      </div>
      {showModal && (
        <AddCounsellorCard
          campuses={campuses?.campuses ?? []}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export const UserCard = ({ user }: { user: Partial<User> }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <img
          style={{ width: "50px", height: "50px" }}
          className="rounded-circle"
          src={`${IMAGE_URL}${user.profilePic}`}
          alt={user.name}
        />
      </div>
      <div className="w-100 mx-3">{user.name}</div>
    </div>
  );
};

type AddCounsellorProps = {
  campuses: Campus[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCounsellorCard = ({ setShowModal, campuses }: AddCounsellorProps) => {
  const {
    mutate: query,
    data: user,
    isLoading: isMakingQuery,
  } = useQueryUserData();
  const { mutate: addCounsellor, isLoading: isAdding } = useAddCounsellor();
  const queryUserByEmail = async () => {
    const email = emailRef.current!.value;
    if (email) {
      query(email);
    }
  };
  const emailRef = React.useRef<HTMLInputElement>(null);
  const campusRef_ = React.useRef<HTMLSelectElement>(null);
  const expertiseRef_ = React.useRef<HTMLInputElement>(null);
  const handleAdd = async () => {
    addCounsellor({
      user_id: user!.user!._id + "",
      campus_id: campusRef_.current!.value,
      expertise: expertiseRef_.current!.value,
    });
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
            disabled={isMakingQuery}
            onClick={queryUserByEmail}
            className="btn btn-primary py-1 d-flex align-items-center"
          >
            search
            <span className="material-icons">search</span>
          </button>
        </div>
        {user && (
          <div className="form-control">
            <UserCard user={user.user} />
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
            <Button
              label="add"
              loading={isAdding}
              buttonType="primary"
              className="mx-auto btn btn-primary py-1 d-flex align-items-center"
              onClick={handleAdd}
            />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default Counsellors;
