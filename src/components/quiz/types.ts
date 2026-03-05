export interface QuizStep {
  question: string;
  options: string[];
}

export interface QuizConfig {
  /** Title shown in the modal header */
  title: string;
  /** Subtitle / description */
  subtitle?: string;
  /** The quiz steps/questions */
  steps: QuizStep[];
  /** Business context sent to AI for personalized recommendations */
  businessContext: string;
  /** WhatsApp number (with country code, no +) */
  whatsappNumber: string;
  /** CTA label for the teaser button */
  teaserCta?: string;
  /** Teaser heading */
  teaserHeading?: string;
  /** Teaser subheading */
  teaserSubheading?: string;
}

export interface QuizResult {
  category: string;
  justification: string;
  suggestions: string[];
  whatsappMessage: string;
}
