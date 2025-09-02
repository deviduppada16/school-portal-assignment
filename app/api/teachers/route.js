import prisma from "@/lib/prisma";

export async function GET() {
  const teachers = await prisma.teacher.findMany();
  return new Response(JSON.stringify(teachers), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const teacher = await prisma.teacher.create({ data: body });
  return new Response(JSON.stringify(teacher), { status: 201 });
}
