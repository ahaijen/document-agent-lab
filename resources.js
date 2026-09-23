const resourceEscapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const resourceList = document.getElementById('resource-list');

window.labResources.items.forEach((item) => {
  const article = document.createElement('article');
  article.className = 'resource-item';
  const content = item.type === 'download'
    ? `<a class="download-link" href="${item.href}" download>${item.label}</a>`
    : `<div class="copy-block"><div class="copy-head"><span>Text to enter</span><button type="button" data-copy="${item.copyStep}">Copy</button></div><pre>${resourceEscapeHtml(copyText[item.copyStep])}</pre></div>`;
  article.innerHTML = `<div class="step-number">Step ${item.step}</div><div><h2>${item.title}</h2><p class="description">${item.description}</p>${content}</div>`;
  resourceList.append(article);
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copyText[button.dataset.copy]); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select text'; }
    window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
});
