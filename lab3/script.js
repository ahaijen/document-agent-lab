const notes = [
  'Policies are business rules that need consistent, deterministic interpretation. An LLM is not a good fit for this type of decision because it adds cost and latency and can introduce hallucinations.\n\nThis fictional travel policy determines whether a business trip is acceptable. You will use the policy document to create a fully deterministic policy that can be reused in workflows.',
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build a policy model without writing code. It applies the travel policy with predictable outcomes. Select Policy Models.',
  'Your list may look different. You should see a list of policy templates. In this lab, you will create a policy directly from the policy document rather than create a template. Select Policies.',
  'Your list may look different. You should now see a list of policies. Create a policy directly from the policy document by clicking Add.',
  'Enter the following fields. Leave all other fields empty.',
  'Enter the following prompt. It guides the policy builder to create the policy.',
  'Attach the policy document you downloaded in Step 1. Click Choose File and select the file.',
  'Click Generate. The system generates the policy from the document and the prompt.',
  'Generation can take a few seconds. When it finishes, select the function.',
  'Select Input to review the information required by the function.',
  'The four required input parameters come from the policy document. Select Test Cases to validate the policy.',
  'There are no test cases yet. You can create them manually, generate them, or upload a spreadsheet that business owners maintain.\n\nFor this lab, click Generate.',
  'Your test cases may differ, but they provide a good starting point. Select Run Cases to run them and validate the results.',
  'The system processes these cases quickly because it does not use AI or an LLM.\n\nTo understand a result, select the question-mark icon beside a test case. Do this for the first test case.',
  'The system explains the test case and result in plain language. When you are satisfied with the policy, click Publish.',
  'The policy is ready to use. A workflow is needed to use the policy, but workflow creation is outside this lab. The next step shows the result.',
  'This example shows a policy node in a workflow making fully deterministic, explainable decisions.',
  'End of Lab.'
];

const titles = [
  'Travel policy overview', 'Sign in', 'Open AI Agent Studio', 'Open Policy Models', 'Open Policies', 'Create a policy', 'Enter policy details', 'Add the policy prompt', 'Upload the policy document', 'Generate the policy', 'Open the generated function', 'Review inputs', 'Review required inputs', 'Generate test cases', 'Run test cases', 'Explain a test result', 'Publish the policy', 'Policy ready for workflow use', 'Policy node example', 'End of Lab'
];

const policyPrompt = `Create a Travel Eligibility policy template using the uploaded policy document as the source of truth.

Required inputs:
- \`destination\`: string
- \`estimatedAmountEUR\`: number
- \`customerMeeting\`: Boolean
- \`arrEstimateEUR\`: number

Return only:
- \`decision\`: \`ALLOWED\`, \`NOT_ALLOWED\`, \`MANAGER_REVIEW\`, or \`NEED_INFO\`
- \`reason\`: a short explanation

Generate deterministic logic and representative tests from the document. Do not invent rules or missing values. Return \`NEED_INFO\` for missing or invalid inputs and explain what is needed in \`reason\`. Leave approval execution to the workflow.`;

const copyText = {
  7: 'Name: [Your initials][number] Travel Policy\nDescription: [Your initials][number] Travel Policy\nTemplate: Generic',
  8: policyPrompt
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

for (let step = 1; step <= 20; step += 1) {
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;
  const noteHtml = notes[step - 1].split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
  const resource = step === 1 ? '<p><a class="document-link" href="assets/documents/travel-demo-policy.md" download>Download the travel policy document</a></p>' : '';
  const visual = step === 20
    ? '<div class="empty-slide" aria-label="Blank final step"></div>'
    : `<img class="slide-shot" src="assets/slides/${String(step).padStart(2, '0')}.png" alt="Step ${step}: ${escapeHtml(titles[step - 1])}">`;
  const copy = copyText[step] ? `<div class="copy-block"><div class="copy-head"><span>Text to enter</span><button type="button" data-copy="${step}">Copy</button></div><pre>${escapeHtml(copyText[step])}</pre></div>` : '';
  section.innerHTML = `<div class="number">Step ${step}</div><div class="step-content"><h2>${titles[step - 1]}</h2><div class="notes">${noteHtml}${resource}</div>${copy}${visual}</div>`;
  steps.append(section);
  const link = document.createElement('a');
  link.href = `#step-${step}`;
  link.textContent = step;
  link.setAttribute('aria-label', `Go to step ${step}: ${titles[step - 1]}`);
  contents.append(link);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = copyText[button.dataset.copy];
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select text'; }
    window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
});
