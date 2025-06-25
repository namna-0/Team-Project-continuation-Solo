import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CompanyBackgroundImageEdit } from "./CompanyBackgroundImageEdit";
import { CompanyLogoEdit } from "./CompanyLogoEdit";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CompanyOtherPictures } from "./CompanyOtherPictures";

export function ImagesSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Компанийн зураг</h1>
        <p className="text-muted-foreground">Компанийн зураг засварлах хэсэг</p>
      </div>

      <div className="grid gap-6">
        <CompanyLogoEdit />
        <CompanyOtherPictures />
        <CompanyBackgroundImageEdit />
      </div>
    </div>
  );
}
