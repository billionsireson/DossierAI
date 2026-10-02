// Product analytics events — PRD §55. Never include document content,
// only workflow markers. Sink is pluggable (console in dev).

export type AnalyticsEvent =
  | "portfolio_creation_started"
  | "file_uploaded"
  | "file_extraction_completed"
  | "profile_review_completed"
  | "template_selected"
  | "portfolio_generated"
  | "portfolio_generation_failed"
  | "portfolio_previewed"
  | "portfolio_published"
  | "portfolio_shared"
  | "ai_action_used";

export function track(event: AnalyticsEvent, metadata?: Record<string, string | number>): void {
  // Fire-and-forget: analytics must never break the request path.
  try {
    const payload = { event, ...metadata, at: new Date().toISOString() };
    if (process.env.NODE_ENV !== "test") {
      console.log(`[analytics] ${JSON.stringify(payload)}`);
    }
    // TODO(observability): forward to provider (PostHog/Plausible) when configured.
  } catch {
    // Swallow — analytics failures are silent by design.
  }
}
