"use client";

import { useState, useEffect, useRef, use, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";

export default function ChatPage({ params }) {
  const { id: receiverPhone } = use(params);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  const socket = useSocket("chat");

  useEffect(() => {
    if (!socket) return;

    socket.emit("get-messages", { receiverPhone });
    socket.on("get-messages", (res) => setMessages(res));

    return () => {
      socket.off("get-messages");
    };
  }, [socket]);

  useEffect(() => {
    const el = bottomRef.current;
    if (el) {
      el.scrollIntoView({ behavior: messages.length > 5 ? "smooth" : "auto" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", { message, receiverPhone });
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-muted to-background px-4 py-10">
      <Card className="w-full max-w-md h-[80vh] flex flex-col rounded-3xl shadow-2xl border-none">
        <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
          {/* اسکرول محدود شده به ارتفاع مشخص */}
          <ScrollArea className="flex-1 overflow-y-auto pr-4 max-h-[calc(100%-60px)]">
            <div className="space-y-2 pb-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow-md ${
                    msg.receiver === receiverPhone
                      ? "ml-auto bg-primary text-white dark:text-black"
                      : "mr-auto bg-secondary"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* فرم ورودی پیام */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              onClick={sendMessage}
              size="icon"
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              <SendHorizonal className="h-4 w-4 dark:stroke-black" />
            </Button>
            <Input
              placeholder="پیام خود را بنویسید..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 rounded-full bg-accent"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
