const feedbackFormUrl = window.googleFeedbackFormUrl;
const feedbackField = 'entry.953735272';
const labMatch = document.querySelector('.eyebrow')?.textContent.match(/Lab\s+\d+/i);
const feedbackLabName = labMatch ? labMatch[0] : 'Lab';

if (feedbackFormUrl) {
  document.querySelectorAll('a[href="../feedback.html"]').forEach((link) => {
    link.href = `../feedback.html?lab=${encodeURIComponent(feedbackLabName)}`;
  });

  document.querySelectorAll('.lab-step').forEach((section) => {
    const step = section.querySelector('.number')?.textContent.replace('Step', '').trim();
    const stepContent = section.querySelector('.step-content');
    if (!step || !stepContent) return;

    const url = new URL(feedbackFormUrl);
    url.searchParams.set(feedbackField, `${feedbackLabName} – Step ${step}`);

    const feedback = document.createElement('p');
    feedback.className = 'step-feedback';
    feedback.innerHTML = `<a class="step-feedback-link" href="${url.href}" target="_blank" rel="noopener">Leave feedback on this step</a>`;
    stepContent.append(feedback);
  });
}
