import React, { FormEvent } from "react";
import { useCreateForum } from "../../rest/hooks/users";
import Button from "../ui/button";
import PageTitle from "../ui/pageTitle";

const CreateForum = () => {
  const { mutate, isLoading, isSuccess } = useCreateForum();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    mutate(new FormData(ref.current!));
  };
  const ref = React.useRef<HTMLFormElement | null>(null);
  isSuccess && ref.current?.reset();

  return (
    <div className="container mx-auto mt-5">
      <PageTitle subtitle="Forumn" title="Create Forum" />
      <div className="card ">
        <div className="card-body">
          <form ref={ref} onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Forum Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="forum name"
                name="title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Photo
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="image"
                placeholder="forum name"
                required
              />
            </div>
            <Button
              buttonType="primary"
              label="Submit"
              loading={isLoading}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForum;
