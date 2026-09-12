import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mt-4 text-[var(--text-muted)]">
        That URL does not match any content here.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-[var(--crawl-blue)] hover:text-[var(--star-yellow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--star-yellow)]"
        >
          Back to home
        </Link>
      </p>
    </Container>
  );
}
