export const SUPABASE_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  "https://rakkojwkwkrrefxjpkgi.supabase.co";

export const SUPABASE_ANON_KEY =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha2tvandrd2tycmVmeGpwa2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTA3NTAsImV4cCI6MjA5MjQ2Njc1MH0.j6F3oNuE134R6w9oXkVmhzimpcz6Ow1a76bdwRZ-xAA";

export const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export async function supabaseSelect<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...supabaseHeaders,
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase ${path} → ${res.status}`);
  }
  return res.json() as Promise<T>;
}
