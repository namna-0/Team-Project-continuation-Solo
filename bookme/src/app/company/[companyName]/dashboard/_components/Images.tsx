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

export function ImagesSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Компанийн зураг</h1>
        <p className="text-muted-foreground">Компанийн зураг засварлах хэсэг</p>
      </div>

      <div className="grid gap-6">
        <CompanyLogoEdit />
        <CompanyBackgroundImageEdit />
        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>
              Upload images to showcase your services and facilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* {galleryImages.map((image, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      className="aspect-video w-full rounded-lg border object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))} */}
                <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                  <Button
                    variant="outline"
                    className="border-[#007FFF] text-[#007FFF] hover:bg-[#007FFF]/10"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
