// src/components/auth/ResetPasswordForm.tsx
"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useLoading } from "@/context/loading/LoadingContext";
import { useAuthResetApi } from "@/hooks/useAuthReset";
import { showToast } from "nextjs-toast-notify";
import TokenResetForm from "./TokenResetForm";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ResetPasswordForm() {
  const { requestReset } = useAuthResetApi();
  const { show, hide } = useLoading();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);;

  // Si request fue exitoso guardamos expiresAt y mostramos el paso 2
  const [stepTwo, setStepTwo] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | undefined>(undefined);
  const [sentToEmail, setSentToEmail] = useState<string | null>(null);

  const onSubmitRequest = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // validación básica de email en cliente
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Ingrese un correo válido.");
      return;
    }

    try {
      show();
      const result = await requestReset(email);

      if (!result.success) {
        setError(result.message || "No se pudo enviar el correo.");
        return;
      }

      // Éxito
      setSentToEmail(email);
      setExpiresAt(result.expiresAt);
      setStepTwo(true);

      showToast.success("Se envió el código al correo.", {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (err: any) {
      const msg = err?.message || "Error al solicitar restablecimiento";
      setError(msg);
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

          {!stepTwo ? (
          <div>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={onSubmitRequest}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email Corporativo <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="Ingresar correo institucional" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div>
                  <Button className="w-full" size="sm">
                    Solicitar Código de Reinicio
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
        ) : (
        // Paso 2: componente que maneja OTP + nueva password
            <TokenResetForm
              email={sentToEmail!}
              expiresAt={expiresAt}
              onSuccess={() => {
                // redirigir al login al completar con éxito
                showToast.success("Contraseña restablecida. Redirigiendo a login...", {
                  duration: 2500,
                  position: "bottom-right",
                });
                setTimeout(() => {
                  window.location.href = "/login";
                }, 1200);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}