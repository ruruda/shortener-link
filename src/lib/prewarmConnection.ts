import prisma from "./prisma";

export async function prewarmConnection() {
  try {
    await prisma.link.findFirst()
  } catch (error: any) {
    console.log("Error in prewarmConnection: ", error.message);
  }
}