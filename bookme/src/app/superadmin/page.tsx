import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  XCircle,
  Building2,
  MapPin,
  Clock,
  Users,
  Star,
} from "lucide-react";

export default function CompanyApprovalPage() {
  const pendingCompany = {
    id: "COMP-001",
    name: "Elite Services Co.",
    description:
      "Premium booking services for corporate clients with over 10 years of experience in the industry.",
    experience: 10,
    clientNumber: 250,
    email: "contact@eliteservices.com",
    phone: "+1 (555) 987-6543",
    website: "https://eliteservices.com",
    address: {
      street: "456 Corporate Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "United States",
    },
    workingHours: [
      { day: "Monday", hours: "8:00 AM - 7:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "8:00 AM - 7:00 PM" },
      { day: "Friday", hours: "8:00 AM - 7:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    images: {
      logo: "/placeholder.svg?height=100&width=100",
      background: "/placeholder.svg?height=200&width=400",
      gallery: [
        "/placeholder.svg?height=150&width=200",
        "/placeholder.svg?height=150&width=200",
        "/placeholder.svg?height=150&width=200",
        "/placeholder.svg?height=150&width=200",
      ],
    },
    submittedDate: "2024-01-15",
    status: "Pending Review",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Company Approval
          </h1>
          <p className="text-muted-foreground">
            Review and approve company registrations
          </p>
        </div>
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Admin Only
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {pendingCompany.name}
              </CardTitle>
              <CardDescription>
                Submitted on {pendingCompany.submittedDate} • Status:{" "}
                {pendingCompany.status}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-sm">{pendingCompany.description}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Experience
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">
                      {pendingCompany.experience} years
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Clients
                  </p>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {pendingCompany.clientNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{pendingCompany.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Phone
                </p>
                <p className="text-sm">{pendingCompany.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Website
                </p>
                <p className="text-sm text-blue-600">
                  {pendingCompany.website}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Company Images</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Logo
                </p>
                <img
                  src={pendingCompany.images.logo || "/placeholder.svg"}
                  alt="Company logo"
                  className="h-16 w-16 rounded-lg border object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Background Image
                </p>
                <img
                  src={pendingCompany.images.background || "/placeholder.svg"}
                  alt="Background"
                  className="h-32 w-64 rounded-lg border object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Gallery
                </p>
                <div className="grid gap-2 sm:grid-cols-4">
                  {pendingCompany.images.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${index + 1}`}
                      className="aspect-square rounded-lg border object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location & Hours
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Address
                </p>
                <div className="text-sm space-y-1">
                  <p>{pendingCompany.address.street}</p>
                  <p>
                    {pendingCompany.address.city},{" "}
                    {pendingCompany.address.state} {pendingCompany.address.zip}
                  </p>
                  <p>{pendingCompany.address.country}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Working Hours
                </p>
                <div className="space-y-1">
                  {pendingCompany.workingHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
