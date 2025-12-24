// Helmet List Page
import { Link } from "react-router-dom";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import { useAllHelmet } from "@/services/api/helmet/get/get.hooks";
import { useDeleteHelmet } from "@/services/api/helmet/delete/delete.hooks";
import { useAuth } from "@/hooks/useAuth";
import { useState, useMemo } from "react";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import ConfirmDeleteModal, { useDeleteModal } from "@/components/Modal/ConfirmDeleteModal";
import { toast } from "react-toastify";

function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

export default function HelmetListPage() {
  const { user } = useAuth();
  const { isLoading, data, refetch } = useAllHelmet();
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  
  const deleteModal = useDeleteModal();
  const deleteMutation = useDeleteHelmet({ id: deleteModal.deleteId || "" });

  const helmetOnlyData = useMemo(() => {
    const allData = data?.data || [];
    return allData.filter((item: any) => item.type === 2 || item.type === "helmet");
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return helmetOnlyData;
    return helmetOnlyData.filter((item: any) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, helmetOnlyData]);

  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  const handleDelete = (id: number) => deleteModal.openModal(id.toString());

  const confirmDelete = async () => {
    if (!deleteModal.deleteId) return;
    deleteModal.setIsLoading(true);
    try {
      await deleteMutation.mutateAsync({ id: deleteModal.deleteId });
      toast.success("Berhasil dihapus!");
      refetch();
      deleteModal.closeModal();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Gagal menghapus data");
    } finally {
      deleteModal.setIsLoading(false);
    }
  };

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading />
        <ToolbarActions>
          {hasPermission(user, "helmet.create") && (
            <Link to="/manage/helmet/create" className="btn">Create</Link>
          )}
        </ToolbarActions>
      </Toolbar>
      <Container>
        <div className="bg-card rounded-xl border border-border">
          <div className="p-5 border-b border-border">
            <div className="relative">
              <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              <input placeholder="Search Devices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="ps-9 w-50 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring pl-9" />
              {searchQuery.length > 0 && (
                <button className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setSearchQuery('')}>
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
            ) : (
              <table className="w-full">
                <thead><tr className="border-b border-border"><th className="text-left px-5 py-3 text-muted-foreground font-medium text-sm">Name</th><th className="text-left px-5 py-3 text-muted-foreground font-medium text-sm">Action</th></tr></thead>
                <tbody>
                  {paginatedData.map((helmet: any) => (
                    <tr key={helmet.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-5 py-3 text-foreground text-sm">{helmet.name}</td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          {hasPermission(user, "helmet.update") && <Link to={`/manage/helmet/${helmet.id}/edit`} className="btn btn-warning text-xs px-3 py-1.5">Edit</Link>}
                          {hasPermission(user, "helmet.delete") && <button onClick={() => handleDelete(helmet.id)} className="btn btn-danger text-xs px-3 py-1.5">Delete</button>}
                          <Link to={`/manage/recording/helmet/${helmet.path_slug}`} className="btn btn-secondary text-xs px-3 py-1.5">Recording Logs</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!isLoading && paginatedData.length === 0 && <div className="text-center py-8 text-muted-foreground text-sm">No Helmet found</div>}
          </div>
          <div className="p-5 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page</span>
              <select value={pagination.pageSize} onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value), pageIndex: 0 })} className="h-8 rounded-md border border-input bg-transparent px-2 text-sm">
                <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{filteredData.length > 0 ? `${pagination.pageIndex * pagination.pageSize + 1} - ${Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of ${filteredData.length}` : '0 of 0'}</span>
              <div className="flex gap-1">
                <button onClick={() => setPagination({ ...pagination, pageIndex: Math.max(0, pagination.pageIndex - 1) })} disabled={pagination.pageIndex === 0} className="h-8 w-8 flex items-center justify-center rounded border border-input disabled:opacity-50"><ChevronLeft className="size-4" /></button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <button key={i} onClick={() => setPagination({ ...pagination, pageIndex: i })} className={`h-8 w-8 flex items-center justify-center rounded border text-sm ${pagination.pageIndex === i ? 'bg-primary text-primary-foreground border-primary' : 'border-input'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setPagination({ ...pagination, pageIndex: Math.min(totalPages - 1, pagination.pageIndex + 1) })} disabled={pagination.pageIndex >= totalPages - 1} className="h-8 w-8 flex items-center justify-center rounded border border-input disabled:opacity-50"><ChevronRight className="size-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ConfirmDeleteModal isOpen={deleteModal.isOpen} onClose={deleteModal.closeModal} onConfirm={confirmDelete} isLoading={deleteModal.isLoading} />
    </ManageLayout>
  );
}
