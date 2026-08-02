interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
}

export function WorkflowStep({
  number,
  title,
  description,
}: WorkflowStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">
          {title}
        </h3>

        <p className="leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}