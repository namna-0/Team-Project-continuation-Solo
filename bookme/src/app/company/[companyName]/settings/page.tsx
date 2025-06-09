import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[1440px] ">
        <div className="flex justify-between items-center px-4 bg-amber-300">
          <div>
            <div className="text-[20px] font-medium">
              Organization Management
            </div>
            <div className="text-[14px] font-normal text-gray-400">
              Manage your business profile and team
            </div>
          </div>
          <Button>+ Add employee</Button>
        </div>
        <div>Second section Here</div>
      </div>
    </div>
  );
}
