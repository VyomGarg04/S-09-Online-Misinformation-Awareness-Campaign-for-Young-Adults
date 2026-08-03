import { Logo } from "@/components/branding";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">

      <div className="mb-8 flex flex-col items-center text-center">

        <Logo className="mb-6" />

        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>

      </div>

      {children}

    </div>
  );
}