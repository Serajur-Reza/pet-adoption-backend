import { AdoptionStatus } from "@prisma/client";
import { z } from "zod";

const createAdoptionValidation = z.object({
  body: z.object({
    petId: z.string({
      required_error: "PetId is required",
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

export const adoptionValidations = {
  createAdoptionValidation,
  updateAdoptionStatusValidation,
};
