"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { dashboard as celebrities } from "@/data/dashboard";
import { getSessionsForCelebrity, deleteSession } from "@/utils/chatHistory";
import Image from "next/image";
import Button from "@/components/ui/Button";

// Same function as in layout.js
const generateSessionId = () => Math.random().toString(36).substring(2, 10);

export default function HistoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [sessions, setSessions] = useState([]);

  const person = celebrities.find((c) => c.id === id) || {
    id,
    name: id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    image: null,
    description: "Public figure",
  };

  useEffect(() => {
    setSessions(getSessionsForCelebrity(id));
  }, [id]);

  // Exact same behavior as the sidebar plus button
  const handleNewChat = () => {
    if (!id) return;
    const newSessionId = generateSessionId();
    router.push(`/chat/${id}?session=${newSessionId}`);
  };

  const handleOpen = (sessionId) => {
    router.push(`/chat/${id}?session=${sessionId}`);
  };

  const handleDelete = (e, sessionId) => {
    e.stopPropagation();
    deleteSession(id, sessionId);
    setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">

      {/* Top Nav */}
      <nav
        className="shrink-0 bg-surface border-b border-border px-6 py-3 flex items-center justify-between"
        style={{ boxShadow: "var(--shadow-sm)" }}
      >
        {/* Fix 1 — removed the inner div gap, stacked tightly */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-border">
            {person.image ? (
              <Image
                width={32}
                height={32}
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">
                  {person.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Fix 1 — gap-0, tightly stacked, no extra spacing */}
          <div className="flex flex-col gap-0">
            <p className="text-sm font-semibold text-foreground">
              {person.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Conversation history
            </p>
          </div>
        </div>

        {/* Fix 2 — uses handleNewChat instead of router.push */}
        <Button
          variant="other"
          size="small"
          className="rounded-sm border-primary/30 text-primary text-xs"
          onClick={handleNewChat}
        >
          New chat
        </Button>
      </nav>

      {/* History list */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto w-full">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-sm font-medium text-foreground mb-1">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground">
                Start a chat with {person.name} and it will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
                {sessions.length} conversation{sessions.length !== 1 ? "s" : ""}
              </p>
              {sessions.map((session) => (
                <div
                  key={session.sessionId}
                  onClick={() => handleOpen(session.sessionId)}
                  className="group bg-surface border border-border rounded-sm px-5 py-4 cursor-pointer hover:border-primary/40 transition-all duration-150 flex items-start justify-between gap-4"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate mb-1">
                      {session.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {session.preview}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {formatDate(session.updatedAt)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, session.sessionId)}
                    title="Delete conversation"
                    className="opacity-0 group-hover:opacity-100 transition shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/20 cursor-pointer"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}