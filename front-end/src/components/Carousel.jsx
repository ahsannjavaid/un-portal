import React from "react";
import { instructorImages, studentImages } from "../utility/images";

const Carousel = ({ crsNo, fname }) => {
  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {crsNo === 1 ? (
            <>
              <div className="carousel-item active">
                <img
                  src="./images/ii1.jpg"
                  className="d-block w-100"
                  alt="ii1"
                  height={"569px"}
                />
                <div className="carousel-caption d-md-block">
                  <h5>Assalam-u-Alaikum {fname}!</h5>
                </div>
              </div>
              {instructorImages.map((image, index) => {
                return (
                  <div key={index} className="carousel-item">
                    <img
                      src={`./images/${image}`}
                      className="d-block w-100"
                      alt="ii3"
                      height={"569px"}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            studentImages.map((image, index) => {
              return (
                <div
                  key={index}
                  className={`carousel-item ${!index ? "active" : ""}`}
                >
                  <img
                    src={`./images/${image}`}
                    className="d-block w-100"
                    alt="si1"
                    height={"400px"}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;
