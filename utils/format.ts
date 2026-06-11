/** Locale-aware number formatting for stats and counters. */
export function formatNumber(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}

/** Compact notation (1.2k, 3.4M) for large social-proof figures. */
export function formatCompact(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
