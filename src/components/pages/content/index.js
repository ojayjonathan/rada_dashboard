import React from "react";
import Layout from "../../layout";
import PageTitle from "../../pageTitle";
import img from "../../../assets/images/image 3.png";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react/cjs/react.development";

const ContentCard = ({ item }) => {
  const ref = useRef();
  useEffect(() => {
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
            to={{ pathname: "/create-content/", state: item }}
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
    {
      imageSrc: img,
      title: "New Blog",
      subTitle: "",
      category: "Drug Abuse",
      content: "Well, the way they make shows is, they make one show ",
    },
    {
      imageSrc: img,
      title: "New Blog",
      subTitle: "",
      category: "Drug Abuse",
      content:
        "<ol><li>Html Well, the way they make shows is, they make one show</li><li>item 2</li><li>item 3</li><li>item 4</li><li>item 5</li></ol> ",
    },
    {
      imageSrc: img,
      title: "New Blog",
      subTitle: "",
      category: "Drug Abuse",
      content: "Well, the way they make shows is, they make one show ",
    },
  ];
  return (
    <Layout>
      <div className="container">
        <PageTitle title="Content" sutitle="content" />
        <div className="d-flex flex-wrap">
          {blogItems.map((item) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3 px-2">
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
