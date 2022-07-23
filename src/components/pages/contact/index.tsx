import React from "react";
import {
  createContact,
  deleteContacts,
  getContacts,
} from "../../../utils/services/counselling";
import { getCampuses } from "../../../utils/services/roles";
import Modal from "../../modal";
import PageTitle from "../../pageTitle";
import ContactSkeleton from "./contact.skeleton";
import { ContactInfo, ErrorMessage } from "../../../types/types";
import { DashboardContext } from "../../dashboard";
import { Campus } from "../../../types/types";

function Contact() {
  const { showSnackBar, onPageLoadError } = React.useContext(DashboardContext);
  const [contacts, setContacts] = React.useState<ContactInfo[]>([]);
  const [isEditing, setEdit] = React.useState(false);
  const [campuses, setCampuses] = React.useState<Campus[]>([]);
  const [contactNew, setContactNew] = React.useState<ContactInfo>({
    email: "",
    phone: "",
    name: "",
    campus_id: "",
  });
  const init = async () => {
    const campusRes = await getCampuses();
    if (campusRes.ok) {
      setCampuses(campusRes.response);
    } else {
      const error: ErrorMessage = campusRes.errorMessage;
      onPageLoadError?.({ message: error.message, status: error.status });
    }
    const res = await getContacts();
    if (res.ok) {
      setContacts(res.response);
    } else {
      const error: ErrorMessage = res.errorMessage;
      onPageLoadError?.({ message: error.message, status: error.status });
    }
  };
  React.useEffect(() => {
    init();
  });

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    const res = await createContact({
      ...contactNew,
      campus_id: contactRef.current!.value,
    });
    if (res.ok) {
      setContacts([...contacts, res.response]);
      setEdit(false);
      showSnackBar?.({
        message: "Contact created successfuly!",
        className: "success",
      });
    } else {
      showSnackBar?.({
        message: res.errorMessage.message,
        className: "danger",
      });
    }
  };
  const handleChange = (e: any) => {
    setContactNew({ ...contactNew, [e.target.name]: e.target.value });
  };
  const deleteContactNew = async (contact: ContactInfo) => {
    let r = window.confirm(
      `Are you sure you want to delete contact - ${contact.name}`
    );
    if (r === true) {
      const res = await deleteContacts(contact._id!);
      if (res.ok) {
        const newContact = res.response;
        const updatedContacts = contacts.filter(
          (c) => c._id !== newContact._id
        );
        setContacts(updatedContacts);
        showSnackBar?.({
          message: "Contact deleted successfuly!",
          className: "success",
        });
      } else {
        showSnackBar?.({
          message: res.errorMessage.message,
          className: "danger",
        });
      }
    }
  };
  const contactRef = React.useRef<HTMLSelectElement | null>(null);
  return (
    <div className="mx-auto row mb-5">
      <PageTitle title="Contact" subtitle="contact" />
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
                      <span>{contact.phone}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="material-icons text-primary fs-3 me-2">
                        email
                      </span>
                      <span>{contact.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    onClick={() => deleteContactNew(contact)}
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
          confirm={() => handleSubmit(null)}
        >
          <form onSubmit={handleSubmit}>
            <input
              required
              onChange={handleChange}
              type="text"
              className="form-control mb-3"
              value={contactNew.name}
              placeholder="Name"
              name="name"
            />
            <input
              required
              onChange={handleChange}
              type="email"
              className="form-control mb-3"
              value={contactNew.email}
              placeholder="email"
              name="email"
            />
            <input
              onChange={handleChange}
              type="email"
              className="form-control mb-3"
              value={contactNew.phone}
              placeholder="phone number"
              name="phone"
              required
            />
            <select
              required
              className="form-select mb-2"
              name="campus_id"
              ref={contactRef}
            >
              <option>Select Campus</option>
              {campuses.map((c) => (
                <option key={c._id} value={c._id}>
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
