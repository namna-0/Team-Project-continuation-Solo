"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Employee } from "@/app/signup/_components/Types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { EmployeeDeleteButton } from "./EmployeeDeleteButton";
import { EmployeeEditButton } from "./EmployeeEditButton";
import axios from "axios";
import { LoadingSvg } from "@/app/_components/assets/LoadingSvg";

type PropsType = {
  employee: Employee;
  getCompanyAction: () => Promise<void>;
};

export type UpdatedData = {
  profileImage: string;
  startTime: string;
  endTime: string;
  lunchTimeStart: string;
  lunchTimeEnd: string;
  description: string;
};

export const EmployeeCard = ({ employee, getCompanyAction }: PropsType) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [updatedEmployee, setUpdatedEmployee] = useState<UpdatedData>({
    profileImage: employee.profileImage,
    startTime: employee.startTime,
    endTime: employee.endTime,
    lunchTimeStart: employee.lunchTimeStart,
    lunchTimeEnd: employee.lunchTimeEnd,
    description: employee.description,
  });

  const handleChangeEmployeeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmployeAvailable = async () => {
    if (!employee) return;
    try {
      const req = await api.put(`/employee/${employee._id}`, {
        availability: isAvailable,
      });
      await getCompanyAction();
      setIsAvailable(!isAvailable);

      toast.success(
        `${employee.employeeName} ажилтны төлөв амжилттай өөрчлөгдлөө.`
      );
    } catch (error) {
      console.error("Ажилтны төлөв өөрчлөхөд алдаа гарлаа.");
      toast.error("Ажилтны төлөв өөрчлөхөд алдаа гарлаа.");
    }
  };

  const uploadedImageFunction = async (
    file: File | null
  ): Promise<string | null> => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET_DATA!
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.url;
    } catch (error) {
      console.error("Failed to upload image", error);
      return null;
    }
  };

  const handleEditEmployeImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadedImageFunction(file);
      if (result) {
        setUpdatedEmployee((prev) => ({
          ...prev,
          profileImage: result,
        }));
      }
    }
    setProfileLoading(false);
  };
  // useEffect(() => {
  //   if (employee) {
  //   }
  // }, [updatedEmployee]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex gap-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div
              className="p-1 w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor: employee.availability ? "#00c04b" : "#ff0000",
                animation: "pulse 3s infinite",
              }}
            ></div>

            <div>Ажилтан:</div>
            {employee.employeeName}
          </CardTitle>
        </div>

        <Switch
          checked={employee.availability}
          onCheckedChange={handleEmployeAvailable}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="space-y-2 flex gap-3 ">
            <div className="flex flex-col gap-3">
              <div className="w-[200px] h-[200px] flex justify-center items-center">
                {profileLoading ? (
                  <LoadingSvg />
                ) : (
                  <img
                    src={`${updatedEmployee.profileImage}`}
                    className="w-[200px] h-[200px] rounded-2xl shadow-gray-300 shadow-2xl"
                  />
                )}
              </div>
              <div className="w-full flex justify-center relative">
                <Button className="bg-[#007FFF] hover:bg-[#007FFF]/90 w-full border-2 ">
                  Зураг солих
                </Button>
                <Input
                  type="file"
                  name="profileImage"
                  className="absolute z-10 opacity-0 cursor-pointer"
                  onChange={handleEditEmployeImage}
                />
              </div>
            </div>

            <div className="w-full  flex flex-col justify-center gap-7">
              <div className="pl-4 flex gap-10">
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Ажлын цаг эхлэх</div>
                  <Input
                    type="time"
                    name="startTime"
                    defaultValue={updatedEmployee.startTime}
                    disabled={!employee.availability}
                    onChange={handleChangeEmployeeData}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Ажлын цаг дуусах</div>
                  <Input
                    type="time"
                    name="endTime"
                    defaultValue={updatedEmployee.endTime}
                    disabled={!employee.availability}
                    onChange={handleChangeEmployeeData}
                  />
                </div>
              </div>
              <div className="pl-4 flex gap-10">
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Цайны цаг эхлэх</div>
                  <Input
                    type="time"
                    name="lunchTimeStart"
                    defaultValue={updatedEmployee.lunchTimeStart}
                    disabled={!employee.availability}
                    onChange={handleChangeEmployeeData}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Цайны цаг дуусах</div>
                  <Input
                    type="time"
                    name="lunchTimeEnd"
                    defaultValue={updatedEmployee.lunchTimeEnd}
                    disabled={!employee.availability}
                    onChange={handleChangeEmployeeData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[13px]">Ажилтны товч мэдээлэл:</div>
            <Textarea
              className="text-sm font-medium w-full"
              name="description"
              defaultValue={updatedEmployee.description}
              disabled={!employee.availability}
              onChange={handleTextareaChange}
            ></Textarea>
          </div>

          <div className="w-full flex justify-end gap-3">
            <EmployeeEditButton
              employeeId={employee._id}
              employeeName={employee.employeeName}
              updatedEmployee={updatedEmployee}
            />
            <EmployeeDeleteButton
              employeeId={employee._id}
              employeeName={employee.employeeName}
              employeeProfilePicture={employee.profileImage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
