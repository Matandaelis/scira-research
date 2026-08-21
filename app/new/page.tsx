'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Library, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const starters = [
  { title: 'Thesis or dissertation', description: 'Set up chapters, milestones, research question, and citation preferences.', icon: BookOpen },
  { title: 'Literature review', description: 'Organize a body of research, identify themes, and map gaps in the evidence.', icon: Library },
  { title: 'Research paper', description: 'Move from question to outline, sources, argument, and a polished academic draft.', icon: FileText },
  { title: 'Research question', description: 'Explore a question with source-backed research before choosing a document format.', icon: Search },
];

export default function NewPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" size="sm"><Link href="/"><ArrowLeft data-icon="inline-start" />Back to workspace</Link></Button>
        <div className="mt-12 max-w-2xl"><p className="text-sm font-medium text-primary">New research</p><h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">What are you working on?</h1><p className="mt-4 text-base leading-7 text-muted-foreground">Start with a clear academic outcome. You can add sources, notes, documents, and collaborators as your research develops.</p></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">{starters.map(({ title, description, icon: Icon }) => <Card key={title} className="group cursor-pointer transition-colors hover:bg-muted/40"><CardHeader><div className="flex size-10 items-center justify-center rounded-lg bg-muted"><Icon className="size-5 text-primary" /></div><CardTitle className="mt-4">{title}</CardTitle><CardDescription className="leading-6">{description}</CardDescription></CardHeader><CardContent><Button variant="ghost" size="sm" className="px-0 group-hover:text-primary">Choose this path <Sparkles data-icon="inline-end" /></Button></CardContent></Card>)}</div>
        <p className="mt-10 text-center text-sm text-muted-foreground">You can also start from a blank academic paper.</p>
      </div>
    </main>
  );
}
