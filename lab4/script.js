const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different. Select Connections.',
  'Select Edit About Me.',
  'Remove the existing text in Tell us about yourself. Enter the following text, then click Generate.',
  'Your result may differ. Next, change the prompt that controls how the text is generated. Select Cancel.',
  'Select the Home icon.',
  'Navigate to Tools > AI Agent Studio.',
  '',
  'This is AI Agent Studio. In this lab, you will customize the text-generation workflow. Select Workflows.',
  'In the Ask Oracle bar, enter the following search term.',
  'This is a published seeded workflow. To customize it, select the Eye icon. Do not select Copy.',
  'Select Customize.',
  'You are now in the editor. Select the LLM node.',
  'You can now change the prompt or the LLM used by this workflow. To make a small prompt change, scroll down to User Prompt.',
  'At the end of the User Prompt, add the following text.',
  'Select Publish. Test the change straight away.',
  'Select Publish again.',
  'Test the workflow from the Connections page. Select Back in your browser.',
  'Select the Home icon.',
  'Select Marketplace.',
  'Navigate to Me > Connections.',
  '',
  'Select your name.',
  'Select Edit About Me.',
  'Select Generate to see the updated prompt in action.',
  'Your result may differ, but the change in the output should be clear.',
  'End of Lab.'
];

const titles = [
  'Open Connections', 'Edit About Me', 'Generate About Me text', 'Review generated text', 'Return home', 'Open AI Agent Studio', '', 'Open Workflows', 'Search for About Me', 'Review seeded workflow', 'Customize the workflow', 'Open the LLM node', 'Locate User Prompt', 'Update User Prompt', 'Publish workflow', 'Confirm publication', 'Return to Connections', 'Home', 'Open Marketplace', 'Open Connections', '', 'Open your profile', 'Edit About Me', 'Generate updated text', 'Review updated result', 'End of Lab'
];

const copyText = {
  3: 'I like to work in teams. I excel when challenged and under pressure.',
  9: 'About Me',
  14: 'Talk like a pirate and end with a joke.'
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

if (steps && contents) {
for (let step = 1; step <= 26; step += 1) {
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;
  const noteHtml = notes[step - 1] ? notes[step - 1].split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('') : '';
  const visual = step === 26
    ? '<div class="empty-slide" aria-label="Blank final step"></div>'
    : `<img class="slide-shot" src="assets/slides/${String(step).padStart(2, '0')}.png" alt="Step ${step}: ${escapeHtml(titles[step - 1])}">`;
  const copy = copyText[step] ? `<div class="copy-block"><div class="copy-head"><span>Text to enter</span><button type="button" data-copy="${step}">Copy</button></div><pre>${escapeHtml(copyText[step])}</pre></div>` : '';
  section.innerHTML = `<div class="number">Step ${step}</div><div class="step-content"><h2>${titles[step - 1]}</h2><div class="notes">${noteHtml}</div>${copy}${visual}</div>`;
  steps.append(section);
  const link = document.createElement('a');
  link.href = `#step-${step}`;
  link.textContent = step;
  link.setAttribute('aria-label', `Go to step ${step}: ${titles[step - 1] || 'blank step'}`);
  contents.append(link);
}
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = copyText[button.dataset.copy];
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select text'; }
    window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
});
