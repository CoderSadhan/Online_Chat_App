const chats = {
  john: [
    { from: 'bot', text: "Hey, how's it going?", status: "Delivered" },
    { from: 'user', text: "All good! You?", status: "Sent" }
  ],
  jane: [
    { from: 'bot', text: "Did you finish the report?", status: "Delivered" },
    { from: 'user', text: "Almost done, will send soon.", status: "Sent" }
  ],
  alex: [
    { from: 'bot', text: "Let's catch up over coffee!", status: "Delivered" },
    { from: 'user', text: "Sure, let me know when!", status: "Sent" }
  ],
  linda: [
    { from: 'bot', text: "Can you review my code?", status: "Delivered" },
    { from: 'user', text: "Send me the link!", status: "Sent" }
  ],
  emma: [
    { from: 'bot', text: "I've sent you the latest project files.", status: "Delivered" },
    { from: 'user', text: "Thanks, I'll check them.", status: "Sent" }
  ],
  michael: [
    { from: 'bot', text: "Are we still meeting at 3?", status: "Delivered" },
    { from: 'user', text: "Yes, see you there!", status: "Sent" }
  ],
  sophia: [
    { from: 'bot', text: "The design team loved your presentation!", status: "Delivered" },
    { from: 'user', text: "That's great to hear!", status: "Sent" }
  ],
};

const botReplies = [
  "Got it! 😊",
  "I'll get back to you soon.",
  "Thanks for the update! 👍",
  "Let me check on that.",
  "Okay! 😃",
  "Noted.",
  "Sounds good! 🚀"
];

const profiles = {
  john: { name: "John Doe", about: "Front-end Developer", email: "john@example.com" },
  jane: { name: "Jane Smith", about: "Project Manager", email: "jane@example.com" },
  alex: { name: "Alex Johnson", about: "UI/UX Designer", email: "alex@example.com" },
  linda: { name: "Linda Brown", about: "Full Stack Dev", email: "linda@example.com" },
  emma: { name: "Emma Thompson", about: "QA Engineer", email: "emma@example.com" },
  michael: { name: "Michael Thompson", about: "DevOps Engineer", email: "michael@example.com" },
  sophia: { name: "Sophia Thompson", about: "Product Owner", email: "sophia@example.com" }
};

const activeMembers = [
  { name: "Emma Thompson", id: "emma" },
  { name: "Michael Thompson", id: "michael" },
  { name: "Sophia Thompson", id: "sophia" },
  { name: "Liam Johnson", id: "liam" },
  { name: "Olivia Brown", id: "olivia" },
  { name: "Noah Davis", id: "noah" },
  { name: "Ava Martinez", id: "ava" },
  { name: "William Garcia", id: "william" },
  { name: "Isabella Anderson", id: "isabella" }
];


let currentChat = 'emma'; 
const chatArea = document.getElementById('chat-area');
const messageInput = document.getElementById('messageInput');
const chatName = document.getElementById('chat-name');
const chatAvatar = document.getElementById('chat-avatar');
const sidebar = document.getElementById('sidebar');
const darkModeToggle = document.getElementById('darkModeToggle');
const emojiBtn = document.getElementById('emojiBtn');
const emojiPicker = document.getElementById('emojiPicker');
const imageBtn = document.getElementById('imageBtn');
const imageInput = document.getElementById('imageInput');
const rightPanel = document.getElementById('rightPanel');
const activeMembersList = document.getElementById('activeMembers');
const profileDetails = document.getElementById('profileDetails');

