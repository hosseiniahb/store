import Loading from "@/components/Loading";
import SettingInformation from "@/components/user/setting/SettingInformation";
import { Suspense } from "react";

export default function SettingUserPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-500">
          Setting
        </h1>
      </div>
      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <SettingInformation />
        </Suspense>
      </div>
    </div>
  );
}
