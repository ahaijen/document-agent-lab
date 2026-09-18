// Repository owner: update only the values in this block before publishing.
const environmentSettings = {
  url: 'https://your-environment.example.oraclecloud.com',
  usernames: [
    'USERNAME_1',
    'USERNAME_2'
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
