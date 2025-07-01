import { HOUR } from '@convex-dev/rate-limiter';

// Rate limit values - Single source of truth
export const RATE_LIMITS = {
  ANONYMOUS_DAILY: 5,
  AUTHENTICATED_DAILY: 50,
  STANDARD_MONTHLY: 1500,
  MONTHLY_PERIOD_DAYS: 30,
} as const;

// Time periods
const DAY = 24 * HOUR;

// Calculated periods
export const PERIODS = {
  DAILY: DAY,
  MONTHLY: RATE_LIMITS.MONTHLY_PERIOD_DAYS * DAY,
} as const;
