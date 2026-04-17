// Analytics tracking utility for user behavior and engagement metrics
// This tracks key interactions to understand user engagement and conversion funnels

export type EventType = 
  | 'page_view'
  | 'workflow_viewed'
  | 'workflow_compared'
  | 'lead_magnet_opened'
  | 'lead_magnet_submitted'
  | 'contact_form_submitted'
  | 'cta_clicked'
  | 'search_performed'
  | 'filter_applied'

interface AnalyticsEvent {
  type: EventType
  timestamp: number
  userAgent: string
  url: string
  metadata?: Record<string, any>
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private sessionId: string = ''

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeTracking()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeTracking(): void {
    // Track page views
    if (typeof window !== 'undefined') {
      // Page view on load
      this.trackEvent('page_view', { page: window.location.pathname })
    }
  }

  public trackEvent(type: EventType, metadata?: Record<string, any>): void {
    if (typeof window === 'undefined') return

    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      metadata,
    }

    this.events.push(event)
    this.sendAnalytics(event)
  }

  private sendAnalytics(event: AnalyticsEvent): void {
    // Send to analytics endpoint (you can configure this with your preferred service)
    // Examples: Vercel Analytics, Segment, Mixpanel, etc.
    
    // For now, we'll log to console in development and store locally
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event)
    }

    // Store in localStorage for later retrieval
    try {
      const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]')
      storedEvents.push(event)
      // Keep only last 100 events
      if (storedEvents.length > 100) {
        storedEvents.shift()
      }
      localStorage.setItem('analytics_events', JSON.stringify(storedEvents))
    } catch (error) {
      console.error('Failed to store analytics event:', error)
    }
  }

  public getEvents(): AnalyticsEvent[] {
    return this.events
  }

  public getSessionId(): string {
    return this.sessionId
  }

  // Specific tracking methods for common events
  public trackWorkflowView(workflowId: string, workflowName: string): void {
    this.trackEvent('workflow_viewed', { workflowId, workflowName })
  }

  public trackWorkflowComparison(workflowIds: string[]): void {
    this.trackEvent('workflow_compared', { workflowIds, count: workflowIds.length })
  }

  public trackLeadMagnetOpen(): void {
    this.trackEvent('lead_magnet_opened')
  }

  public trackLeadMagnetSubmit(email: string): void {
    this.trackEvent('lead_magnet_submitted', { email: this.hashEmail(email) })
  }

  public trackContactFormSubmit(): void {
    this.trackEvent('contact_form_submitted')
  }

  public trackCtaClick(buttonText: string, section: string): void {
    this.trackEvent('cta_clicked', { buttonText, section })
  }

  public trackSearch(query: string, resultsCount: number): void {
    this.trackEvent('search_performed', { query, resultsCount })
  }

  public trackFilter(filterType: string, filterValue: string): void {
    this.trackEvent('filter_applied', { filterType, filterValue })
  }

  private hashEmail(email: string): string {
    // Simple hash for privacy - don't store raw email in analytics
    let hash = 0
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return `email_${Math.abs(hash)}`
  }
}

// Export singleton instance
export const analytics = new Analytics()

// Export hook for React components
export function useAnalytics() {
  return analytics
}
