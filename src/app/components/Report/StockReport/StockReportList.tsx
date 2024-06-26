import BodyFont from "@/common/BodyFont";

interface Props {
  data?: {
    주식: number;
    투자지수: number;
    수익성: number;
    성장성: number;
    관심도: number;
  };
}
const defaultData = {
  주식: 10.1222,
  투자지수: 20.0,
  수익성: -30.0,
  성장성: 40.0,
  관심도: 50.0,
};
export default function StockReportList({ data }: Props) {
  data = data || defaultData;
  return (
    <div
      className={`flex flex-col w-[168px] h-[168px] justify-center rounded-2xl bg-[#F9F9F9] py-3 px-4  `}
    >
      {Object.entries(data).map(([key, value]) => (
        <div className="flex gap-3 justify-between m-1 " key={key}>
          <BodyFont level="4" weight="medium">
            {key}
          </BodyFont>
          <div
            className={`${
              value > 0 ? "text-red-600" : "text-sky-600"
            } w-[50px]`}
          >
            <BodyFont level="5" weight="medium">
              {value > 0 ? "▲" : "▼"}
              {Math.abs(value).toFixed(1)}%
            </BodyFont>
          </div>
        </div>
      ))}
    </div>
  );
}
