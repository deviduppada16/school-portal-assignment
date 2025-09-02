import prisma from "@/lib/prisma";

export default async function TeachersList() {
    // Fetch all teachers with their associated school
    const teachers = await prisma.teacher.findMany({
        include: { school: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "2rem" }}>All Teachers</h1>

            {teachers.length === 0 ? (
                <p style={{ textAlign: "center" }}>No teachers found.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "15px",
                                textAlign: "center",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                        >
                            <h2 style={{ margin: "10px 0", fontWeight: "bold" }}>{teacher.name}</h2>
                            <p>Subject: {teacher.subject}</p>
                            <p>School: {teacher.school.name}</p>
                            <p>📞 {teacher.contact}</p>
                            <p>✉️ {teacher.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
