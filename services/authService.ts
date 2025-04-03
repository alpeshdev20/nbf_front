export function checkNewUser(): boolean {
    if (typeof window !== "undefined") {
      return localStorage.getItem("new_user") === "true";
    }
    return false; // Default to false if running on the server
  }