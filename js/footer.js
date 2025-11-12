(async () => {
  try {
    const res = await fetch("/Templates/helpers/footer.html");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const footer = document.getElementById("footer-placeholder");
    if (footer) {
      footer.innerHTML = html;
    }
  } catch (err) {
    console.error("Footer load error:", err);
  }
})();
