import { searchDashboardAtom } from "@/common/module/SettingsJotai";
import LoadingGetData from "@/components/Loading/LoadingGetData";
import Navigation from "@/components/Navigation/Navigation";
import { useAllCctv } from "@/services/api/cctv/get/get.hooks";
import { Cctv } from "@/types/Cctv/TypeCctv";
import { useAtom } from "jotai";
import GridLayout from "react-grid-layout";
import { useDetailLayout, useLayoutByUser } from "@/services/api/layout/get/get.hooks";
import { useEffect, useState } from "react";
import StreamCard from "@/components/StreamCard";
import { useSearchParams } from "react-router-dom";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function BodyWorm() {
  const [searchDashboard] = useAtom(searchDashboardAtom);
  const { isLoading, data } = useAllCctv(1000);

  const [searchParams] = useSearchParams();
  const region = searchParams.get("region");
  const { data: dataUserLayout, isLoading: isLoadingUserLayout } = useLayoutByUser(
    region != null ? parseInt(region) : 1
  );

  const { data: dataLayout, isLoading: isLoadingLayout } = useDetailLayout(
    {
      id: dataUserLayout?.data?.layout?.find((layout: any) => layout.name === "body_worm")?.id || "3",
      refetchInterval: 1000,
    },
    {
      enabled: !isLoadingUserLayout && !!dataUserLayout,
    }
  );

  const [layout, setLayout] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && data?.data) {
     
      const rawLayout = dataLayout?.data?.layout?.layout;
      const layoutArray = Array.isArray(rawLayout) ? rawLayout : [];

      // Filter only Body-Worm cameras (type === 3)
      const bodyWormCameras = data.data.filter((cctv: Cctv) => cctv.type === 3);

      let generatedLayout;
      
      if (layoutArray.length > 0) {
    
        generatedLayout = layoutArray
          .filter((item) => bodyWormCameras.some((cctv: Cctv) => cctv.path_slug === item.i))
          .map((item) => {
            const matchedCctv = bodyWormCameras.find((cctv: Cctv) => cctv.path_slug === item.i);
            item.data = matchedCctv!;
            return item;
          });
      } else {
    
        generatedLayout = bodyWormCameras.map((cctv: Cctv, index: number) => ({
          i: cctv.path_slug,
          x: (index % 3) * 4, // 3 columns
          y: Math.floor(index / 3) * 3, // 3 rows per column
          w: 4,
          h: 3,
          data: cctv,
        }));
      }

      setLayout(generatedLayout);
    }
  }, [isLoading, data, dataLayout, isLoadingLayout]);

  if (isLoading || isLoadingUserLayout || isLoadingLayout) {
    return (
      <DashboardLayout>
        <LoadingGetData />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Navigation />
      {isLoading || isLoadingUserLayout || isLoadingLayout ? (
        <LoadingGetData />
      ) : layout.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-white text-xl">No Body-Worm cameras found</p>
          <p className="text-gray-400 text-sm mt-2">Please add Body-Worm cameras in the management page</p>
        </div>
      ) : (
        <GridLayout
          className="layout pointer-events-none"
          layout={layout}
          cols={12}
          rowHeight={100}
          width={1835}
          isDraggable={false}
          isResizable={false}
        >
          {layout?.map((item, i: number) => (
            <div
              data-grid={layout[i]}
              className={`h-full w-full ${
                item.data.name.toLowerCase().includes(searchDashboard.toLowerCase()) ? "" : "hidden"
              }`}
              key={i}
            >
              <StreamCard
                is_detail={false}
                active={item?.data?.status}
                path_slug={item?.data?.path_slug}
                name={item?.data?.name}
                redirect={`/body-worm/${item?.data?.id}`}
                type={3}
                star={item?.data?.star}
              />
            </div>
          ))}
        </GridLayout>
      )}
    </DashboardLayout>
  );
}
