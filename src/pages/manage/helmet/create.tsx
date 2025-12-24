// Helmet Create Page
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import FormPostHelmet from "@/module/helmet/Form/FormPost";
import { useAuth } from "@/hooks/useAuth";

function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

export default function HelmetCreatePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasPermission(user, "helmet.create")) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading title="Create Helmet" />
        <ToolbarActions />
      </Toolbar>
      <Container>
        <FormPostHelmet />
      </Container>
    </ManageLayout>
  );
}
