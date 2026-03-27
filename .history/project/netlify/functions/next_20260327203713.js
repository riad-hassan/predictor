export async function handler() {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    const res = await fetch(`${url}/rest/v1/crash_state?id=eq.1&select=next_crash`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      }
    });

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crashPoint: data[0].next_crash })
    };

  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}