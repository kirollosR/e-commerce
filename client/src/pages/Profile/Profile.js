import React from "react";
const Profile = () => {
    return (

        
        <div class="my-4 ">
            <div class="w-full >">
                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <div class="flex items-center justify-between bg-white rounded-lg shadow-xl p-8">
                        <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
                        <button class="flex items-center px-3 py-1 bg-black text-white font-semibold rounded hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-700">
                            <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0h-2m-4 8h10c1.1 0 2-.9 2-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12c0 1.1.9 2 2 2z"></path>
                            </svg>
                            Edit
                        </button>
                    </div>

                    {/* <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4> */}
                    <ul class="mt-2 text-gray-700">
                        <li class="flex border-y py-2">
                            <span class="font-bold w-24">Full name:</span>
                            <span class="text-gray-700">Amanda S. Ross</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Birthday:</span>
                            <span class="text-gray-700">24 Jul, 1991</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Joined:</span>
                            <span class="text-gray-700">10 Jan 2022 (25 days ago)</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Mobile:</span>
                            <span class="text-gray-700">(123) 123-1234</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Email:</span>
                            <span class="text-gray-700">amandaross@example.com</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Address:</span>
                            <span class="text-gray-700">23 Ahmed Oraby, Agouza</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Number of orders:</span>
                            <span class="text-gray-700 text-center" >5</span>
                        </li>
                    </ul>
                </div>
            </div>    

            <div class="w-full mt-4">
                <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Orders</h4>
                    <div class="relative px-4">
                <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-black rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                        <p class="text-2xl font-medium">Apple watch</p>
                        <p class="text-xl text-gray-700">received</p>
                        <p class="text-xl text-gray-700">May 3, 2024</p>
                    </div>
                </div>
        
                <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-black rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                        <p class="text-2xl font-medium">Apple watch</p>
                        <p class="text-xl text-gray-700">received</p>
                        <p class="text-xl text-gray-700">May 3, 2024</p>
                    </div>
                </div>
        
                <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-black rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                        <p class="text-2xl font-medium">Apple watch</p>
                        <p class="text-xl text-gray-700">received</p>
                        <p class="text-xl text-gray-700">May 3, 2024</p>
                    </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-black rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                        <p class="text-2xl font-medium">Apple watch</p>
                        <p class="text-xl text-gray-700">received</p>
                        <p class="text-xl text-gray-700">May 3, 2024</p>
                    </div>
                </div>

                <div class="flex items-center w-full my-6 -ml-1.5">
                    <div class="w-1/12 z-10">
                        <div class="w-3.5 h-3.5 bg-black rounded-full"></div>
                    </div>
                    <div class="w-11/12">
                        <p class="text-2xl font-medium">Apple watch</p>
                        <p class="text-xl text-gray-700">received</p>
                        <p class="text-xl text-gray-700">May 3, 2024</p>
                    </div>
                </div>

                </div>
            </div>
            </div>
        </div>
    );
};
export default Profile; 