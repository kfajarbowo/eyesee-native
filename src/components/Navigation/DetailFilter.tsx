import { CiSearch, CiSquareChevLeft } from "react-icons/ci";
import { useAtom } from "jotai";
import {
  searchDashboardAtom,
} from "@/common/module/SettingsJotai";
import { Link } from "react-router-dom";
import { hasPermission } from "@/utils/permissions";
import { useAuth } from "@/hooks/useAuth";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaCaretLeft } from "react-icons/fa";

export default function DetailFilterNavigation({
  backURL,
  urlManage,
  permissionManage
}: Readonly<{ backURL: string; urlManage: string; permissionManage: string }>) {
  const [, setsearchDashboardAtom] = useAtom(searchDashboardAtom);
  const { user, isAuthenticated } = useAuth();
  return isAuthenticated && (
    <div className="flex justify-between pt-3">
      <Link
        className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3 cursor-pointer"
        to={backURL}
      >
        <FaCaretLeft size={24} /> Kembali
      </Link>


      <div className="flex gap-3">
        <label className="input input-bordered flex items-center gap-2 bg-deep-teal bg-opacity-50 rounded text-white">
          <input
            type="text"
            className="grow"
            placeholder="Cari"
            onChange={(e) => setsearchDashboardAtom(e.target.value)}
          />
          <CiSearch />
        </label>

        {hasPermission(user, permissionManage) && (
          <Link
            className="bg-deep-teal bg-opacity-50 rounded text-white flex items-center justify-center p-3"
            to={urlManage}
          >
            <img src="/icons/filter.svg" alt="filter" width="25" height="25" />
          </Link>
        )}
      </div>

    </div>
  );
}
