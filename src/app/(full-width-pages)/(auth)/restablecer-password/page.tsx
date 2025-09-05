import { buildMetadata } from "@/app/lib/metadata";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = buildMetadata("Olvide mi Contraseña");

export default function ResetPassword() {
  return <ResetPasswordForm />;
}