// Delete Confirmation Modal - updated for native app
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
  title?: string;
  message?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Are you sure?",
  message = "You won't be able to revert this!",
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => !isLoading && onClose()}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-2 text-center text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground mb-6 text-center">
          {message}
        </p>
        
        <div className="flex justify-center gap-3">
          <button
            className={`btn ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, delete it!"}
          </button>
          <button
            className={`btn btn-danger ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for managing delete state
export function useDeleteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (id: string) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (!isLoading) {
      setIsOpen(false);
      setDeleteId(null);
    }
  };

  return {
    isOpen,
    deleteId,
    isLoading,
    setIsLoading,
    openModal,
    closeModal,
  };
}
