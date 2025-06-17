"use client"

export function DayAndTimePicking() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Цаг сонгох</h1>
            <p className="text-gray-600 mb-6">Та доорх товчлууруудыг ашиглан цаг сонгоно уу.</p>
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 12 }, (_, i) => (
                    <button
                        key={i}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {i + 9}:00
                    </button>
                ))}
            </div>
        </div>
    )
}

