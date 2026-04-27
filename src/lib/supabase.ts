export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

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
