import { useState } from "react";
import Modal from "./update.modal";
// eslint-disable-next-line react-hooks/rules-of-hooks
const [showModal, setShowModal] = useState(false);
const button = () =>{
    return(
    <div className="p-10 text-center" >
      <button className=" text-white bg-blue-500 rounded-lg px-5 py-2.5" onClick={() =>setShowModal(true)}>Update</button>
      <Modal invisible={showModal} onClose={() => setShowModal(false)}/>
    </div>
    )
} 

export default button;