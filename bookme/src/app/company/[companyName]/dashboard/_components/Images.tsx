import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImagesSettingsPage() {
  const galleryImages = [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Images</h1>
        <p className="text-muted-foreground">
          Manage your company logo, background, and gallery images
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>
              Upload your company logo (recommended: 200x200px)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="border-[#007FFF] text-[#007FFF] hover:bg-[#007FFF]/10"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Logo
                </Button>
                <p className="text-sm text-muted-foreground">
                  PNG, JPG up to 2MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Background Image</CardTitle>
            <CardDescription>
              Upload a background image for your company profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No background image uploaded
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-[#007FFF] text-[#007FFF] hover:bg-[#007FFF]/10"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Background
              </Button>
            </div>
          </CardContent>
        </Card>

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
                {galleryImages.map((image, index) => (
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
                ))}
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
