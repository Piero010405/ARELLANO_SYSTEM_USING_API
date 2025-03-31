export async function logout() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    
      if (res.ok) {
        window.location.href = "/login";
      } else {
        console.error("Error cerrando sesión");
    }
}