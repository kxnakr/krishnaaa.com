"use client";

import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmailToMe } from "@/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
          Sending…
        </>
      ) : (
        "Send message"
      )}
    </Button>
  );
};

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        try {
          const res = await sendEmailToMe(formData);
          if (res.error) toast.error(res.error);
          if (res.success) {
            toast.success(res.success);
            formRef.current?.reset();
          }
        } catch (err) {
          if (err instanceof Error) toast.error(err.message);
        }
      }}
      className="space-y-6"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          type="text"
          id="name"
          autoComplete="name"
          maxLength={100}
          required
          placeholder="Name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="Email"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          name="message"
          id="message"
          rows={5}
          maxLength={5000}
          required
          placeholder="Enter your message here..."
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default ContactForm;
