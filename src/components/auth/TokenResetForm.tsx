// src/components/auth/TokenResetForm.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useAuthResetApi } from "@/hooks/useAuthReset";
import { validatePassword } from "@/lib/utils/validatePassword";
import { useLoading } from "@/context/loading/LoadingContext";
import { showToast } from "nextjs-toast-notify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";

type Props = {
  email: string;
  expiresAt?: string;
  onSuccess?: () => void;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TokenResetForm({ email, expiresAt, onSuccess }: Props) {
  const { resetPassword } = useAuthResetApi();
  const { show, hide } = useLoading();

  // OTP state: array de 6 strings
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // calcular timeLeft desde expiresAt
  useEffect(() => {
    if (!expiresAt) {
      setTimeLeft(null);
      return;
    }
    const target = new Date(expiresAt).getTime();
    const tick = () => {
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setTimeLeft(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  // OTP input handlers
  function handleOtpChange(idx: number, value: string) {
    if (!/^[0-9]*$/.test(value)) return;
    const v = value.slice(-1); // solo último num
    setOtp((prev) => {
      const copy = [...prev];
      copy[idx] = v;
      return copy;
    });
    if (v && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function otpToString() {
    return otp.join("");
  }

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError(null);

    if ((timeLeft ?? 0) <= 0) {
      setFormError("El código expiró. Solicite uno nuevo.");
      return;
    }

    const token = otpToString();
    if (token.length !== 6) {
      setFormError("Ingrese los 6 dígitos del código.");
      return;
    }

    // Validar contraseñas en cliente
    if (newPassword !== confirmPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    const { valid, errors } = validatePassword(newPassword, {});
    if (!valid) {
      setFormError(errors.join(" "));
      return;
    }

    try {
      show();
      const result = await resetPassword(token, newPassword);
      if (!result.success) {
        setFormError(result.message || "No se pudo restablecer la contraseña.");
        return;
      }

      showToast.success("Contraseña restablecida correctamente.", { position: "bottom-right" });
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.message || "Error al restablecer la contraseña.";
      setFormError(msg);
    } finally {
      hide();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        Ingresamos el código al correo <span className="font-medium">{email}</span>.
        {timeLeft !== null && (
          <span className="ml-2 text-xs text-gray-400">Expira en {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
        )}
      </p>

      {formError && <div className="mb-3 text-sm text-red-600">{formError}</div>}

      <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
        {/* OTP boxes */}
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              ref={(el) => { if (el) {
                    inputsRef.current[i] = el;
                    }
                    }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i]}
              onChange={(ev) => handleOtpChange(i, ev.target.value)}
              onKeyDown={(ev) => handleKeyDown(i, ev)}
              className="w-12 h-12 text-center rounded-md border border-gray-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 bg-white dark:bg-gray-900 dark:border-gray-700"
              aria-label={`Dígito ${i + 1}`}
            />
          ))}
        </div>

        <div className="space-y-2">
          <div>
            <Label>Nueva contraseña</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div>
            <Label>Confirmar contraseña</Label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              Restablecer contraseña
            </Button>
            <Button variant="ghost" onClick={() => {
              // permitir volver a solicitar
              setOtp(Array(6).fill(""));
              setNewPassword("");
              setConfirmPassword("");
            }}>
              Limpiar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
