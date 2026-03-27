export async function handler() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  const res = await fetch(`${url}/rest/v1/crash_state?id=eq.1&select=current_crash`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    }
  });

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ crashPoint: data[0].current_crash })
  };
}