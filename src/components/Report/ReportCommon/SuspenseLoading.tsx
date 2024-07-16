import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
}

export default function StockSuspenseLoading({
  width = 36,
  height = 36,
}: Props) {
  return (
    <div className=" ">
      <Image
        src="/images/loading/loadingSpiner.gif"
        alt="loading"
        unoptimized
        width={width}
        height={height}
      />
    </div>
  );
}
