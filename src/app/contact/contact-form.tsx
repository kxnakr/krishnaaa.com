"use client";

import { useRef } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendEmailToMe } from "@/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Submit"}
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
            formRef.current!.reset();
          }
        } catch (err) {
          if (err instanceof Error) toast.error(err.message);
        }
      }}
      className="space-y-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="name" id="name" required placeholder="Name" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          id="email"
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
          required
          placeholder="Enter your message here..."
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default ContactForm;
