type Props = { title: string; description?: string };

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1>{title}</h1>
      {description && <p className="mt-2 text-[1.1rem]">{description}</p>}
    </div>
  );
}
