import { Appointment } from "@prisma/client";
import prisma from "./prisma";

// Create a new appointment
export async function createAppointment(
  data: Omit<Appointment, "id" | "createdAt">
): Promise<Appointment> {
  try {
    const appointment = await prisma.appointment.create({
      data,
    });
    return appointment;
  } catch (error) {
    console.error("Appointment creation failed:", error);
    throw new Error("Failed to create appointment");
  }
}

// Get all appointments
export async function getAllAppointments(): Promise<Appointment[]> {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        service: true,
      },
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Error("Failed to retrieve appointments");
  }
}

// Get an appointment by ID
export async function getAppointmentById(
  id: string
): Promise<Appointment | null> {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        service: true,
      },
    });

    return appointment;
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    throw new Error("Failed to retrieve appointment by ID");
  }
}

// Update an appointment by ID
export async function updateAppointment(
  id: string,
  data: Partial<Appointment>
): Promise<Appointment> {
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data,
    });

    return updatedAppointment;
  } catch (error) {
    console.error("Appointment update failed:", error);
    throw new Error("Failed to update appointment");
  }
}

// Delete an appointment by ID
export async function deleteAppointment(id: string): Promise<void> {
  try {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Appointment deletion failed:", error);
    throw new Error("Failed to delete appointment");
  }
}
