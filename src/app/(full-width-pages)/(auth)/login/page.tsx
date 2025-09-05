import { buildMetadata } from "@/app/lib/metadata";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = buildMetadata("Login");

export default function SignIn() {
  return <SignInForm />;
}