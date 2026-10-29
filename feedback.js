const formUrl = window.googleFeedbackFormUrl;
const feedbackContent = document.getElementById('feedback-content');
const lab = new URLSearchParams(window.location.search).get('lab');
const feedbackField = 'entry.953735272';

if (formUrl) {
  const url = new URL(formUrl);
  if (lab) url.searchParams.set(feedbackField, lab);
  url.searchParams.set('embedded', 'true');
  feedbackContent.innerHTML = `<iframe class="feedback-form" title="Lab feedback form" src="${url.href}">Loading…</iframe>`;
} else {
  feedbackContent.innerHTML = '<section class="feedback-unavailable"><p>The feedback form will be available here shortly.</p></section>';
}
