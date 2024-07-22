export default function StockSummarySkeleton() {
  return (
    <div className="flex flex-col justify-around w-full gap-7">
      <div>
        <div className="flex justify-between items-center">
          <div className="h-7 bg-slate-200 animate-pulse w-[55%]  rounded-md" />
          <div className="bg-grayscale-200 flex w-[80px] h-[38px] animate-pulse rounded-md" />
        </div>
        <div className="h-6 bg-slate-200 animate-pulse w-[40%]  rounded-md" />
      </div>
      <div className="h-[100px] space-y-2">
        <div className=" h-4 bg-slate-200 animate-pulse w-[85%] rounded-md" />
        <div className=" h-4 bg-slate-200 animate-pulse w-[95%] rounded-md" />
        <div className=" h-4 bg-slate-200 animate-pulse w-[90%]  rounded-md" />
        <div className=" h-4 bg-slate-200 animate-pulse w-[70%]  rounded-md" />
      </div>
    </div>
  );
}
