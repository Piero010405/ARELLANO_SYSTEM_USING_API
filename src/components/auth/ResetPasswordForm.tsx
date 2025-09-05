"use client";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useState, FormEvent } from "react";
import { useLoading } from "@/context/loading/LoadingContext";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);;
  const { show, hide } = useLoading();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      show();
      
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login error:", error);
      setError("Credenciales incorrectas");
    } finally {
      hide();
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        
        <div>
          
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingrese la dirección de correo corporativo vinculada a su cuenta y le enviaremos un enlace para restablecer su contraseña.
            </p>
          </div>

          <div>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email Corporativo <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="Ingresar correo institucional" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div>
                  <Button className="w-full" size="sm">
                    Solicitar Enlace de Reinicio
                  </Button>
                </div>

                <div className="flex items-center justify-start gap-x-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ya recordaste tu contraseña...
                    </p>
                  <Link
                    href="/login"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Regresar →
                  </Link>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
