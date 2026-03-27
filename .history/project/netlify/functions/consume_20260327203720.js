function generateCrash() {
  const r = Math.random();
  if (r < 0.89) return (1 + Math.random() * 2).toFixed(2);
  if (r < 0.94) return (1 + Math.random() * 4).toFixed(2);
  if (r < 0.99) return (1 + Math.random() * 6).toFixed(2);
  return (1 + Math.random() * 14).toFixed(2);
}

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
    const nextCrash = data[0].next_crash;
    const newNext = generateCrash();

    await fetch(`${url}/rest/v1/crash_state?id=eq.1`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        current_crash: nextCrash,
        next_crash: newNext,
        updated_at: new Date().toISOString()
      })
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, current: nextCrash, next: newNext })
    };

  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}