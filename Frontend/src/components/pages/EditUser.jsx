import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditUser() {
    const { id } = useParams();

    const navigate = useNavigate();
    const cancleButtonFun = () => {
        navigate("/")
    }

    const [formData, setFormData] = useState({
        id: "",
        Fname: "",
        Lname: "",
        email: "",
        phone: "",
        password: "",
        city: "",
        profile: null,
    });

    useEffect(()=>{
        const fetchUserData = async ()=>{
            try{
                const response = await fetch(`http://localhost:8000/api/user/${id}`);
                const data = await response.json();
                if(response.ok){
                    setFormData(data);
                }else{
                    alert("Failed To Fetch data by ID");
                }
            }catch(err){
                console.error("Error while Fetching user data by ID");
                alert("Error while fetching data by ID");
            }
        }
        fetchUserData();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setFormData({
            ...formData,
            profile: file, 
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        try {
            const response = await fetch(`http://localhost:8000/api/editUser/${id}`, {
                method:'PUT',
                body:formDataToSend
            });
    
            if (response.ok) {
                const result = await response.json();
                alert("User data updated successfully!");
                navigate("/");
            } else {
                alert("Failed to update Userdata!!",error.message);
            }
        } catch (err) {
            console.error("Error while updating user data:", err);
            alert("Error while updating user data!!");
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        navigate("/");
    };
    

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto">
                    <form onSubmit={handleSubmitForm}>
                        <div className="space-y-12">
                            <div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                            <i class="fa-solid fa-user"></i> Profile (optional)
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <i class="fa-solid fa-photo-film"></i>
                                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            onChange={handleFileChange} className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="Fname" className="block text-sm/6 font-medium text-gray-900">
                                            First Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="Fname"
                                                name="Fname"
                                                type="text"
                                                value={formData.Fname}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="Lname" className="block text-sm/6 font-medium text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="Lname"
                                                name="Lname"
                                                type="text"
                                                value={formData.Lname}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="text"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-6">
                            <button type="button" onClick={cancleButtonFun} className="rounded-md bg-red-500 px-12 py-2 text-sm font-semibold text-white shadow-sm">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-500 px-12 py-2 text-sm font-semibold text-white shadow-sm"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="my-5 py-5"></div>
            </div>
        </>
    )
}

export default EditUser;