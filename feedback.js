const formUrl = window.googleFeedbackFormUrl;
const feedbackContent = document.getElementById('feedback-content');

if (formUrl) {
  const separator = formUrl.includes('?') ? '&' : '?';
  feedbackContent.innerHTML = `<iframe class="feedback-form" title="Lab feedback form" src="${formUrl}${separator}embedded=true">Loading…</iframe>`;
} else {
  feedbackContent.innerHTML = '<section class="feedback-unavailable"><p>The feedback form will be available here shortly.</p></section>';
}
