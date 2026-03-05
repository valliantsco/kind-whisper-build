export interface QuizStep {
  question: string;
  options: string[];
  /** Allow multiple selections (e.g., priorities) */
  multiSelect?: boolean;
  /** Max selections when multiSelect is true */
  maxSelections?: number;
  /** Helper text shown below the question */
  helperText?: string;
  /** Step ID for conditional logic */
  id?: string;
  /** Skip to result with this value if a specific option is chosen */
  skipToResultIf?: {
    optionIndex: number;
    result: QuizResult;
  };
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

export interface RecommendedModel {
  name: string;
  headline: string;
  specs?: string;
  whyFits?: string;
}

export interface QuizResult {
  category: string;
  justification: string;
  suggestions: string[];
  models: RecommendedModel[];
  whatsappMessage: string;
}
