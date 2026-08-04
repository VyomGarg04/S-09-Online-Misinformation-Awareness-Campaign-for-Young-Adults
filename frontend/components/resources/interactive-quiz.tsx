"use client";

import { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Question {
  id: number;
  claim: string;
  context: string;
  correctAnswer: "VERIFIED" | "MISLEADING" | "FALSE";
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    claim: "Breaking: NASA confirms asteroid will hit Earth next Tuesday with 90% certainty.",
    context: "Viral social post screenshot citing alleged leaked internal memo.",
    correctAnswer: "FALSE",
    explanation: "NASA Near-Earth Object Studies tracks all potential impactors publicly. No 90% impact probability asteroid event exists. The headline uses false urgency for clickbait.",
  },
  {
    id: 2,
    claim: "Study shows drinking 8 glasses of water daily boosts cognitive performance.",
    context: "Health blog article linking to general hydration clinical trials.",
    correctAnswer: "VERIFIED",
    explanation: "Peer-reviewed hydration studies support that maintaining adequate fluid intake optimizes mental alertness, memory, and cognitive functioning.",
  },
  {
    id: 3,
    claim: "Leaked audio of world leader resigning proves secret government takeover.",
    context: "WhatsApp audio forward with robotic vocal glitches and background hiss.",
    correctAnswer: "MISLEADING",
    explanation: "Audio analysis identified voice-cloning synthesis artifacts. Official government channels released no resignation, confirming synthetic voice spoofing.",
  },
];

export function InteractiveQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = quizQuestions[currentIndex];

  const handleOptionSelect = (ans: "VERIFIED" | "MISLEADING" | "FALSE") => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(ans);

    if (ans === q.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Media Literacy Verification Practice Quiz
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test your claim verification skills on real-world misinformation scenarios.
          </p>
        </div>

        {!isCompleted && (
          <span className="text-xs font-mono font-semibold bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-full text-amber-800 dark:text-amber-300">
            Question {currentIndex + 1} of {quizQuestions.length}
          </span>
        )}
      </div>

      {isCompleted ? (
        <div className="p-8 text-center space-y-4">
          <Trophy className="mx-auto h-12 w-12 text-amber-500" />
          <h4 className="text-xl font-bold text-foreground">
            Quiz Completed!
          </h4>
          <p className="text-sm text-muted-foreground">
            You scored <strong className="text-amber-600 dark:text-amber-400">{score}</strong> out of {quizQuestions.length} correct ({Math.round((score / quizQuestions.length) * 100)}%).
          </p>
          <Button
            onClick={handleRestart}
            className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 text-xs"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Try Quiz Again
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Claim Box */}
          <div className="p-4 rounded-xl bg-muted/40 border space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground block">
              Context: {q.context}
            </span>
            <p className="text-base font-bold text-foreground leading-relaxed">
              &quot;{q.claim}&quot;
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-3 gap-3">
            {(["VERIFIED", "MISLEADING", "FALSE"] as const).map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === q.correctAnswer;

              let btnClass = "border-border hover:bg-muted/40";
              if (selectedAnswer) {
                if (isCorrect) {
                  btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold";
                } else if (isSelected) {
                  btnClass = "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 font-bold";
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionSelect(opt)}
                  disabled={selectedAnswer !== null}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center capitalize ${btnClass}`}
                >
                  {opt.toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {selectedAnswer && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                {selectedAnswer === q.correctAnswer ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700 dark:text-emerald-300">Correct Assessment!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span className="text-rose-700 dark:text-rose-300">Incorrect. Correct Answer: {q.correctAnswer}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {q.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleNext}
                  size="sm"
                  className="bg-amber-700 hover:bg-amber-800 text-white text-xs gap-1"
                >
                  <span>{currentIndex + 1 < quizQuestions.length ? "Next Question" : "See Final Score"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
