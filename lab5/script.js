const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that shows a weather forecast for a city. It uses the public Open-Meteo API.\n\nAgents use tools, so first create a tool that calls the external API.',
  'Navigate to Resources > Tools. Tools can access Fusion data in the user’s security context, open deep links, or call external services such as the Open-Meteo API.',
  'Click Add to create a new tool.',
  'Enter the following tool details.',
  'You can configure the tool manually or use the Brain Agent. This step shows the Brain Agent approach. The following steps show the manual configuration, so you can use either approach.\n\nClick the Brain icon and enter the following request.',
  'Click Yes to allow the Brain Agent to update the tool.',
  'The tool is now created. Close the Brain Agent dialog to continue. Start at the next step if you chose the manual approach.',
  'Confirm that Human Approval is off. Enter or verify the following values, then click Add Endpoint or select the existing endpoint.',
  'Enter or verify the following endpoint values. The parameters are created automatically when you enter the resource path. In Parameters, select latitude.',
  'Enter or verify the latitude parameter values, then select longitude.',
  'Enter or verify the longitude parameter values, then select hourly.',
  'Enter or verify the hourly parameter values. This requests an hourly temperature forecast for the next seven days.\n\nClick Create and Close to create the External REST API tool.',
  'Search for your new tool using your initials and number. Next, create an agent that uses the tool. Select Agents under Resources.',
  'Click Add to create an agent.',
  'In Available Tools on the left, search for your tool using your initials.',
  'Hover over your tool and click the plus icon to add it to the agent.',
  'Your tool is now added. Select the agent above Tools (1).',
  'You are ready to enter the agent information.',
  'Enter the following agent details, then select Prompts.',
  'Enter the following in Prompt. You can choose a preferred LLM on the LLM tab or add formatting instructions in the Summarization Prompt. For this lab, click Create and Close.',
  'Search for your agent using your initials. Next, create a workflow to use the agent. You could automate this with the Brain Agent, but this lab uses the manual approach.',
  'Click the Expand icon in the upper-left corner.',
  'Select Workflows.',
  'Click Add to create the workflow manually.',
  'Enter the following workflow details.',
  'Click outside the Workflow Settings panel to edit the workflow.',
  'Hover over the circle below the triangle and right-click. Connect it to the rectangle below the Start icon, then choose Agent. Watch the video for a demonstration.',
  'Enter the following Agent node details. Scroll down to review every field.',
  'Your workflow should now match the screenshot. Click Debug to test it.',
  'Ask for a weather forecast for any city or region. For example, use the following question.',
  'The South Pole forecast is cold. Select Weather Agent in the Debug view to inspect what happened.',
  'Scroll through the debug view to inspect all inputs and outputs.',
  'End of Lab.'
];

const titles = [
  'Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available tools', 'Start a new tool', 'Enter tool details', 'Use the Brain Agent', 'Approve Brain Agent changes', 'Review the generated tool', 'Configure the REST tool', 'Configure the endpoint', 'Configure latitude', 'Configure longitude', 'Configure hourly data', 'Find the tool', 'Create an agent', 'Find the tool for the agent', 'Add the tool to the agent', 'Open agent settings', 'Prepare agent details', 'Enter agent details', 'Add the agent prompt', 'Find the agent', 'Expand the workspace', 'Open Workflows', 'Create a workflow', 'Enter workflow details', 'Open the workflow editor', 'Connect the Agent node', 'Configure the Agent node', 'Debug the workflow', 'Test the forecast', 'Inspect the Weather Agent', 'Review inputs and outputs', 'End of Lab'
];

const brainPrompt = `Update this tool so it can call the https://api.open-meteo.com/v1/forecast external REST API. Set https://api.open-meteo.com/v1 as the instance URL and /forecast as the resource path. The query parameters are latitude, longitude, and hourly. Set hourly to the fixed default value "temperature_2m". Include these parameters in the resource path so the tool can pass them. No authentication is required. Complete all required fields, including descriptions.`;

const agentPrompt = `Use the <YOUR TOOL NAME> tool to forecast the seven-day weather forecast for a certain longitude and latitude. The user will enter a location. If no location is given, prompt the user to provide one. Look up the longitude and latitude of the location and pass them to the tool. Focus on the weather forecast for today and tomorrow, and mention the trend for the next seven days.`;

const copyText = {
  6: 'Tool Type: External REST Tool\nName: [Your initials][number] Weather Forecast\nFamily: Common\nProduct: Other',
  7: brainPrompt,
  10: 'Description: Retrieves weather forecasts from the Open-Meteo API\nInstance URL: https://api.open-meteo.com/v1\nAuthentication: None',
  11: 'Name: Get Weather Forecast\nResource Path: /forecast?latitude={latitude}&longitude={longitude}&hourly={hourly}\nDescription: Retrieve hourly weather forecast data for the next 7 days',
  12: 'Data Type: String\nRequired: On\nDescription: Latitude coordinate',
  13: 'Data Type: String\nRequired: On\nDescription: Longitude coordinate',
  14: 'Data Type: String\nRequired: On\nDescription: Hourly data type, fixed to temperature_2m',
  21: 'Agent Name: [Your initials][number] Weather Forecaster\nFamily: Common\nProduct: Other\nDescription: Weather Forecast Agent\nMaximum Interactions: 5',
  22: agentPrompt,
  27: 'Agent Team Name: [Your initials][number] Weather Forecast Agent\nFamily: Common\nProduct: Other\nDescription: Weather Forecaster',
  30: 'Name: Weather Agent\nDescription: Weather Forecast Agent\nAgent Type: Reusable\nInclude Chat History: No\nFamily: Common\nProduct: Other\nAgent: [Name of your agent]\nMessage: {{$context.$system.$inputMessage}}',
  32: 'What is the weather in the South Pole?'
};

const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);
const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

if (steps && contents) {
for (let step = 1; step <= 35; step += 1) {
  const section = document.createElement('section');
  section.className = 'lab-step';
  section.id = `step-${step}`;
  const noteHtml = notes[step - 1].split('\n\n').map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('');
  const visual = step === 29
    ? '<video class="video-demo" controls preload="metadata" poster="assets/slides/29.png"><source src="assets/video/workflow-connection-demo.mp4" type="video/mp4">Your browser does not support embedded video.</video>'
    : step === 35
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
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = copyText[button.dataset.copy];
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select text'; }
    window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
});
