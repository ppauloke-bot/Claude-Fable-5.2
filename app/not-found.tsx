import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Error 404
      </p>
      <h1 className="font-display text-display-lg font-medium">
        This page wandered off.
      </h1>
      <p className="max-w-md text-balance text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist — but the work that
        does is one click away.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-foreground shadow-glow transition-transform duration-300 hover:scale-[1.04]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