function renderActiveMembers() {
  activeMembersList.innerHTML = '';
  activeMembers.forEach(member => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="active-dot"></span><span>${member.name}</span>`;
    activeMembersList.appendChild(li);
  });
}

function renderProfile(name) {
  const p = profiles[name];
  if (!p) { profileDetails.innerHTML = ""; return; }
  profileDetails.innerHTML = `
    <div class="profile-avatar">${p.name[0]}</div>
    <div class="profile-name">${p.name}</div>
    <div class="profile-about">${p.about}</div>
    <div class="profile-email">${p.email}</div>
  `;
}

function renderChat() {
  chatArea.innerHTML = '';
  chats[currentChat].forEach((msg, idx) => {
    const div = document.createElement('div');
    div.className = `chat-bubble ${msg.from === 'user' ? 'user-bubble' : 'bot-bubble'}`;
    if (msg.image) {
      const img = document.createElement('img');
      img.src = msg.image;
      img.alt = "sent";
      img.style.maxWidth = "180px";
      img.style.borderRadius = "10px";
      img.style.display = "block";
      img.style.marginBottom = "0.5em";
      div.appendChild(img);
    }
    div.appendChild(document.createTextNode(msg.text));
    const status = document.createElement('span');
    status.className = 'status';
    status.textContent = msg.status || (msg.from === 'user' ? 'Sent' : 'Delivered');
    div.appendChild(status);
    chatArea.appendChild(div);
  });
  chatArea.scrollTop = chatArea.scrollHeight;
}

function switchChat(name) {
  currentChat = name;
  renderChatList();
  if (chatName) chatName.textContent = profiles[name]?.name || '';
  if (chatAvatar) {
    chatAvatar.textContent = name.charAt(0).toUpperCase();
    chatAvatar.className = 'avatar ' + getAvatarColorClass(profiles[name]?.name || name);
  }
  renderChat();
  renderProfile(name);
}

function sendMessage(imageData) {
  const text = messageInput.value.trim();
  if (!text && !imageData) return;
  chats[currentChat].push({ from: 'user', text, image: imageData, status: "Sent" });
  messageInput.value = '';
  renderChat();
  showTypingAnimation();
  setTimeout(() => {
    const lastUserMsg = chats[currentChat].slice().reverse().find(m => m.from === 'user' && m.status === 'Sent');
    if (lastUserMsg) lastUserMsg.status = "Delivered";
    renderChat();
    setTimeout(() => {
      chats[currentChat].push({ from: 'bot', text: botReplies[Math.floor(Math.random()*botReplies.length)], status: "Delivered" });
      renderChat();
    }, 900 + Math.random()*700);
  }, 800);
}

function showTypingAnimation() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-bubble bot-bubble';
  typingDiv.innerHTML = `<span class="typing">
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  </span>`;
  chatArea.appendChild(typingDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

messageInput.addEventListener('input', function () {
  this.rows = Math.min(5, this.value.split('\n').length);
});
messageInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Dark mode
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// Emoji picker
const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😍","😘","😜","😎","🤩","👍","🙏","👏","💯","🎉","🚀"];
emojiBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  emojiPicker.style.display = emojiPicker.style.display === 'block' ? 'none' : 'block';
  emojiPicker.innerHTML = '';
  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = emoji;
    btn.style.fontSize = '1.3em';
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      messageInput.value += emoji;
      emojiPicker.style.display = 'none';
      messageInput.focus();
    });
    emojiPicker.appendChild(btn);
  });
});
document.addEventListener('click', () => emojiPicker.style.display = 'none');

// Image upload
imageBtn.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      sendMessage(e.target.result);
    };
    reader.readAsDataURL(this.files[0]);
  }
});

document.getElementById('menuBtn').addEventListener('click', e => {
  e.preventDefault();
});

window.switchChat = switchChat;
window.sendMessage = sendMessage;

renderActiveMembers();
renderChat();
renderProfile(currentChat);

const avatarColors = [
  "avatar-color-0", "avatar-color-1", "avatar-color-2", "avatar-color-3",
  "avatar-color-4", "avatar-color-5", "avatar-color-6", "avatar-color-7",
  "avatar-color-8", "avatar-color-9"
];


function getAvatarColorClass(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const idx = Math.abs(hash) % avatarColors.length;
  return avatarColors[idx];
}

function renderChatList() {
  const chatList = document.querySelector('.chat-list');
  chatList.innerHTML = '';
  Object.keys(profiles).forEach((key, idx) => {
    const p = profiles[key];
    const li = document.createElement('li');
    li.id = 'chat-' + key;
    li.onclick = () => switchChat(key);
    if (key === currentChat) li.classList.add('active');
    const avatarClass = getAvatarColorClass(p.name);
    li.innerHTML = `
      <div class="avatar ${avatarClass}">${p.name[0]}</div>
      <div class="info">
        <span class="name">${p.name}</span>
        <span class="preview">${chats[key]?.[0]?.text || ''}</span>
      </div>
    `;
    chatList.appendChild(li);
  });
}
renderChatList();

const sidebar1 = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');


sidebarToggle.addEventListener('click', () => {
  sidebar1.classList.add('open');
  sidebarBackdrop.style.display = 'block';
});


sidebarBackdrop.addEventListener('click', () => {
  sidebar1.classList.remove('open');
  sidebarBackdrop.style.display = 'none';
});


document.querySelector('.chat-list').addEventListener('click', function (e) {
  const li = e.target.closest('li');
  if (!li) return;
  if (window.innerWidth <= 700) {
    sidebar1.classList.remove('open');
    sidebarBackdrop.style.display = 'none';
  }
});




