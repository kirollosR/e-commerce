import React from "react";

const EditProfile = () => {
    
    return (
        <div className="w-full bg-white shadow rounded">
        <div className="container mx-auto py-8">
            <div className="w-96 mx-auto bg-white rounded shadow">
            <div className="py-4 px-8 text-center text-black text-xl font-bold border-b border-gray-500">
                        Student Application
                    </div>
                <form name="student_application" id="student_application" action="">
                    <div className="py-4 px-8">
                        <div className="mb-4">
                            <label className="block text-gray-darker text-sm font-bold mb-2">Full name:</label>
                            <input className="border rounded w-full py-2 px-3 text-gray-darker" type="text"
                                name="student_id" id="student_id" value="" placeholder="Enter Your Full name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-darker text-sm font-bold mb-2">Birthday:</label>
                            <input className="border rounded w-full py-2 px-3 text-gray-darker" type="datetime-local"
                                name="admission_date" id="admission_date" value="" />
                            <p id="error_intake_year"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-darker text-sm font-bold mb-2">Mobile</label>
                            <input className="border rounded w-full py-2 px-3 text-gray-darker" type="text"
                                name="student_name" id="student_name" value="" placeholder="01........" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-darker text-sm font-bold mb-2">Email:</label>
                            <input className="border rounded w-full py-2 px-3 text-gray-darker" type="text"
                                name="course_name" id="course_name" value="" placeholder="Enter Your Email" />
                            <p id="error_creater_id"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-darker text-sm font-bold mb-2">Address</label>
                            <input className="border rounded w-full py-2 px-3 text-gray-darker" type="text"
                                name="student_name" id="student_name" value="" placeholder="Enter Your Address" />
                        </div>
                        
                        <div className="mb-4">
                            <button className="mb-2 mx-16 rounded-full py-1 px-24 bg-black text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
    
};

export default EditProfile;
