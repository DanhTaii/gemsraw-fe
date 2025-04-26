import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const topItems = [
    { title: "Dictionary", path: "/dictionary" },
    { title: "Mindmap", path: "/mindmap" },
  ];

  const bottomItems = [
    { title: "Flashcard", path: "/flashcard" },
    { title: "Exercise", path: "/exercise" },
  ];

  return (
    <div className="text-center mt-5">
      <h2 className="mb-4 fw-bold custom-blue">Welcome!</h2>

      {/* Hàng trên - Dictionary và Mindmap */}
      <div className="row justify-content-center mb-3">
        {topItems.map((item) => (
          <div className="col-10 col-md-5 " key={item.title}>
            <Link to={item.path} className="text-decoration-none">
              <div
                className="card shadow-sm p-4 text-dark mx-2 d-flex align-items-center justify-content-center"
                style={{ height: "150px" }}
              >
                <h5 className="m-0">{item.title}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Hàng dưới - Flashcard và Exercise */}
      <div className="row justify-content-center">
        {bottomItems.map((item) => (
          <div className="col-10 col-md-5" key={item.title}>
            <Link to={item.path} className="text-decoration-none">
              <div
                className="card shadow-sm p-4 text-dark mx-2 d-flex align-items-center justify-content-center"
                style={{ height: "150px" }}
              >
                <h5>{item.title}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
