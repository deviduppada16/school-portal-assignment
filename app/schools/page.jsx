import prisma from "@/lib/prisma";

export default async function SchoolsList() {
    // Fetch all schools from the database
    const schools = await prisma.school.findMany({
        orderBy: { createdAt: "desc" }, // newest first
    });

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>All Schools</h1>

            {schools.length === 0 ? (
                <p style={{ textAlign: "center" }}>No schools found.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {schools.map((school) => (
                        <div
                            key={school.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "15px",
                                textAlign: "center",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                        >
                            <img
                                src={school.image || "/placeholder.png"}
                                alt={school.name}
                                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                            />
                            <h2 style={{ margin: "10px 0" }}>{school.name}</h2>
                            <p>{school.address}</p>
                            <p>{school.city}, {school.state}</p>
                            <p>📞 {school.contact}</p>
                            <p>✉️ {school.email_id}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
