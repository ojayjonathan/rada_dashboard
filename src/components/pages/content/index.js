import React from "react";
import PageTitle from "../../pageTitle";
import img from "../../../assets/images/image.webp";
import "./index.css";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";

const ContentCard = ({ item }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current.innerHTML = item.content;
  });
  return (
    <div className="card">
      <div className="content-image">
        <img className="card-img-top" src={item.imageSrc} alt={item.category} />
      </div>
      <div className="card-body">
        <span className="content-category">{item.category}</span>
        <p className="text-muted" ref={ref}></p>
        <div>
          <Link
            to={{ pathname: APP_ROUTES.createContent, state: item }}
            className="btn btn-primary fs-6 py-1 px-4"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Content() {
  const blogItems = [
    {
      imageSrc: img,
      title: "New Blog",
      subTitle: "",
      category: "Drug Abuse",
      content:
        "<p class='text-muted'>Html Well, the way they make shows is, they make one show </p>",
    },
  ];

  return (
    <div className="container">
      <PageTitle title="Content" sutitle="content" />
      <div className="row">
        {blogItems.map((item, key) => (
          <div key={key} className="col-12 col-md-6 col-lg-4 mb-3 px-2">
            <ContentCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
