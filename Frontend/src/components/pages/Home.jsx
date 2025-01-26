import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUserData(response.data); 
            } catch (err) {
                console.error("Error while fetching user data:", err);
            }
        };
        fetchUserData();
    }, []); // Add an empty dependency array to avoid infinite re-renders

    const addUserFun = () => {
        navigate("/adduser");
    };

    const editUserFun = (id) => {
        navigate(`/edituser/${id}`);
    };

    const deleteUserFun = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/user/${id}`);
            if (response.status === 200) {
                alert("User Deleted!!");
                // Update the state to remove the deleted user
                setUserData((prevData) => prevData.filter((user) => user._id !== id));
            } else {
                alert("Error while deleting user");
            }
        } catch (err) {
            console.error("Error while deleting user:", err);
            alert("Error while deleting user!!");
        }
    };
    

    return (
        <>
            <div className="container mx-auto my-10 px-10">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">User Data</h1>
                    <button onClick={addUserFun} className="text-white bg-blue-500 p-2 rounded">
                        Add User
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-300 borderd-2">
                            <tr>
                                <th className="px-4 py-2 text-gray-800">ID</th>
                                <th className="px-4 py-2 text-gray-800">Profile</th>
                                <th className="px-4 py-2 text-gray-800">Fname</th>
                                <th className="px-4 py-2 text-gray-800">Lname</th>
                                <th className="px-4 py-2 text-gray-800">Email</th>
                                <th className="px-4 py-2 text-gray-800">Phone</th>
                                <th className="px-4 py-2 text-gray-800">City</th>
                                <th className="px-4 py-2 text-gray-800">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2 text-gray-800">{user.id}</td>
                                    <td className="px-4 py-2 text-gray-800">
                                        <img
                                            src={user.profile ? `http://localhost:8000/uploadImages/${user.profile}` : "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
                                            alt="profile"
                                            className="object-cover rounded w-16 h-16"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">{user.Fname}</td>
                                    <td className="px-4 py-2 text-gray-800">{user.Lname}</td>
                                    <td className="px-4 py-2 text-gray-800">{user.email}</td>
                                    <td className="px-4 py-2 text-gray-800">{user.phone}</td>
                                    <td className="px-4 py-2 text-gray-800">{user.city}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => editUserFun(user._id)}
                                                className="text-white bg-yellow-500 p-2 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                            onClick={() => deleteUserFun(user._id)}
                                            className="text-white bg-red-500 p-2 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;
