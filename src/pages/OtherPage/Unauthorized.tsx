export default function Unauthorized() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">403 - Unauthorized</h1>
        <p className="text-gray-500 mt-2">You do not have permission to view this page.</p>
      </div>
    </div>
  );
}
