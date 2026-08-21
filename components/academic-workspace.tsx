'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  FolderKanban,
  Library,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  StickyNote,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const projects = [
  {
    title: 'Urban heat adaptation in coastal cities',
    type: 'Thesis',
    meta: 'Environmental policy · 18 sources',
    progress: 68,
    updated: 'Edited 2 hours ago',
  },
  {
    title: 'AI-assisted learning outcomes',
    type: 'Literature review',
    meta: 'Education research · 34 sources',
    progress: 42,
    updated: 'Edited yesterday',
  },
  {
    title: 'Public trust in health communication',
    type: 'Research paper',
    meta: 'Media studies · 11 sources',
    progress: 24,
    updated: 'Edited 4 days ago',
  },
];

const activity = [
  { icon: FileText, title: 'Chapter 2 — Literature review', detail: 'Word count · 2,480 / 4,000', status: 'In progress' },
  { icon: Library, title: '12 sources need reading notes', detail: 'Source library · Urban heat adaptation', status: 'Review' },
  { icon: ShieldCheck, title: 'Citation coverage improved to 86%', detail: 'Integrity review · AI-assisted learning', status: 'Ready' },
];

export function AcademicWorkspace() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 border-r border-border/70 px-5 py-6 lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3 px-2" aria-label="Open research workspace">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </span>
            <span className="font-serif text-xl tracking-tight">Morrow</span>
          </Link>
          <p className="mt-10 px-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
          <nav className="mt-3 flex flex-col gap-1" aria-label="Academic workspace">
            {[
              ['Overview', BookOpen, true],
              ['Projects', FolderKanban, false],
              ['Documents', FileText, false],
              ['Source library', Library, false],
              ['Research chat', Search, false],
            ].map(([label, Icon, active]) => (
              <Link
                key={label as string}
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'}`}
              >
                <Icon className="size-4" />
                {label as string}
              </Link>
            ))}
          </nav>
          <Separator className="my-6" />
          <p className="px-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Research quality</p>
          <nav className="mt-3 flex flex-col gap-1">
            <Link href="#integrity" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/70 hover:text-foreground"><ShieldCheck className="size-4" />Integrity review</Link>
            <Link href="#notes" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/70 hover:text-foreground"><StickyNote className="size-4" />Notes & claims</Link>
          </nav>
          <div className="mt-auto rounded-xl border border-border/70 bg-muted/30 p-4">
            <p className="text-sm font-medium">Your research, with provenance.</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Every draft stays connected to the sources and evidence behind it.</p>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3 lg:hidden"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><BookOpen className="size-4" /></span><span className="font-serif text-xl">Morrow</span></div>
            <div className="hidden text-sm text-muted-foreground sm:block">My research</div>
            <div className="flex items-center gap-2"><Button variant="ghost" size="sm"><Search data-icon="inline-start" />Search</Button><Button asChild size="sm"><Link href="/new"><Plus data-icon="inline-start" />New project</Link></Button></div>
          </header>

          <div className="flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div><p className="text-sm font-medium text-primary">Thursday, August 21</p><h1 className="mt-2 max-w-2xl text-balance font-serif text-4xl tracking-tight sm:text-5xl">Make progress on the work that matters.</h1><p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted-foreground">A focused home for finding evidence, shaping ideas, and writing research you can stand behind.</p></div>
                <Button asChild variant="outline"><Link href="/new">Start a research project <ArrowUpRight data-icon="inline-end" /></Link></Button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">Active projects</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">3</p><p className="mt-1 text-xs text-muted-foreground">2 need your attention</p></CardContent></Card>
                <Card><CardHeader className="pb-3"><CardTitle className="text-sm font-medium text-muted-foreground">Sources captured</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">63</p><p className="mt-1 text-xs text-muted-foreground">8 added this week</p></CardContent></Card>
                <Card id="integrity"><CardHeader className="pb-3"><CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><ShieldCheck className="size-4" />Research quality</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">86%</p><p className="mt-1 text-xs text-muted-foreground">Average citation coverage</p></CardContent></Card>
              </div>

              <div className="mt-12 grid gap-10 xl:grid-cols-[1.35fr_0.65fr]">
                <div><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl">Your projects</h2><p className="mt-1 text-sm text-muted-foreground">Continue where you left off.</p></div><Button variant="ghost" size="sm">View all <ChevronRight data-icon="inline-end" /></Button></div><div className="mt-5 flex flex-col gap-3">{projects.map((project) => <Card key={project.title} className="transition-colors hover:bg-muted/30"><CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-medium">{project.title}</h3><Badge variant="secondary">{project.type}</Badge></div><p className="mt-2 text-sm text-muted-foreground">{project.meta}</p><p className="mt-4 text-xs text-muted-foreground">{project.updated}</p></div><div className="w-full shrink-0 sm:w-40"><div className="mb-2 flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span className="font-medium">{project.progress}%</span></div><Progress value={project.progress} /></div></CardContent></Card>)}</div></div>
                <div id="notes"><div><h2 className="font-serif text-2xl">Research pulse</h2><p className="mt-1 text-sm text-muted-foreground">Small next steps, clearly surfaced.</p></div><Card className="mt-5"><CardContent className="flex flex-col gap-5 p-5">{activity.map(({ icon: Icon, title, detail, status }) => <div key={title} className="flex gap-3"><span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"><Icon className="size-4 text-muted-foreground" /></span><div className="min-w-0"><div className="flex items-start justify-between gap-3"><p className="text-sm font-medium leading-5">{title}</p><Badge variant="outline" className="shrink-0 text-[10px]">{status}</Badge></div><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></div></div>)}<Separator /><div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="size-4 text-primary" />No unresolved citation warnings</div></CardContent></Card><Card className="mt-4 bg-primary text-primary-foreground"><CardContent className="p-5"><div className="flex items-center gap-2"><Sparkles className="size-4" /><p className="text-sm font-medium">Need a starting point?</p></div><p className="mt-2 text-sm leading-6 text-primary-foreground/75">Turn a research question into a structured plan with sources, sections, and milestones.</p><Button asChild variant="secondary" size="sm" className="mt-4"><Link href="/new">Build a plan</Link></Button></CardContent></Card></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AcademicWorkspace;
