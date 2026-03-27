async function loadCurrent() {
  const res = await fetch('/.netlify/functions/current');
  const data = await res.json();
  document.getElementById("result").innerText = "Current: " + data.crashPoint;
}

async function loadNext() {
  const res = await fetch('/.netlify/functions/next');
  const data = await res.json();
  document.getElementById("result").innerText = "Next: " + data.crashPoint;
}

async function consume() {
  const res = await fetch('/.netlify/functions/consume');
  const data = await res.json();
  document.getElementById("result").innerText =
    "Consumed → Current: " + data.current + " | Next: " + data.next;
}