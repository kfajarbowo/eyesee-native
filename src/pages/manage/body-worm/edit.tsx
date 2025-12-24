// Body Worm Edit Page
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import FormEditBodyWorm from "@/module/body_worm/Form/FormEdit";
import { useAuth } from "@/hooks/useAuth";

function hasPermission(user: any, permission: string): boolean {
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

export default function BodyWormEditPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !hasPermission(user, "body_worm.update")) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!id) return null;

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading title="Edit Body Worm" />
        <ToolbarActions />
      </Toolbar>
      <Container>
        <FormEditBodyWorm id={id} />
      </Container>
    </ManageLayout>
  );
}
