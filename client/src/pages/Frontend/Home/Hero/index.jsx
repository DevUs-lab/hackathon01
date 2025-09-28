import React from 'react';

const Hero = () => {
    return (
        <div id="carouselExample" className="carousel slide"
            style={{
                color: "white",
                backgroundColor: "black",
                textShadow: "2px 2px 15px rgba(0,0,0,0.5)"
            }}>
            <div className="carousel-inner" style={{ maxHeight: "80vh" }}>
                <div className="carousel-item active position-relative">
                    <img src="https://t4.ftcdn.net/jpg/06/29/60/23/360_F_629602307_7knXNZJW2OML3OwlXSvwOAPNrb7WsD0c.jpg"
                        className="d-block w-100" alt="image" />

                    <div className="position-absolute mt-5" style={{ top: "50%", left: "12%", transform: "translateY(-50%)" }}>
                        <h2 className="fw-bold">Help the People in Need</h2>
                        <p>Together we can make a difference</p>
                        <button className='btn rounded-0 border-0 py-2 px-4' style={{ background: "#FA7F4B" }}>Help Now</button>
                    </div>

                </div>

                <div className="carousel-item position-relative">
                    <img
                        src="https://npr.brightspotcdn.com/dims3/default/strip/false/crop/7411x4941+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F9d%2Fe43a7763440b887ce92d5250fd6a%2Fap25201478859206.jpg"
                        className="d-block w-100"
                        alt="..."
                    />
                    <div
                        className="position-absolute "
                        style={{
                            top: "50%",
                            left: "12%",
                            transform: "translateY(-50%)"
                        }}
                    >
                        <h2 className="fw-bold">Stand with Humanity</h2>
                        <p>Every small act counts</p>
                        <button className='btn rounded-0 border-0 py-2 px-4' style={{ background: "#FA7F4B" }}>Help Now</button>

                    </div>
                </div>

                <div className="carousel-item position-relative">
                    <img
                        src="https://opencanada.org/wp-content/uploads/2024/01/Palestine-3.jpg"
                        className="d-block w-100"
                        alt="..."
                    />
                    <div
                        className="position-absolute"
                        style={{
                            top: "50%",
                            left: "12%",
                            transform: "translateY(-50%)"
                        }}
                    >
                        <h2 className="fw-bold">Support for Palestine</h2>
                        <p>Your donation can save lives</p>
                        <button className='btn rounded-0 border-0 py-2 px-4' style={{ background: "#FA7F4B" }}>Help Now</button>

                    </div>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div >
    );
};

export default Hero;
