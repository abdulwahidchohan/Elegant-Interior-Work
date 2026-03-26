"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Send } from "lucide-react";
import { useChat } from "ai/react";
import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ?? "15551234567";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"ai" | "whatsapp">("ai");
  const pathname = usePathname();
  const [pageContext, setPageContext] = useState("");

  useEffect(() => {
    const pathMap: Record<string, string> = {
      "/": "the homepage",
      "/portfolio": "the portfolio page",
    };
    if (pathname.startsWith("/portfolio/")) {
      const slug = pathname.split("/portfolio/")[1];
      const formatted = slug.replace(/-/g, " ");
      setPageContext(`the ${formatted} project`);
    } else {
      setPageContext(pathMap[pathname] ?? "the website");
    }
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'm interested in interior design services. I'm currently viewing ${pageContext} on your website.`
  )}`;

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 md:w-96 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeTab === "ai"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  AI Concierge
                </button>
                <button
                  onClick={() => setActiveTab("whatsapp")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeTab === "whatsapp"
                      ? "bg-[#25D366] text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  WhatsApp
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {activeTab === "ai" ? (
              <div className="flex flex-col h-80">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      <Bot className="h-8 w-8 mx-auto mb-3 text-primary" />
                      <p className="font-medium">AI Design Concierge</p>
                      <p className="text-xs mt-1">
                        Ask me about materials, costs, or design ideas!
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-secondary text-foreground rounded-tl-sm"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-secondary px-3 py-2 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                delay,
                              }}
                              className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="p-3 border-t border-border flex gap-2"
                >
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about design, costs..."
                    className="flex-1 px-3 py-2 text-sm bg-secondary rounded-xl border border-border focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 bg-primary text-primary-foreground rounded-xl disabled:opacity-50 transition-opacity"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                  <WhatsAppIcon />
                </div>
                <h3 className="font-semibold mb-2">Chat on WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Connect instantly with our design team via WhatsApp.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#22c55e] transition-colors"
                >
                  <WhatsAppIcon />
                  Open WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:bg-[#22c55e] transition-colors"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </motion.a>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          aria-label="AI Concierge"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </motion.button>
      </div>
    </div>
  );
}
