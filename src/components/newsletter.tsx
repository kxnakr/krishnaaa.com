"use client";

import { addToNewsletter } from "@/lib/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const SubscribeButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-32" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : "Subscribe"}
    </Button>
  );
};

const Newsletter = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section className="space-y-8">
      <header className="font-bold">
        <span>newsletter</span>
      </header>
      <form
        ref={formRef}
        action={async (formData) => {
          try {
            const res = await addToNewsletter(formData);
            if (res.error) toast.error(res.error);
            if (res.success) {
              toast.success(res.success);
              formRef.current!.reset();
            }
          } catch (err) {
            if (err instanceof Error) toast.error(err.message);
          }
        }}
        className="flex flex-col sm:flex-row w-full items-center gap-4"
      >
        <Input type="email" name="email" required placeholder="Email" />
        <SubscribeButton />
      </form>
    </section>
  );
};

export default Newsletter;
