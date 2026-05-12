const PREFIX = "buddy_chat_";

// Save a session to localStorage
export const saveSession = (celebrityId, sessionId, messages, personName) => {
  if (typeof window === "undefined") return;

  const key = `${PREFIX}${celebrityId}_${sessionId}`;

  const session = {
    sessionId,
    celebrityId,
    personName,
    // Use the first user message as the title, fallback to "New conversation"
    title: messages.find((m) => m.role === "user")?.content?.slice(0, 60) || "New conversation",
    // Use the last assistant message as the preview
    preview: [...messages].reverse().find((m) => m.role === "assistant")?.content?.slice(0, 120) || "",
    messages,
    updatedAt: new Date().toISOString(),
    createdAt: (() => {
      const existing = localStorage.getItem(key);
      if (existing) return JSON.parse(existing).createdAt;
      return new Date().toISOString();
    })(),
  };

  localStorage.setItem(key, JSON.stringify(session));
};

// Get all sessions for a celebrity
export const getSessionsForCelebrity = (celebrityId) => {
  if (typeof window === "undefined") return [];

  const sessions = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.startsWith(`${PREFIX}${celebrityId}_`)) continue;

    try {
      const session = JSON.parse(localStorage.getItem(key));
      sessions.push(session);
    } catch {
      continue;
    }
  }

  // Most recent first
  return sessions.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

// Get a single session by ID
export const getSession = (celebrityId, sessionId) => {
  if (typeof window === "undefined") return null;
  const key = `${PREFIX}${celebrityId}_${sessionId}`;
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

// Delete a session
export const deleteSession = (celebrityId, sessionId) => {
  if (typeof window === "undefined") return;
  const key = `${PREFIX}${celebrityId}_${sessionId}`;
  localStorage.removeItem(key);
};