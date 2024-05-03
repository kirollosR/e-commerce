import { UserTable } from '../../components/Table/table';
import React from "react";
import { Table2 } from '../../components/Table/Table2';
import { Table3 } from '../../components/Table/Table3';
import Table4 from '../../components/Table/Table4';


const generateRandomName = () => {
  const names = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

const generateRandomEmail = (name) => {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"];
  const randomDomainIndex = Math.floor(Math.random() * domains.length);
  return `${name.toLowerCase()}@${domains[randomDomainIndex]}`;
};

const generateRandomAge = () => {
  return Math.floor(Math.random() * 80) + 18; // Random age between 18 and 97
};

const generateRandomCountry = () => {
  const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France"];
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

const generateRandomSubscription = () => {
  return Math.random() < 0.5; // 50% chance of being true
};

const generateUsers = (count) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const name = generateRandomName();
    const email = generateRandomEmail(name);
    const age = generateRandomAge();
    const country = generateRandomCountry();
    users.push({ id: i, name, email, age, country });
  }
  return users;
};

const Users = () => {
    

    // const users = [
    //     { id: 1, name: "John Doe", email: "john@example.com" },
    //     { id: 2, name: "Jane Smith", email: "jane@example.com" },
    //     // Add more user data as needed
    //   ];
    const users = generateUsers(50);

    
    return (
        <div className='mt-4 mb-3'>
        {/* <div className="flex justify-center items-center h-screen"> */}
            {/* <input type="text" placeholder="Search" className="border-2 border-gray-300 p-2 rounded-lg" /> */}
            {/* <Table2 /> */}
            <Table3 data={users} />
            {/* <UserTable users={users} /> */}
            <Table4 users={users} />
            
        </div>
    );
};

export default Users;