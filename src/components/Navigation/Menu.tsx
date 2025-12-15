import { Link, useLocation, useSearchParams } from "react-router-dom";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { MdCamera } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/utils/permissions";
import RegionSelector from "./RegionSelector";

export default function MenuNavigation() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Function to preserve query parameters
  const buildHrefWithQuery = (basePath: string) => {
    const queryString = searchParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return !isAuthenticated ? (
    <p>Loading ..</p>
  ) : (
    <div className="flex gap-3 items-center">
      {hasPermission(user, "dashboard.cctv.view") && (
        <Link
          to={buildHrefWithQuery("/")}
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto ${location.pathname === "/"
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <TbDeviceCctvFilled />
          CCTV
        </Link>
      )}
      {hasPermission(user, "dashboard.body_worm.view") && (
        <Link
          to={buildHrefWithQuery("/body-worm")}
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto whitespace-nowrap ${location.pathname?.includes("body-worm")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <MdCamera />
          Body-Worm Camera
        </Link>
      )}
      {hasPermission(user, "dashboard.helmet.view") && (
        <Link
          to={buildHrefWithQuery("/helmet")}
          className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg md:text-lg text-sm border w-auto ${location.pathname?.includes("helmet")
            ? "border-cyan-neon"
            : "border-transparent opacity-50"
            }`}
        >
          <MdCamera />
          Helmet
        </Link>
      )}

      {/* <Link
        href="#"
        className={`bg-deep-teal text-white px-4 py-2 rounded flex gap-1 items-center justify-center text-lg border ${pathname?.includes("other")
          ? "border-cyan-neon"
          : "border-transparent opacity-50"
          }`}
      >
        <MdCamera />
        Other
      </Link> */}

    </div>
  );
}
