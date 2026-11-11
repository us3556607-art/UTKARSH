import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface ProfileAuditQuizProps {
  onSelectPackage: (pkgId: 'basic' | 'standard' | 'advanced') => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    score: number;
    tip: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'How specific is your Primary Business Category?',
    subtitle: 'Category is the #1 ranking factor on Google Maps for local queries.',
    options: [
      { label: 'General / Default (e.g. just "Restaurant" or "Shop")', score: 5, tip: 'Misses high-intent niche searches like "South Indian Restaurant" or "Bridal Boutique"' },
      { label: 'Somewhat specific, but no secondary categories added', score: 10, tip: 'Secondary categories allow your business to appear in related adjacent searches' },
      { label: 'Carefully tuned primary and multiple secondary categories', score: 20, tip: 'Great! Maximizes impression coverage across search queries' }
    ]
  },
  {
    id: 2,
    question: 'How many genuine photos are uploaded to your profile?',
    subtitle: 'Profiles with 10+ authentic photos receive 42% more requests for directions.',
    options: [
      { label: 'Under 3 photos or only random street shots', score: 5, tip: 'Customers hesitate to visit locations without clear facade and interior photos' },
      { label: '3 to 8 photos, but no recent updates this month', score: 12, tip: 'Google favors active profiles with fresh exterior and menu/product photography' },
      { label: '10+ high quality photos covering exterior, interior, and work', score: 20, tip: 'Strong visual presence establishes immediate customer trust' }
    ]
  },
  {
    id: 3,
    question: 'Are your business hours and special holiday timings updated?',
    subtitle: 'Incorrect timings lead to 1-star reviews from disappointed visitors.',
    options: [
      { label: 'Not sure / Only set regular hours long ago', score: 5, tip: 'During Diwali, Eid, Christmas or regional holidays, Google marks you as unconfirmed' },
      { label: 'Regular hours updated, but special holiday hours not configured', score: 12, tip: 'Special hours prevent customers from arriving to closed doors' },
      { label: 'Regular hours and special festive hours kept 100% current', score: 15, tip: 'Reliable hours provide a verified green status on Google Maps' }
    ]
  },
  {
    id: 4,
    question: 'Does your 750-character business description contain local keywords?',
    subtitle: 'Descriptions help Google understand your specific offerings and landmark.',
    options: [
      { label: 'Empty or just 1–2 short sentences', score: 5, tip: 'Wastes a 750-character opportunity to highlight landmarks and specialties' },
      { label: 'Generic text without location keywords or service lists', score: 10, tip: 'Lacks local context like neighborhood names, landmarks, or specialty tags' },
      { label: 'Detailed SEO-friendly description with localized keywords and services', score: 15, tip: 'Optimized descriptions improve relevance in local algorithm filters' }
    ]
  },
  {
    id: 5,
    question: 'Have you listed your products, services, or menu with prices?',
    subtitle: 'Shoppers click listings with transparent pricing and menu cards first.',
    options: [
      { label: 'No products or services listed', score: 5, tip: 'Customers bounce to competitors who show prices and service catalogs' },
      { label: 'A few services listed without descriptions or prices', score: 10, tip: 'Adding photos and direct inquiry buttons boosts conversion' },
      { label: 'Full organized catalog of services/products with details', score: 15, tip: 'Enables high-intent shoppers to see your menu or price list directly' }
    ]
  },
  {
    id: 6,
    question: 'Do you actively respond to customer Google reviews?',
    subtitle: 'Owner responses signal an active, trustworthy business to Google & searchers.',
    options: [
      { label: 'Rarely or never respond', score: 5, tip: 'Unanswered reviews hurt trust, especially when negative complaints linger' },
      { label: 'Only respond to 5-star reviews or reply with generic "Thanks"', score: 10, tip: 'Strategic keyword-rich review replies improve profile activity score' },
      { label: 'Professional, SEO-conscious replies to all reviews within 48h', score: 15, tip: 'Excellent review management strategy builds loyal recurring customers' }
    ]
  }
];

export const ProfileAuditQuiz: React.FC<ProfileAuditQuizProps> = ({ onSelectPackage }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, score: number) => {
    const updated = { ...answers, [questionId]: score };
    setAnswers(updated);
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  let recommendedPackage: 'basic' | 'standard' | 'advanced' = 'standard';
  let scoreVerdict = 'Moderate Profile Health';
  let advice = 'Your profile is missing crucial keywords, secondary categories, and product attributes.';

  if (totalScore < 50) {
    recommendedPackage = 'standard';
    scoreVerdict = 'Needs Immediate Attention';
    advice = 'Your profile has critical visibility gaps. Competitors with better categories, photos, and keywords are likely capturing nearby customers.';
  } else if (totalScore <= 75) {
    recommendedPackage = 'standard';
    scoreVerdict = 'Fair – Major Room for Growth';
    advice = 'Your foundation is set, but missing keyword optimization, competitor benchmarking, and product catalog enhancements.';
  } else {
    recommendedPackage = 'advanced';
    scoreVerdict = 'Good Foundation – Ready to Dominate';
    advice = 'Your basics are solid. To outpace established competitors, you need advanced keyword research, Google posts, and Q&A optimization.';
  }

  const currentQ = QUESTIONS[currentStep];

  return (
    <section id="audit-quiz" className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Self-Audit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Check Your Google Maps Profile Health Score
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Answer 6 diagnostic questions in under 60 seconds to see where your profile stands and what package fits best.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden">
          {!showResults ? (
            <div className="p-6 sm:p-10 space-y-8">
              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-500">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep) / QUESTIONS.length) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-neutral-500">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isChosen = answers[currentQ.id] === option.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, option.score)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1 active:scale-99 ${
                        isChosen
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600/30'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/70'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                        {option.label}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        ↳ {option.tip}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 disabled:opacity-40 disabled:hover:text-neutral-500"
                >
                  Previous
                </button>
                <span className="text-xs text-neutral-400">
                  Click an answer to proceed
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 space-y-6">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border border-blue-200">
                  <span className="text-3xl font-extrabold text-blue-600 tabular-nums">
                    {totalScore}
                  </span>
                  <span className="text-xs text-blue-400 font-bold">/100</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">
                    Health Score: {scoreVerdict}
                  </div>
                  <p className="text-xs text-neutral-600 max-w-lg mx-auto mt-1">
                    {advice}
                  </p>
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Recommended Package For You:
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-white px-2.5 py-0.5 rounded-full border border-blue-200">
                    {recommendedPackage === 'standard' ? 'Standard Optimization (₹599)' : 'Advanced Optimization (₹999)'}
                  </span>
                </div>

                <p className="text-xs text-neutral-700">
                  {recommendedPackage === 'standard'
                    ? 'The Standard package (₹599) fixes category gaps, adds 5 local target keywords, optimizes product/service attributes, and uploads 5 customer photos.'
                    : 'The Advanced package (₹999) delivers a full 360° overhaul including 10 keywords, competitor research, 2 Google Posts, and before/after audit report.'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onSelectPackage(recommendedPackage)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Request {recommendedPackage === 'standard' ? 'Standard (₹599)' : 'Advanced (₹999)'} Optimization</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="py-3 px-4 rounded-xl text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Self-audit algorithm based on Google Search & Maps local ranking documentation.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
