"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";

// Zod schema for validation
const schema = z.object({
    name: z.string().min(2, "Name is required"),
    subject: z.string().min(2, "Subject is required"),
    email: z.string().email("Invalid email"),
    contact: z.string().min(10, "Contact must be at least 10 digits"),
    schoolId: z.string().min(1, "Select a school"), // keep string for HTML select
});

export default function AddTeacherPage() {
    const [message, setMessage] = useState("");
    const [schools, setSchools] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: zodResolver(schema) });

    // Fetch schools for the dropdown
    useEffect(() => {
        fetch("/api/schools")
            .then(res => res.json())
            .then(data => setSchools(data))
            .catch(err => console.error(err));
    }, []);

    const onSubmit = async (data) => {
        try {
            // Convert schoolId to number before sending to API
            const payload = { ...data, schoolId: Number(data.schoolId) };

            const res = await fetch("/api/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage("Teacher added successfully ✅");
                reset();
            } else {
                setMessage("Something went wrong ❌");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Add Teacher</h1>

                <input {...register("name")} placeholder="Teacher Name" className="w-full border p-2 rounded" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <input {...register("subject")} placeholder="Subject" className="w-full border p-2 rounded" />
                {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}

                <input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input {...register("contact")} placeholder="Contact Number" className="w-full border p-2 rounded" />
                {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}

                <select {...register("schoolId")} className="w-full border p-2 rounded">
                    <option value="">Select School</option>
                    {schools.map((school) => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                    ))}
                </select>
                {errors.schoolId && <p className="text-red-500">{errors.schoolId.message}</p>}

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Submit
                </button>

                {message && <p className="text-center mt-2">{message}</p>}
            </form>
        </div>
    );
}
