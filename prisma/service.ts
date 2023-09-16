import { Service } from "@prisma/client";
import prisma from "./prisma";

// Create a new service
export async function createService(
  data: Omit<Service, "id" | "createdAt">
): Promise<Service> {
  try {
    const service = await prisma.service.create({
      data,
    });
    return service;
  } catch (error) {
    console.error("Service creation failed:", error);
    throw new Error("Failed to create service");
  }
}

// Get all services
export async function getAllServices(): Promise<Service[]> {
  try {
    const services = await prisma.service.findMany();
    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw new Error("Failed to retrieve services");
  }
}

// Get a service by ID
export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const service = await prisma.service.findUnique({
      where: {
        id,
      },
    });

    return service;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw new Error("Failed to retrieve service by ID");
  }
}

// Update a service by ID
export async function updateService(
  id: string,
  data: Partial<Service>
): Promise<Service> {
  try {
    const updatedService = await prisma.service.update({
      where: {
        id,
      },
      data,
    });

    return updatedService;
  } catch (error) {
    console.error("Service update failed:", error);
    throw new Error("Failed to update service");
  }
}

// Delete a service by ID
export async function deleteService(id: string): Promise<void> {
  try {
    await prisma.service.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Service deletion failed:", error);
    throw new Error("Failed to delete service");
  }
}
