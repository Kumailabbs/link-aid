// import { useState } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../../../config/firebase";
// import { useNavigate } from "react-router-dom";

// import ComponentCard from "../../common/ComponentCard";
// import Label from "../../form/Label";
// import Input from "../../form/input/InputField";
// import Select from "../../form/Select";
// import { toast } from "react-toastify";

// export default function AddUserForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     role: "Service User",
//   });

//   const [loading, setLoading] = useState(false);

//   const roles = [
//     { value: "Service User", label: "Service User" },
//     { value: "Mechanic", label: "Mechanic" },
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData({ ...formData, role: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await addDoc(collection(db, "users"), {
//         ...formData,
//         createdAt: serverTimestamp(),
//       });

//       toast.success("User added successfully!");
//       navigate(-1); // Go back
//     } catch (error) {
//       console.error("Error adding user:", error);
//       toast.error("Failed to add user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ComponentCard
//       title="Add New User"
//       button={
//         <button
//           onClick={() => {
//             navigate(-1);
//           }}
//         >
//           back
//         </button>
//       }
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <Label htmlFor="fname">First Name</Label>
//           <Input
//             type="text"
//             id="fname"
//             name="fname"
//             placeholder="John"
//             value={formData.fname}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="lname">Last Name</Label>
//           <Input
//             type="text"
//             id="lname"
//             name="lname"
//             placeholder="Doe"
//             value={formData.lname}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label htmlFor="email">Email Address</Label>
//           <Input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="john@example.com"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <Label>User Role</Label>
//           <Select
//             options={roles}
//             placeholder="Select Role"
//             onChange={handleSelectChange}
//             defaultValue="Service User"
//             className="dark:bg-dark-900"
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             {loading ? "Adding..." : "Add User"}
//           </button>
//         </div>
//       </form>
//     </ComponentCard>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import { toast } from "react-toastify";

export default function AddUserForm() {
  const { id } = useParams(); // Check if editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    role: "Service User",
  });
  const [loading, setLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const roles = [
    { value: "Service User", label: "Service User" },
    { value: "Mechanic", label: "Mechanic" },
  ];

  useEffect(() => {
    if (id) {
      setIsUpdateMode(true);
      loadUserData(id);
    }
  }, [id]);

  const loadUserData = async (userId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFormData({
          fname: userData.fname || "",
          lname: userData.lname || "",
          email: userData.email || "",
          role: userData.role || "Service User",
        });
      } else {
        alert("User not found!");
        navigate("/"); // Optional: redirect
      }
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isUpdateMode && id) {
        await setDoc(doc(db, "users", id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success(" User updated!");
      } else {
        await addDoc(collection(db, "users"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        toast.success(" New user added!");
      }

      navigate(-1); // Go back
    } catch (err) {
      console.error("Failed to save user:", err);
      toast.error("Failed to save user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title={isUpdateMode ? "Edit User" : "Add New User"} button={<button>Add</button>}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fname">First Name</Label>
          <Input
            type="text"
            id="fname"
            name="fname"
            placeholder="John"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="lname">Last Name</Label>
          <Input
            type="text"
            id="lname"
            name="lname"
            placeholder="Doe"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>User Role</Label>
          <Select
            options={roles}
            placeholder="Select Role"
            onChange={handleSelectChange}
            defaultValue={formData.role}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : isUpdateMode ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
