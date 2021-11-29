import React from "react";
import {
  createContact,
  deleteContacts,
  getContacts,
} from "../../../utils/services/counselling.services";
import { getCampuses } from "../../../utils/services/role.services";
import Modal from "../../modal";
import PageTitle from "../../pageTitle";
import { DashboardContext } from "../../dashboard/index";
import { snackBarClasses } from "../../snackar";
import SkeletonWrapper from "../../skeleton/skeletonWrapper";
import ContactSkeleton from "./contact.skeleton";

function Contact() {
  const { showSnackBar } = React.useContext(DashboardContext);
  const [contacts, setContacts] = React.useState();
  const [isEditing, setEdit] = React.useState(false);
  const [campuses, setCampuses] = React.useState([]);
  const [contact_, setContact_] = React.useState({
    email: "",
    phone: "",
    name: "",
    campus_id: "",
  });
  React.useEffect(() => {
    const init = async () => {
      const campusRes = await getCampuses(contact_);
      if (campusRes.campuses) {
        setCampuses(campusRes.campuses);
      }
      const res = await getContacts();
      if (res.contact) {
        setContacts(res.contact);
      }
    };
    init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createContact({
      ...contact_,
      campus_id: campusRef.current.value,
    });
    if (res.contact) {
      setContacts([...contacts, res.contact]);
      setEdit(false);
      showSnackBar("Contact created successfuly!", snackBarClasses.success);
    } else {
      showSnackBar(res.message, snackBarClasses.danger);
    }
  };
  const handleChange = (e) => {
    setContact_({ ...contact_, [e.target.name]: e.target.value });
  };
  const deleteContact_ = async (contact) => {
    let r = window.confirm(
      `Are you sure you want to delete contact - ${contact.name}`
    );
    if (r == true) {
      const res = await deleteContacts(contact._id);
      if (res.contact) {
        const updatedContacts = contacts.filter(
          (c) => c._id !== res.contact._id
        );
        setContacts(updatedContacts);
        showSnackBar("Contact deleted successfuly!", snackBarClasses.success);
      } else {
        showSnackBar(res.message, snackBarClasses.danger);
      }
    }
  };
  const campusRef = React.useRef();
  return (
    <div className="mx-auto row mb-5">
      <PageTitle title="Contact" sutitle="contact" />
      {!contacts && (
        <>
          <ContactSkeleton />
          <ContactSkeleton />
          <ContactSkeleton />
        </>
      )}
      {contacts &&
        contacts.map((contact) => (
          <div className="col-12  col-lg-6 mb-3">
            <div className="card">
              <div className="card-body d-flex">
                <div className="w-100">
                  <h5 className="text-capitalize">{contact.name}</h5>
                  <div className="ms-2 text-muted">
                    <div className="d-flex align-items-center">
                      <span className="material-icons text-primary me-2">
                        phone
                      </span>
                      <span>{contact.email}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons text-primary fs-3 me-2">
                        email
                      </span>
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    onClick={() => deleteContact_(contact)}
                    className="material-icons btn text-danger fs-3"
                  >
                    delete
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => setEdit(true)}>
          Create New Contact
        </button>
      </div>
      {isEditing && (
        <Modal
          title="Create Contact"
          closeModal={() => setEdit(false)}
          confirm={handleSubmit}
        >
          <form onSubmit={handleSubmit}>
            <input
              required
              onChange={handleChange}
              type="text"
              className="form-control mb-3"
              value={contact_.name}
              placeholder="Name"
              name="name"
            />
            <input
              required
              onChange={handleChange}
              type="email"
              className="form-control mb-3"
              value={contact_.email}
              placeholder="email"
              name="email"
            />
            <input
              onChange={handleChange}
              type="email"
              className="form-control mb-3"
              value={contact_.phone}
              placeholder="phone number"
              name="phone"
              required
            />
            <select
              required
              className="form-select mb-2"
              name="campus_id"
              ref={campusRef}
            >
              <option>Select Campus</option>
              {campuses.map((c) => (
                <option key={c} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Contact;
