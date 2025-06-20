import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const AddCompanyImage = () => {
  const { company } = useCompanyAuth();
  const fixedCompanyImage = company?.companyImages;
  // const handleAddImage = async () => {
  //   try {
  //     const request = await api.post(`/company/${company?._id}`, {
  //       companyImages:
  //     });
  //     toast.success("Зураг амжилттай нэмэгдлээ.");
  //   } catch (error) {
  //     console.error("Зураг нэмэхэд алдаа гарлаа.");
  //     toast.error("Зураг нэмэхэд алдаа гарлаа.");
  //   }
  // };

  return (
    <div className="w-full h-full rounded-3xl relative flex flex-col items-center justify-center">
      <Button
        variant={"outline"}
        className="w-full h-full rounded-3xl flex flex-col items-center justify-center absolute top-0"
      ></Button>
      <div className="w-full flex flex-col absolute justify-center items-center">
        <span>Зураг нэмэх</span>
        <span>+</span>
      </div>
    </div>
  );
};
