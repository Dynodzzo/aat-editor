/**
 * Formats a duration in seconds to a string in the format "HH:MM:SS.SSS"
 * @param duration The duration in seconds (e.g. 123.456)
 * @returns The formatted duration string (e.g. "00:02:03.456")
 */
export const formatDurationToISOTime = (duration: number): string => {
  if (!duration) return "00:00:00.000";
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);
  const milliseconds = Math.floor((duration % 1) * 1000);

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");
  const millisecondsStr = String(milliseconds).padStart(3, "0");

  return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`;
};

/**
 * Formats a time string in the format "HH:MM:SS.SSS" to a duration in seconds
 * @param isoTime The time string (e.g. "00:02:03.456")
 * @returns The duration in seconds (e.g. 123.456)
 */
export const formatISOTimeToDuration = (isoTime: string): number => {
  const [hours, minutes, seconds] = isoTime.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};
