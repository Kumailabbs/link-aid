import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AddUserForm from "../../components/tables/BasicTables/BasicFormOne";

export default function BasicForm() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Basic Form" />
      <div className="space-y-6">
        <AddUserForm />
      </div>
    </>
  );
}
