// Repository owner: update only the values in this block before publishing.
const environmentSettings = {
  url: 'https://fa-erzv-dev4-saasfademo1.ds-fa.oraclepdemos.com/hcmUI/redwoodAI',
  usernames: [
    'HCM_IMPL1',
    'HCM_IMPL2',
    'HCM_IMPL3',
    'HCM_IMPL4',
    'HCM_IMPL5',
    'HCM_IMPL6',
    'HCM_IMPL7',
    'HCM_IMPL8',
    'HCM_IMPL9',
    'HCM_IMPL10'
  ]
};

const environmentLink = document.getElementById('environment-link');
const usernameList = document.getElementById('username-list');

environmentLink.href = environmentSettings.url;
environmentSettings.usernames.forEach((username) => {
  const item = document.createElement('li');
  item.textContent = username;
  usernameList.append(item);
});
