import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ImageSVG } from "./assets/ImageSVG";
import { LoadingSvg } from "@/app/_components/assets/LoadingSvg";
import { Input } from "@/components/ui/input";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { useSettings } from "../_providers/CompanySettingsProvider";
import { api } from "@/axios";
import { toast } from "sonner";
export const CompanyLogoEdit = () => {
  const { company, getCompany } = useCompanyAuth();
  const { logoLoading, setLogoLoading, handleInputCompanyLogo } = useSettings();

  const handleDeleteLogo = async () => {
    setLogoLoading(true);

    try {
      const req = await api.put(`/company/${company?._id}`, {
        companyLogo: null,
      });
      console.log(req, "REQUSET");

      await getCompany();
      console.log("sss");

      toast.success("Зураг амжилттай устгалаа.");
    } catch (error) {
      console.error("Зураг устгахад алдаа гарлаа.", error);
      toast.error("Зураг устгахад алдаа гарлаа.");
    } finally {
      setLogoLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Компанийн Лого</CardTitle>
        <CardDescription>
          Компанийн зураг шинэчлэх (хэмжээ: 96x96px)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="relative">
            {logoLoading ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                <LoadingSvg />
              </div>
            ) : !company?.companyLogo ? (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                <ImageSVG />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={`${company?.companyLogo}`}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <Button
                  className="absolute -right-2 -top-2 rounded-full w-6 h-6 text-xs opacity-60 hover:opacity-100"
                  onClick={handleDeleteLogo}
                >
                  x
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2 relative">
            <div>
              <Button
                variant="outline"
                className="border-[#007FFF] text-[#007FFF] hover:bg-[#007FFF]/10 hover:text-[#007FFF]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Зураг оруулах
              </Button>
            </div>
            <div className="w-[141px] absolute top-0 opacity-0">
              <Input
                type="file"
                className="w-full"
                onChange={handleInputCompanyLogo}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
