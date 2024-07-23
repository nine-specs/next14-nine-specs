export const getDate = (timestamp: number) => {
  return new Date(Number(timestamp));
};

export const getFormattedDate = (timestamp: number) => {
  const date = getDate(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const getTimeAgo = (timestamp: number) => {
  const date = getDate(timestamp);

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units: { [key: string]: number } = {
    년: 3600 * 24 * 365,
    개월: 3600 * 24 * 30,
    일: 3600 * 24,
    시간: 3600,
    분: 60,
  };

  for (const unit in units) {
    const value = Math.floor(diffInSeconds / units[unit]);
    if (value >= 1) {
      return `${value}${unit} 전`;
    }
  }

  return "방금 전";
};
