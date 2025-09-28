import React from 'react'

import { LuHeartHandshake } from "react-icons/lu";
import { PiHeadCircuit } from "react-icons/pi";
import { BsPostageHeart } from "react-icons/bs";
import { LiaDonateSolid } from "react-icons/lia";

const AboutServices = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row" style={{ minHeight: "50vh", background: "#F2F2F2" }}>
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                        <div className="icon-circle flip-hover">
                            <LuHeartHandshake className="icon" />
                        </div>
                        <h3 className='mt-2'>
                            Our Mission
                        </h3>
                        <p>Purus in mollis nunc sed.
                        </p>
                    </div>

                    <div className="col-3 flex-column d-flex justify-content-center align-items-center">
                        <div className="icon-circle flip-hover">
                            {/* <FaDonate className="icon" /> */}
                            <LiaDonateSolid className='icon' />

                        </div>
                        <h3>
                            Our Program
                        </h3>

                        <p>
                            Nunc pulvinar sapien et ligula.
                        </p>
                    </div>
                    <div className="col-3 flex-column d-flex justify-content-center align-items-center">
                        <div className="icon-circle flip-hover">
                            <PiHeadCircuit className="icon" />
                        </div>
                        <h3>
                            Sport 24/7
                        </h3>
                        <p>
                            Nunc pulvinar sapien et ligula.
                        </p>
                    </div>
                    <div className="col-3 flex-column d-flex justify-content-center align-items-center">
                        <div className="icon-circle flip-hover">
                            <BsPostageHeart className='icon' />
                        </div>
                        <h3>
                            Become Volunteer
                        </h3>
                        <p>
                            Ultricies integer quis auctor elit
                        </p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AboutServices