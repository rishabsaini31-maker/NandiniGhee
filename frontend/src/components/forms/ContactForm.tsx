"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SUBJECTS = ["Order Support", "Product Question", "Gifting & Corporate", "Feedback", "Partnership", "Other"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message.trim()) {
      toast({ title: "Please complete the required fields", variant: "destructive" });
      return;
    }
    setSent(true);
    toast({ title: "Message sent!", description: "We'll get back to you within one working day." });
  };

  if (sent) {
    return (
      <div className="h-full min-h-[420px] rounded-lg border border-border bg-card flex flex-col items-center justify-center text-center p-10">
        <span className="w-16 h-16 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center">
          <Send size={22} className="text-forest-700" />
        </span>
        <h2 className="font-display text-2xl font-semibold text-forest-900 mt-6">Message received.</h2>
        <p className="text-[13.5px] text-cocoa-500 mt-3 max-w-sm leading-relaxed">
          Thank you, {form.name.split(" ")[0]}. A member of our team will write back to{" "}
          <span className="font-medium text-forest-800">{form.email}</span> within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-border bg-card p-6 md:p-8" aria-label="Contact form">
      <h2 className="font-display text-2xl font-semibold text-forest-900">Send a Message</h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">
            Name *
          </label>
          <input id="cf-name" value={form.name} onChange={set("name")} className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400" placeholder="Your full name" required />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">
            Email *
          </label>
          <input id="cf-email" type="email" value={form.email} onChange={set("email")} className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">
            Phone
          </label>
          <input id="cf-phone" type="tel" value={form.phone} onChange={set("phone")} className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400" placeholder="+91 (optional)" />
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">
            Subject
          </label>
          <select id="cf-subject" value={form.subject} onChange={set("subject")} className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400 bg-card">
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">
            Message *
          </label>
          <textarea id="cf-message" value={form.message} onChange={set("message")} rows={6} className="w-full px-4 py-3.5 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400 resize-y" placeholder="How can we help?" required />
        </div>
      </div>
      <button
        type="submit"
        className="mt-7 w-full sm:w-auto h-12 px-10 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[12px] font-bold tracking-[0.16em] uppercase inline-flex items-center justify-center gap-2.5 transition-all hover:shadow-lg"
      >
        Send Message <Send size={14} />
      </button>
    </form>
  );
}
