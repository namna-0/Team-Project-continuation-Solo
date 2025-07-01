import { EditCompanyBasicInfo } from "./EditCompanyBasicInfo";
import { EditCompanyContactInfo } from "./EditCompanyContactInfo";

export function GeneralSettingsPage() {
  return (
    <div className="space-y-6 w-full h-full min-h-[calc(100vh-80px)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ерөнхий мэдээлэл</h1>
        <p className="text-muted-foreground">Компаний мэдээллээ шинэчлэх</p>
      </div>

      <div className="grid gap-6">
        <EditCompanyBasicInfo />

        <EditCompanyContactInfo />
      </div>
    </div>
  );
}
