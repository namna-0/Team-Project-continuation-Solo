import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import {
  CompanyAuthProvider,
  useCompanyAuth,
} from "@/app/_providers/CompanyAuthProvider";

export function GeneralSettingsPage() {
  const { company } = useCompanyAuth();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground">Компаний мэдээллээ хянаарай.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Компаний мэдээллээ шинэчил</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">{company?.companyName}</Label>
              <Input
                id="company-name"
                placeholder="Enter company name"
                defaultValue="BookingPro Inc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-description">Description</Label>
              <Textarea
                id="company-description"
                placeholder="Enter company description"
                defaultValue="A leading booking platform for businesses"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="Enter years"
                defaultValue="5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client-number">Number of Clients</Label>
              <Input
                id="client-number"
                type="number"
                placeholder="Enter client count"
                defaultValue="150"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Update your contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                defaultValue="contact@bookingpro.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="Enter website URL"
                defaultValue="https://bookingpro.com"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-[#007FFF] hover:bg-[#007FFF]/90">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
