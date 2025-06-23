document.getElementById("saveBtn").addEventListener("click", () => {
  const chat = document.getElementById("chatInput").value;
  const title = document.getElementById("titleInput").value || "Untitled";

  if (!chat) return alert("Paste some chat first!");

  chrome.storage.local.get(["chats"], (result) => {
    const chats = result.chats || [];
    chats.push({ title, chat });
    chrome.storage.local.set({ chats }, () => {
      document.getElementById("chatInput").value = "";
      document.getElementById("titleInput").value = "";
      loadChats();
    });
  });
});

function loadChats() {
  const container = document.getElementById("savedChats");
  container.innerHTML = "";
  chrome.storage.local.get(["chats"], (result) => {
    const chats = result.chats || [];
    chats.forEach(({ title, chat }, index) => {
      const div = document.createElement("div");
      div.className = "chat-entry";
      div.textContent = title;
      div.addEventListener("click", () => {
        navigator.clipboard.writeText(chat);
        alert("Copied to clipboard! Paste it in new ChatGPT.");
      });
      container.appendChild(div);
    });
  });
}
loadChats();
