// CCTV Edit Page - same structure as web: src/app/(manage)/manage/cctv/[id]/edit/page.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import FormEditCctv from "@/module/cctv/Form/FormEdit";
import { useAuth } from "@/hooks/useAuth";

function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

export default function CctvEditPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasPermission(user, "cctv.update")) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!id) return null;

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading title="Edit CCTV" />
        <ToolbarActions />
      </Toolbar>
      <Container>
        <FormEditCctv id={id} />
      </Container>
    </ManageLayout>
  );
}
