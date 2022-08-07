import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function initSentry() {
  if (process.env.NODE_ENV !== "production") return
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

export default initSentry
