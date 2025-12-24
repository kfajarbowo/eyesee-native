import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

// Types (same as web)
interface Device {
  id: number;
  name: string;
  path_slug: string;
  status: boolean;
  type: string;
  regions?: {
    id: number;
    name: string;
  };
}

interface ResponseData {
  data: Device[];
  count: {
    total: number;
    cctv: number;
    body_worm: number;
    helmet: number;
  };
}

// Helper function (same as web)
function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

// Badge component (same as web)
function Badge({ variant, children }: { variant: 'success' | 'destructive'; children: React.ReactNode }) {
  const classes = variant === 'success'
    ? 'bg-green-100 text-green-700 border-green-200'
    : 'bg-red-100 text-red-700 border-red-200';
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${classes}`}>
      {children}
    </span>
  );
}

function BadgeDot({ className }: { className: string }) {
  const dotClass = className === 'success' ? 'bg-green-500' : 'bg-red-500';
  return <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />;
}

// Dropdown Menu for Actions - same as web
function ActionsCell({ row }: { row: Device }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get permission key based on device type
  let permissionKey = "";
  if (row.type === "cctv" || row.type === 1) permissionKey = "cctv.update";
  else if (row.type === "body_worm" || row.type === 3) permissionKey = "body_worm.update";
  else if (row.type === "helmet" || row.type === 2) permissionKey = "helmet.update";

  const hasPerm = hasPermission(user, permissionKey);

  // Get correct type string for URL
  const typeStr = typeof row.type === 'number' 
    ? (row.type === 1 ? 'cctv' : row.type === 2 ? 'helmet' : 'body-worm')
    : (row.type === 'body_worm' ? 'body-worm' : row.type);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted"
      >
        <MoreVertical className="size-4 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              if (hasPerm) {
                navigate(`/manage/${typeStr}/${row.id}/edit`);
              }
              setIsOpen(false);
            }}
            disabled={!hasPerm}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-muted ${!hasPerm ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

// Main TableDevice component (same as web structure)
export default function TableDevice({ data, isLoading, refetch }: { data: ResponseData | undefined; isLoading: boolean; refetch: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  // Filter data
  const filteredData = useMemo(() => {
    const allData = data?.data || [];
    if (!searchQuery) return allData;
    return allData.filter((device: Device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  // Paginate
  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination]);

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize);

  return (
    <div className="bg-card rounded-xl border border-border">
      {/* Card Header - Search */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              placeholder="Search Devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 w-50 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring pl-9"
            />
            {searchQuery.length > 0 && (
              <button
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => setSearchQuery('')}
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-sm">
                  Name <span className="text-muted-foreground/50">↕</span>
                </th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-sm">
                  Region
                </th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-sm">
                  status
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((device: Device) => (
                <tr key={`${device.type}-${device.id}`} className="border-b border-border hover:bg-muted/50">
                  <td className="px-5 py-3 text-foreground text-sm">{device.name}</td>
                  <td className="px-5 py-3">
                    <Link to="#" className="text-primary hover:underline text-sm">
                      {device.regions?.name || '-'}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    {device.status ? (
                      <Badge variant="success">
                        <BadgeDot className="success" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <BadgeDot className="destructive" />
                        InActive
                      </Badge>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <ActionsCell row={device} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!isLoading && paginatedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No devices found
          </div>
        )}
      </div>

      {/* Card Footer - Pagination */}
      <div className="p-5 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <select 
            value={pagination.pageSize}
            onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value), pageIndex: 0 })}
            className="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {filteredData.length > 0 
              ? `${pagination.pageIndex * pagination.pageSize + 1} - ${Math.min((pagination.pageIndex + 1) * pagination.pageSize, filteredData.length)} of ${filteredData.length}`
              : '0 of 0'
            }
          </span>
          <div className="flex gap-1">
            <button 
              onClick={() => setPagination({ ...pagination, pageIndex: Math.max(0, pagination.pageIndex - 1) })}
              disabled={pagination.pageIndex === 0}
              className="h-8 w-8 flex items-center justify-center rounded border border-input disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <button 
                key={i}
                onClick={() => setPagination({ ...pagination, pageIndex: i })}
                className={`h-8 w-8 flex items-center justify-center rounded border text-sm ${
                  pagination.pageIndex === i ? 'bg-primary text-primary-foreground border-primary' : 'border-input'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setPagination({ ...pagination, pageIndex: Math.min(totalPages - 1, pagination.pageIndex + 1) })}
              disabled={pagination.pageIndex >= totalPages - 1}
              className="h-8 w-8 flex items-center justify-center rounded border border-input disabled:opacity-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
