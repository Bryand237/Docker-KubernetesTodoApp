
//import { useState } from 'react'

const Modal = ({ invisible, onClose }) => {
    if (!invisible) return null;
    //const [open, setOpen] = useState(true)

    return (
        <div className='fixed inset-0 bg-gray-300/50 backdrop-blur-sm flex justify-center items-center rounded-2xl' >
            <div className='w-[600px] flex flex-col'>
                <button className="text-black text-xl place-self-end" onClick={() => onClose()}>X</button>
                <div className='bg-white p-2 rounded'>
                    <form>
                        <div className="">
                            <div className="border-b border-white/10 pb-6">
                
                                <p className="mt-1 text-xl text-gray-400">
                                    Update your task
                                </p>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="">
                                        <span className="block mb-2 text-xl font-medium ">Title</span>
                                        <input
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 min-w-130 block p-2.5" 
                                        type="text" />

                                    </div>
                                </div>
                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="">
                                        <span className="block mb-2 text-xl font-medium ">Contenu</span>
                                        <textarea
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 min-w-130 block p-2.5" 
                                         />

                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="mt-6 flex items-center justify-center gap-x-2">
                            <button type="button" className="text-sm/6 rounded-lg bg-gray-500 px-2 py-1.5 font-semibold text-white">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )

}

export default Modal;
