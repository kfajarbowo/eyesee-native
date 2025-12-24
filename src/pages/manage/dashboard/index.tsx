import { Link } from "react-router-dom";
import ManageLayout from "@/components/layouts/ManageLayout";
import { Container, Toolbar, ToolbarActions, ToolbarHeading } from "@/components/common/toolbar";
import { Statistics, IStatisticsItems } from "@/components/Statistics";
import TableDevice from "@/module/dashboard/TableDevice";
import { useAllDevice } from "@/services/api/device/get/get.hooks";

// Same structure as web: src/app/(manage)/manage/dashboard/page.tsx
export default function DashboardPage() {
  const { isLoading, data, refetch } = useAllDevice();

  const items: IStatisticsItems = [
    { number: (data?.count?.total ?? 0).toString(), label: 'DEVICE' },
    { number: (data?.count?.cctv ?? 0).toString(), label: 'CCTV' },
    { number: (data?.count?.body_worm ?? 0).toString(), label: 'BODY WORM' },
    { number: (data?.count?.helmet ?? 0).toString(), label: 'HELMET' },
  ];

  return (
    <ManageLayout>
      <Toolbar>
        <ToolbarHeading />
        <ToolbarActions>
          <Link to="/" className="btn">
            Kembali Home
          </Link>
        </ToolbarActions>
      </Toolbar>
      <Container>
        <div className="mb-4">
          <Statistics items={items} isLoading={isLoading} />
        </div>
        <TableDevice data={data} refetch={refetch} isLoading={isLoading} />
      </Container>
    </ManageLayout>
  );
}
