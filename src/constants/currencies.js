/** Mock mid-market rates: units of currency per 1 USD. `region` is shown instead of flags. */
export const currencies = [
  { code: "USD", name: "US Dollar", region: "United States", rate: 1 },
  { code: "EUR", name: "Euro", region: "Euro area", rate: 0.92 },
  { code: "GBP", name: "British Pound", region: "United Kingdom", rate: 0.79 },
  { code: "PLN", name: "Polish Zloty", region: "Poland", rate: 3.98 },
  { code: "CHF", name: "Swiss Franc", region: "Switzerland", rate: 0.88 },
  { code: "SEK", name: "Swedish Krona", region: "Sweden", rate: 10.62 },
  { code: "CAD", name: "Canadian Dollar", region: "Canada", rate: 1.37 },
  { code: "JPY", name: "Japanese Yen", region: "Japan", rate: 151.4 },
];

export const getRate = (code) => currencies.find((c) => c.code === code)?.rate ?? 1;
