import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";

export default function BasicTableOne() {
  const { loading } = useAuth();
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "==", "Service User")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTableData(data);
        console.log("Fetched users:", data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (id: string) => {
    console.log("🔍 View user:", id);
    // Navigate or open modal
  };

  const handleEdit = (id: string) => {
    console.log("✏️ Edit user:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id: string) => {
    console.log("🗑️ Delete user:", id);
    // Confirm and delete user from Firestore
  };

  if (loading) {
    return <p className="text-center p-5">Loading users...</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Full Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Created At
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Role
              </TableCell>
              <TableCell
                isHeader
                className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="px-4 py-3 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.fname} {user?.lname || "N/A"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {user.email || "N/A"}
                </TableCell>

                <TableCell className="px-5 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {user?.createdAt && user.createdAt.toDate
                      ? user.createdAt.toDate().toLocaleDateString()
                      : "N/A"}
                  </div>
                </TableCell>

                <TableCell className="py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      user.role === "Mechanic"
                        ? "success"
                        : user.role === "Service User"
                        ? "primary"
                        : "light"
                    }
                  >
                    {user.role || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleView(user.id)}
                      className="text-blue-500 hover:text-blue-600"
                      title="View"
                    >
                      <FiEye size={16} />
                    </button>

                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-yellow-500 hover:text-yellow-600"
                      title="Edit"
                    >
                      <FiEdit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
