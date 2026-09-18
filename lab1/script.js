const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'This is AI Agent Studio.\n\nIn this lab, you will build an AI agent that answers questions about an expense policy document.\n\nAgents use tools, so first create a document tool, then create the agent.',
  'Navigate to Resources > Tools to view the available tools.\n\nTools can access Fusion data in the user’s security context, open deep links, call external services, or access documents such as an expense policy.',
  'Click Add to create a new tool.',
  'Give the tool a name that includes your initials and a number to avoid duplicates. The code is generated automatically.',
  'You can configure the tool manually or use the Brain Agent. Manual configuration may be quicker for experienced users.\n\nFor this lab, use the Brain Agent. Click the pulsating head at the bottom of the page.',
  'Enter the following prompt, then click Yes.',
  'The system has completed the fields. You can now upload the document.',
  'Close the Brain Agent dialog.',
  'Click the pencil icon beside Draft to edit the document entry.',
  'Set the status to Ready to Publish.',
  'Click Browse Files, select the policy PDF, then click Open. Scroll down to confirm that the upload completed.',
  'Click Create and Close. Your new tool appears in the list. If you do not see it at the top, search for it.',
  'Now create an agent that uses this tool. Select Agents.',
  'Click Add.',
  'Find your tool in the list on the left. Hover over it, then click the plus icon to add it to the agent.',
  'The tool is now part of the agent. Next, instruct the agent to use the tool for policy questions.',
  'Select the agent.',
  'Enter the following details:\n\nAgent name: [Your initials][number] Expense Policy Agent\nFamily: Common\nProduct: Other\nDescription: Agent that answers questions about expense policies\nMaximum interactions: 10',
  'Select Prompts.',
  'Enter the following prompt.',
  'Select LLM. For this simple use case, choose the Basic model.',
  'Select Choose a model, then select GPT OSS 120B (Basic).',
  'Your settings should now match the screenshot. Leave the remaining settings unchanged, then click Create & Close.',
  'Find your agent in the list. If it is not near the top, use Search.',
  'Next, create a workflow that uses this agent.\n\nYou can configure it manually or with the built-in no-code tools. For this lab, use the no-code tools. First copy your agent’s code.\n\nSelect AI Agent Studio. Select Workflows only if you prefer to build the workflow manually.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows: remove Applications by clicking its x.',
  'Select Workflows.',
  '',
  'Enter the following in Ask Oracle.\n\nThe screenshot uses AH001_EXPENSE_POLICY_AGENT as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'The system starts generating the workflow.',
  'Scroll down in the Brain Agent dialog, then click Yes.',
  'The system continues and requests another approval. Click Do not ask me again for this chat, then wait for it to finish. Approve any additional requested changes as needed.',
  'The workflow is ready. Click Debug and ask a question.',
  '',
  'Click Home to return to the home page.',
  '',
  'You can also use Claude or Codex to complete this work from a single prompt. The following steps show an example.',
  'Allow about one minute for the system to inspect the environment and request.',
  'The agent and document are created after about 40 seconds.',
  'Allow another 90 seconds or more for the workflow to be created.',
  'Allow about another minute for validation. The complete process finishes in less than four and a half minutes.',
  'The workflow is created.',
  'The tool is created. Upload the PDF to complete its setup.',
  'You are ready to test the workflow.',
  'Download the working example to review the completed tool, agent, and workflow.'
];

const titles = ['Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available tools', 'Start a new tool', 'Name the tool', 'Use the Brain Agent', 'Request document tool setup', 'Review generated fields', 'Close the Brain dialogue', 'Edit the document entry', 'Set document status', 'Upload the policy PDF', 'Create the tool', 'Open Agents', 'Start a new agent', 'Add the document tool', 'Configure the agent', 'Select the agent', 'Enter agent details', 'Open Prompts', 'Add the agent prompt', 'Open LLM settings', 'Choose the Basic model', 'Create the agent', 'Find the agent', 'Prepare a workflow', 'Switch to Workflows', 'Select Workflows', 'Workflow workspace', 'Request workflow generation', 'Wait for generation', 'Approve the first change', 'Approve remaining changes', 'Debug the workflow', 'Workflow test', 'Return home', 'Home page', 'Alternative: create with Claude or Codex', 'Inspect the request', 'Create the agent and document', 'Create the workflow', 'Validate the work', 'Review the workflow', 'Review the tool', 'Test the result', 'Working example'];

const copyText = {
  8: 'Complete the required fields for a document tool that will contain the company expense policy. Do not overwrite any fields that already have a value. Set Family to Common and Product to Other. Create a document entry. I will upload the policy PDF after the tool is created.',
  22: 'Answer the user’s expense-policy questions by using the provided document tool.',
  31: 'Create a workflow that uses a single agent ‘YOUR_AGENT_CODE’. The workflow receives the user’s question, and the agent answers it.'
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

for (let slide = 1; slide <= 47; slide += 1) {
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `slide-${slide}`;
  const noteHtml = notes[slide - 1] ? notes[slide - 1].split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('') : '';
  const visual = slide === 37
    ? '<div class="composite"><img src="assets/slides/36.png" alt="Step 37 workflow response"><img class="overlay" src="assets/slides/37.png" alt=""></div>'
    : slide === 47
      ? '<div class="empty-slide" aria-label="Blank final step"></div>'
      : `<img class="slide-shot" src="assets/slides/${String(slide).padStart(2, '0')}.png" alt="Step ${slide}: ${escapeHtml(titles[slide - 1])}">`;
  const copy = copyText[slide] ? `<div class="copy-block"><div class="copy-head"><span>Text to enter</span><button type="button" data-copy="${slide}">Copy</button></div><pre>${escapeHtml(copyText[slide])}</pre></div>` : '';
  const resource = slide === 13
    ? '<p class="document-link"><a href="assets/documents/expense-policy.pdf" target="_blank" rel="noopener">Download the expense policy PDF</a></p>'
    : slide === 47
      ? '<p class="document-link"><a href="assets/documents/ah001_expense_policy_workflow.zip" download>Download the working example</a></p>'
      : '';
  section.innerHTML = `<div class="number">Step ${slide}</div><div class="step-content"><h2>${titles[slide - 1]}</h2><div class="notes">${noteHtml}${resource}</div>${copy}${visual}</div>`;
  steps.append(section);
  const link = document.createElement('a');
  link.href = `#slide-${slide}`;
  link.textContent = slide;
  link.setAttribute('aria-label', `Go to step ${slide}: ${titles[slide - 1]}`);
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
