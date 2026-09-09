const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that looks up supplier information.\n\nThe agent uses Business Object tools to securely search Fusion data.',
  'The required tool already exists. Navigate to Resources > Tools.',
  'Search for the AH-010926 Supplier Query Tools tool.',
  'Open the tool by clicking its Edit icon. It can search suppliers by name or number, and retrieve the details of a specific supplier.\n\nBusiness Object tools securely retrieve data and control the fields and actions available to the agent. Creating these tools usually requires a more technical role.\n\nClick Home.',
  'Now create the agent. Navigate to Resources > Agents.',
  'Click Add.',
  'Enter the following agent details.',
  'Add the tool. Search for AH-010926 Supplier Query Tools.',
  'Hover over the tool and click Add to Agent.',
  'The tool is now part of the agent. Select the agent to add the prompt and other settings.',
  'Select Prompts.',
  'This prompt includes the required tool calls, selection logic, and guardrails. Paste it into the Prompt field.',
  'Set Summarization mode to Custom. Then paste the following text into the summarization prompt.',
  'Click Save and Close.',
  'The agent is ready. Next, create a workflow to test it. Copy your agent code, then select AI Agent Studio.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows: remove Applications by clicking its x.',
  'Select Workflows.',
  '',
  'Enter the following in Ask Oracle.\n\nThe screenshot uses AH001_SUPPLIER_QUERY_AGENT as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'Click Yes for each approval request until the workflow is created.',
  'Click Debug and enter the following question.',
  'Ask for the details of a specific supplier by entering the following supplier number.',
  '',
  'This is an agent created by Codex in a few minutes. The prompt needs further refinement, but the initial result already looks good.',
  ''
];

const titles = [
  'Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available tools', 'Find the supplier tool', 'Review tool details', 'Open Agents', 'Start a new agent', 'Enter agent details', 'Find the supplier tool', 'Add the tool to the agent', 'Configure the agent', 'Open Prompts', 'Add the agent prompt', 'Add the summarization prompt', 'Save the agent', 'Prepare the workflow', 'Switch to Workflows', 'Select Workflows', 'Ready to create the workflow', 'Request workflow generation', 'Approve workflow creation', 'Test supplier search', 'Request supplier details', 'Let’s put CODEX to work', 'Codex example', 'End of Lab'
];

const supplierPrompt = `## Role
You are a precise, read-only Oracle Fusion supplier-query agent operating under a supervisor.

## Tools
Use only:
* \`searchSuppliersByNameOrNumber\`
* \`getSupplierDetails\`

## Supplier Lookup
For every supplier lookup:
1. Extract a supplier name, partial name, or supplier number. If none is provided, ask the user to provide one.
2. Call \`searchSuppliersByNameOrNumber\` with the user's input.
3. Process the search results:

### No Matches
If no suppliers are returned:
* Tell the user that no matching suppliers were found.
* Do not call \`getSupplierDetails\`.

### Exactly One Match
If exactly one supplier is returned:
* Take the \`SupplierId\` exactly as returned.
* **Immediately call \`getSupplierDetails\` using that \`SupplierId\`.**
* **Do not ask the user to select a supplier.**
* Pass the **complete \`getSupplierDetails\` response** to the final response/summarization layer.
* The final response must be based on the full supplier-details response.

### Multiple Matches
If more than one supplier is returned:
* **Do not call \`getSupplierDetails\`.**
* **Return all supplier matches to the user before asking for a selection.**
* Include every returned match and, when available:
  * Supplier Name
  * Supplier Number
  * SupplierId
* Ask the user to identify one supplier.
* When the user selects one, use only the \`SupplierId\` from the latest returned search results and then call \`getSupplierDetails\`.

## Supplier Selection
Match the user's selection only against the latest search results. A selection may be by:
* Supplier Name
* Supplier Number
* SupplierId
* Clear reference to one displayed result

Do not retrieve details until exactly one supplier has been identified.

## Follow-Up Questions
After \`getSupplierDetails\` succeeds:
* Answer using only the returned supplier-details record.
* Include any requested fields that are present.
* If a requested field is not present, say that it was not returned by the configured supplier API.

## Guardrails
**Never invent, infer, modify, or alter supplier data.**
**Never invent a SupplierId.**
**Never use a SupplierId that was not returned by the configured search tool.**
**Never call a tool other than the two configured tools.**
**Never create, update, delete, or modify supplier data.**
Preserve returned values exactly.

## Output Behavior
* Single match: return the full supplier-details result.
* Multiple matches: return all search matches, then ask the user to select one.
* No matches: state that no matching suppliers were found.
* Be concise and professional.`;

const summarizationPrompt = `## Task
Generate the final user-facing response using only the data contained in the upstream agent result.

## Rule 1 — Multiple Supplier Search Results
If the upstream result contains **more than one supplier search record**, you MUST:
1. Display **every returned supplier**.
2. Preserve these returned fields exactly:
   * Supplier Name
   * Supplier Number
   * SupplierId
3. Render the suppliers in an HTML table.
4. Ask the user to select one supplier **only after the table is displayed**.

<table border="1">
  <tr>
    <th>Supplier Name</th>
    <th>Supplier Number</th>
    <th>SupplierId</th>
  </tr>
  <!-- one row for EVERY returned supplier -->
</table>

**Never output only a sentence asking the user to select a supplier.**
**Never say "from the list above" unless the list is actually displayed in the same response.**

## Rule 2 — One Supplier With Details
If the upstream result contains a \`getSupplierDetails\` response for one supplier:
1. Display the supplier details.
2. Include all non-null fields returned by \`getSupplierDetails\`.
3. Preserve the returned values exactly.
4. Do not ask the user to select a supplier.

## Rule 3 — One Search Result Without Details
If exactly one supplier search record is present but no \`getSupplierDetails\` response is present, display that supplier and do not ask for a selection.

## Rule 4 — No Results
If no supplier records are present, state that no matching suppliers were found.

## Strict Rules
**Do not replace supplier records with a description of the records.**
**Do not acknowledge these instructions. Execute them.**
**Do not invent, infer, omit, or alter supplier data.**
**The actual supplier records must appear in the final response whenever they are present in the upstream result.**`;

const copyText = {
  9: 'Agent Name: [Your initials][number] Supplier Query Agent\nFamily: Common\nModule: Other\nDescription: An agent that can query the supplier database.',
  14: supplierPrompt,
  15: summarizationPrompt,
  21: 'Create a workflow using the agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent, allowing a query of the supplier database.',
  23: 'Show all suppliers that contain Supplies',
  24: '1337'
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

for (let step = 1; step <= 27; step += 1) {
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;
  const noteHtml = notes[step - 1] ? notes[step - 1].split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('') : '';
  const visual = step === 27
    ? '<div class="empty-slide" aria-label="Blank final step"></div>'
    : `<img class="slide-shot" src="assets/slides/${String(step).padStart(2, '0')}.png" alt="Step ${step}: ${escapeHtml(titles[step - 1])}">`;
  const copy = copyText[step] ? `<div class="copy-block"><div class="copy-head"><span>Text to enter</span><button type="button" data-copy="${step}">Copy</button></div><pre>${escapeHtml(copyText[step])}</pre></div>` : '';
  section.innerHTML = `<div class="number">Step ${step}</div><div class="step-content"><h2>${titles[step - 1]}</h2><div class="notes">${noteHtml}</div>${copy}${visual}</div>`;
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
