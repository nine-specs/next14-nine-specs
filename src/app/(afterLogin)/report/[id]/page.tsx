import Report from "@/app/components/Report/Report";

interface Props {
  params: {
    id: string;
  };
}
export default function page({ params }: Props) {
  const { id } = params;

  const data = id;
  const;
  return (
    <div>
      <Report data={data} />
    </div>
  );
}
