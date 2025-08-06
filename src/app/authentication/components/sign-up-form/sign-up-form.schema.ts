import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(1, "O nome é obrigatório."),
    email: z.email("Email inválido.").trim().min(1, "O email é obrigatório."),
    password: z
      .string("Senha inválida.")
      .trim()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .max(100, "A senha deve ter no máximo 100 caracteres."),
    passwordConfirmation: z
      .string("Confirmação de senha inválida.")
      .trim()
      .min(1, "A confirmação de senha é obrigatória."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    },
  );

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
