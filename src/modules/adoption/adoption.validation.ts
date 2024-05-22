import { AdoptionStatus, Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../app";

const createAdoptionValidation = z.object({
  body: z.object({
    petId: z.string({
      required_error: "PetId is required",
    }),
    petOwnershipExperience: z.string({
      required_error: "PetOwnershipExperience is required",
    }),
  }),
});

const updateAdoptionStatusValidation = z.object({
  body: z.object({
    status: z.enum([
      AdoptionStatus.PENDING,
      AdoptionStatus.APPROVED,
      AdoptionStatus.REJECTED,
    ]),
  }),
});

export const AdoptionValidations = {
  createAdoptionValidation,
  updateAdoptionStatusValidation,
};
