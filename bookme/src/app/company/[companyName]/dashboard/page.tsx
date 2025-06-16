"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign, Users, Star, Plus } from "lucide-react";

const mockSalon = {
  id: 1,
  name: "Glamour Studio",
  owner: "Sarah Johnson",
  address: "123 Main St, Ulaanbaatar",
  phone: "+976 1234 5678",
  email: "info@glamourstudio.mn",
};

const mockStats = {
  todayBookings: 8,
  weeklyRevenue: 2450000,
  totalEmployees: 5,
  averageRating: 4.8,
};

const mockBookings = [
  {
    id: 1,
    clientName: "Anna Smith",
    serviceName: "Hair Cut & Style",
    stylistName: "Maria Kim",
    date: "2024-01-15",
    time: "14:00",
    status: "confirmed",
    price: 45000,
  },
  {
    id: 2,
    clientName: "John Doe",
    serviceName: "Hair Coloring",
    stylistName: "Sarah Johnson",
    date: "2024-01-15",
    time: "16:30",
    status: "pending",
    price: 85000,
  },
];

const mockEmployees = [
  {
    id: 1,
    name: "Maria Kim",
    role: "Senior Stylist",
    experience: "5 years",
    rating: 4.9,
    todayBookings: 6,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Hair Colorist",
    experience: "8 years",
    rating: 4.8,
    todayBookings: 4,
  },
];

export default function SalonDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <span className="text-xl font-bold">SalonBook</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{mockSalon.name}</span>
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Salon Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your salon operations and bookings
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-pink-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Today's Bookings
                  </p>
                  <p className="text-2xl font-bold">
                    {mockStats.todayBookings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Weekly Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ₮{mockStats.weeklyRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Employees</p>
                  <p className="text-2xl font-bold">
                    {mockStats.totalEmployees}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold">
                    {mockStats.averageRating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">152</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₮ 12,000,000</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Clients</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">34</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">18</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Bookings</CardTitle>
                  <CardDescription>
                    Manage your appointments for today
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Booking
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {booking.clientName}
                          </h3>
                          <p className="text-gray-600">{booking.serviceName}</p>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {booking.stylistName}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {booking.time}
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">
                            ₮{booking.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {booking.status === "pending" && (
                          <Button size="sm">Confirm</Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>
                    Manage your salon staff and their schedules
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEmployees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {employee.name}
                          </h3>
                          <p className="text-gray-600">{employee.role}</p>
                          <p className="text-sm text-gray-500">
                            {employee.experience} experience
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">
                              {employee.rating}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {employee.todayBookings} bookings today
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          Set Availability
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Services & Pricing</CardTitle>
                  <CardDescription>
                    Manage your salon services and pricing
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Service management interface will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Salon Settings</CardTitle>
                <CardDescription>
                  Manage your salon information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Salon Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>{" "}
                        {mockSalon.name}
                      </div>
                      <div>
                        <span className="text-gray-600">Owner:</span>{" "}
                        {mockSalon.owner}
                      </div>
                      <div>
                        <span className="text-gray-600">Address:</span>{" "}
                        {mockSalon.address}
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>{" "}
                        {mockSalon.phone}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Edit Salon Information</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
