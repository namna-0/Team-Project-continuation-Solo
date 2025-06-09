export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white">
      {/* Hero Section */}
      <section className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          Book Your Appointment Easily
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Fast, simple, and reliable scheduling for your business or personal
          needs.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition">
          Book Now
        </button>
      </section>
      {/* Services Section */}
      <section className="mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Medical</h2>
          <p className="text-sm text-muted-foreground">
            Schedule with doctors, clinics, or health professionals.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Salon & Spa</h2>
          <p className="text-sm text-muted-foreground">
            Book a beauty or grooming service with easeasd.
          </p>
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Consulting</h2>
          <p className="text-sm text-muted-foreground">
            Set up meetings with experts in any fiel.
          </p>
        </div>
      </section>
    </div>
  );
}
