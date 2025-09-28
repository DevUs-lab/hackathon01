import React from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { useAuthContext } from '../../contexts/Auth';


const TopBar = () => {

    const { user } = useAuthContext()

    return (
        <div className=' bg-dark'>

            <div className='container'>
                <div className="row">
                    <div className="col text-white">
                        <AiOutlineMail /> {user ? user.email : "Salam"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar