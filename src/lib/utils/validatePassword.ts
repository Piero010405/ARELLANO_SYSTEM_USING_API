// src/lib/utils/validatePassword.ts
const weakPasswords = [
  "123456", "password", "123456789", "qwerty", "111111", "abc123", "arellano123", "arellano2025", "arellano2022", "arellano2023", "arellano2024", "arellano$2025", "arellano$2025$"
];

export function validatePassword(password: string, options: { username?: string; email?: string } = {}) {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push("La contraseña debe tener al menos 12 caracteres.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Debe contener al menos una letra mayúscula.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Debe contener al menos una letra minúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Debe contener al menos un número.");
  }
  if (!/[!@#$%^&*(),.?\":{}|<>_\-]/.test(password)) {
    errors.push("Debe contener al menos un carácter especial.");
  }
  if (options.username && password.toLowerCase().includes(options.username.toLowerCase())) {
    errors.push("La contraseña no debe contener el nombre de usuario.");
  }
  if (options.email && password.toLowerCase().includes(options.email.split("@")[0].toLowerCase())) {
    errors.push("La contraseña no debe contener el email del usuario.");
  }
  if (weakPasswords.includes(password.toLowerCase())) {
    errors.push("La contraseña es demasiado común e insegura.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
