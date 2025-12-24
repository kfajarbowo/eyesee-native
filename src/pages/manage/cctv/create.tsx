// CCTV Create Page - same structure as web: src/app/(manage)/manage/cctv/create/page.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import FormPostCctv from "@/module/cctv/Form/FormPost";
import { useAuth } from "@/hooks/useAuth";

function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

export default function CctvCreatePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasPermission(user, "cctv.create")) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading title="Create CCTV" />
        <ToolbarActions />
      </Toolbar>
      <Container>
        <FormPostCctv />
      </Container>
    </ManageLayout>
  );
}
