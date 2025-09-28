import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { MdPhoneAndroid } from "react-icons/md";
import { useAuthContext } from "../../contexts/Auth";


const TopBar = () => {
    const { user } = useAuthContext();

    return (
        <div className="bg-dark" >
            <div className="container">
                <div className="row text-white d-flex align-items-center justify-content-between">
                    <div className="col align-baseline">
                        <span>
                            <AiOutlineMail className="fw-bold me-1" /> {user ? user.email : "Salam"}
                        </span>
                        <span className="ms-3 mb-0">
                            <MdPhoneAndroid className="fw-bold me-1" />{user ? "03190609041" : "03x-xxxxxxxx"}
                        </span>
                    </div>
                    <div className="col text-end">
                        <button className="py-3 px-4 rounded-0 border-0 donateBtn">Donate Now</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
