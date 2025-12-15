import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BsBoxArrowLeft } from "react-icons/bs";

export function ButtonLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    logout();
    navigate("/login");
  };
  
  return (
    <button
      onClick={handleLogout}
    >
      <BsBoxArrowLeft />
      Log Out
    </button>
  );
}
