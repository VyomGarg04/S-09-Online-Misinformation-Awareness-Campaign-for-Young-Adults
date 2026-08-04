"use client";

import { useState } from "react";
import { SourceCard, MediaSource } from "@/components/sources/source-card";
import { SourceFilters } from "@/components/sources/source-filters";
import { ShieldCheck, HelpCircle } from "lucide-react";

const mockSources: MediaSource[] = [
  {
    id: "reuters",
    name: "Reuters",
    domain: "reuters.com",
    country: "Global / UK",
    factualRating: "VERY_HIGH",
    biasRating: "CENTER",
    ownership: "Thomson Reuters Corporation",
    credibilityScore: 98,
    description: "International news agency adhering to strict trust principles of independence, integrity, and freedom from bias.",
  },
  {
    id: "ap",
    name: "Associated Press",
    domain: "apnews.com",
    country: "United States",
    factualRating: "VERY_HIGH",
    biasRating: "CENTER",
    ownership: "Not-for-profit News Cooperative",
    credibilityScore: 97,
    description: "Independent global news organization dedicated to fast, accurate, unbiased journalism.",
  },
  {
    id: "bbc",
    name: "BBC News",
    domain: "bbc.com",
    country: "United Kingdom",
    factualRating: "HIGH",
    biasRating: "CENTER_LEFT",
    ownership: "British Public Broadcasting Corporation",
    credibilityScore: 92,
    description: "Public service broadcaster delivering global reporting with high editorial standards and cross-checking.",
  },
  {
    id: "wsj",
    name: "Wall Street Journal",
    domain: "wsj.com",
    country: "United States",
    factualRating: "HIGH",
    biasRating: "CENTER_RIGHT",
    ownership: "News Corp / Dow Jones",
    credibilityScore: 91,
    description: "Leading financial and political news outlet known for rigorous news gathering, with center-right editorial stance.",
  },
  {
    id: "npr",
    name: "NPR (National Public Radio)",
    domain: "npr.org",
    country: "United States",
    factualRating: "HIGH",
    biasRating: "CENTER_LEFT",
    ownership: "Non-profit Media Organization",
    credibilityScore: 90,
    description: "Public radio network providing factual news reporting with mild center-left analytical framing.",
  },
  {
    id: "cnn",
    name: "CNN",
    domain: "cnn.com",
    country: "United States",
    factualRating: "MIXED",
    biasRating: "LEFT",
    ownership: "Warner Bros. Discovery",
    credibilityScore: 78,
    description: "24-hour news network with factual reporting alongside sensationalist commentary and left-leaning panel framing.",
  },
  {
    id: "foxnews",
    name: "Fox News Channel",
    domain: "foxnews.com",
    country: "United States",
    factualRating: "MIXED",
    biasRating: "RIGHT",
    ownership: "Fox Corporation",
    credibilityScore: 72,
    description: "Major cable news network providing factual news reporting mixed with strongly right-leaning opinion programming.",
  },
];

export default function SourcesPage() {
  const [search, setSearch] = useState("");
  const [factual, setFactual] = useState("ALL");
  const [bias, setBias] = useState("ALL");

  const filteredSources = mockSources.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.domain.toLowerCase().includes(search.toLowerCase());

    const matchesFactual =
      factual === "ALL" ||
      (factual === "HIGH" && (s.factualRating === "HIGH" || s.factualRating === "VERY_HIGH")) ||
      (factual === "MIXED" && s.factualRating === "MIXED") ||
      (factual === "LOW" && s.factualRating === "LOW");

    const matchesBias = bias === "ALL" || s.biasRating === bias;

    return matchesSearch && matchesFactual && matchesBias;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Source Integrity & Bias Index
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore news domain reliability ratings, factual accuracy records, and political bias spectrum metrics.
        </p>
      </div>

      {/* Filters Bar */}
      <SourceFilters
        search={search}
        onSearchChange={setSearch}
        factual={factual}
        onFactualChange={setFactual}
        bias={bias}
        onBiasChange={setBias}
        onReset={() => {
          setSearch("");
          setFactual("ALL");
          setBias("ALL");
        }}
      />

      {/* Outlets Grid */}
      {filteredSources.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 p-6 text-center">
          <HelpCircle className="h-10 w-10 text-muted-foreground/60 mb-2" />
          <h3 className="text-lg font-semibold text-foreground">No media outlets found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mt-1">
            No media sources match your filter criteria. Try resetting filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}
