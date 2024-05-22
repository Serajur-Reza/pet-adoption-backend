import { UserRole } from "@prisma/client";
import { prisma } from "./app";
import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  // try {
  //   const superAdminExists = await prisma.user.findFirst({
  //     where: {
  //       role: UserRole.SUPER_ADMIN,
  //     },
  //   });
  //   if (superAdminExists) {
  //     console.log("super admin already exists");
  //     return;
  //   }
  //   const hashedPassword = await bcrypt.hash("superadmin", 12);
  //   const superAdminData = await prisma.user.create({
  //     data: {
  //       email: "super@admin.com",
  //       password: hashedPassword,
  //       role: UserRole.SUPER_ADMIN,
  //       Admin: {
  //         create: {
  //           name: "Super Admin",
  //           //email: "super@admin.com",
  //           contactNumber: "123456",
  //         },
  //       },
  //     },
  //   });
  //   console.log("super admin created successfully", superAdminData);
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   await prisma.$disconnect();
  // }
};

seedSuperAdmin();
