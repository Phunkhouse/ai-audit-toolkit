const replacements = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => replacements[ch]);
}

export function page(title, bodyHtml) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body>${bodyHtml}</body></html>`;
}

export function invoiceRow(invoice) {
  return `<tr><td>${escapeHtml(invoice.id)}</td><td>${escapeHtml(invoice.issuedOn)}</td><td>${escapeHtml((invoice.amountCents / 100).toFixed(2))}</td></tr>`;
}
