export async function checkIsAdmin(userEmail?: string): Promise<boolean> {
  if (!userEmail) return false;

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  return adminEmails.some((email) => email.trim().toLowerCase() === userEmail.toLowerCase());
}
