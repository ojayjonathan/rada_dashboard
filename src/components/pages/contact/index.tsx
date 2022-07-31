import React from "react";

import Modal from "../../modal";
import ContactSkeleton from "./contact.skeleton";
import { ContactInfo } from "../../../types/types";
import { DashboardContext } from "../../dashboard";
import PageTitle from "../../ui/pageTitle";
import {
  useCampuses,
  useContacts,
  useCreateContact,
  useDeleteContact,
} from "../../../rest/hooks/admin";

function Contact() {
  const { onPageLoadError } = React.useContext(DashboardContext);
  const [isEditing, setEdit] = React.useState(false);
  const [contactNew, setContactNew] = React.useState<Partial<ContactInfo>>({});

  const { data: contacts, error: contactError, isLoading } = useContacts();
  const { data: campuses, error: campusError } = useCampuses();
  const { mutate: createContact } = useCreateContact();
  const { mutate: deleteContact } = useDeleteContact();
  if (contactError || campusError) {
    onPageLoadError?.({
      message: contactError?.message ?? campusError?.message,
    });
  }

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    createContact({
      ...(contactNew as ContactInfo),
      campus_id: contactRef.current!.value,
    });
  };
  const handleChange = (e: any) => {
    setContactNew({ ...contactNew, [e.target.name]: e.target.value });
  };

  const contactRef = React.useRef<HTMLSelectElement | null>(null);
  return (
    <div className="mx-auto row mb-5">
      <PageTitle title="Contact" subtitle="contact" />
      {isLoading && (
        <>
          <div className="col-12  col-lg-6 mb-3">
            <ContactSkeleton />
          </div>
          <div className="col-12  col-lg-6 mb-3">
            <ContactSkeleton />
          </div>
          <div className="col-12  col-lg-6 mb-3">
            <ContactSkeleton />
          </div>
        </>
      )}
      {contacts?.contacts.map((contact) => (
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
                <i
                  role="button"
                  onClick={() => deleteContact(contact._id + "")}
                  className="material-icons text-danger fs-3"
                >
                  delete
                </i>
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
              {campuses?.campuses.map((c) => (
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
