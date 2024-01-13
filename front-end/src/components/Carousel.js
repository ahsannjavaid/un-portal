import React from 'react'

const Carousel = (props) => {
    if (props.crsNo === 1)
        return (
            <>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./images/ii1.jpg" className="d-block w-100" alt="ii1" height={'569px'} />
                            <div className="carousel-caption d-md-block">
                                <h5>Assalam-u-Alaikum {props.fname}!</h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="./images/ii3.jpg" className="d-block w-100" alt="ii3" height={'569px'} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/ii4.jpg" className="d-block w-100" alt="ii4" height={'569px'} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/ii5.jpg" className="d-block w-100" alt="ii5" height={'569px'} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/ii2.jpg" className="d-block w-100" alt="ii2" height={'569px'} />
                        </div>
                    </div>
                </div>
            </>
        )
    else
        return (
            <>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./images/si1.jpg" className="d-block w-100" alt="si1" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si2.jpg" className="d-block w-100" alt="si2" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si3.jpg" className="d-block w-100" alt="si3" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si4.jpg" className="d-block w-100" alt="si4" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si5.jpg" className="d-block w-100" alt="si5" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si6.jpg" className="d-block w-100" alt="si6" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si7.jpg" className="d-block w-100" alt="si7" height={"400px"} />
                        </div>
                        <div className="carousel-item">
                            <img src="./images/si8.jpg" className="d-block w-100" alt="si8" height={"400px"} />
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Carousel