import React, { FormEvent } from "react";
import { useCreateNews } from "../../../rest/hooks/content";
import Button from "../../ui/button";
import PageTitle from "../../ui/pageTitle";

function CreateNews() {
  const { mutate: create, isLoading, isSuccess } = useCreateNews();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    create(new FormData(ref.current!));
  };
  const ref = React.useRef<HTMLFormElement | null>(null);
  isSuccess && ref.current?.reset();
  return (
    <div className="mx-2">
      <PageTitle title="Create News" subtitle="News" />
      <div  className="card">
        <form ref={ref} className="card-body container-md" onSubmit={submit}>
          <input
            className="form-control my-3"
            placeholder="title"
            name="title"
            required={true}
          />
          <textarea
            required={true}
            className="form-control my-3"
            placeholder="write something..."
            name="content"
          ></textarea>
          <div className="py-2">
            <label htmlFor="file" className="form-label">
              News Image
            </label>
            <input
              name="image"
              type="file"
              className="form-control"
              id="file"
              required={true}
            />
          </div>
          <div className="d-flex justify-content-center">
            <Button
              disabled={isLoading}
              label="Submit"
              loading={isLoading}
              type="submit"
              buttonType="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNews;
