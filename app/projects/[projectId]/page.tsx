import { notFound } from 'next/navigation';
import { getAcademicProject } from '@/app/actions/academic';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default async function AcademicProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { project, documents, sources, citations } = await getAcademicProject((await params).projectId);
    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-10">
          <header className="flex flex-col gap-4 border-b pb-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Research project</p>
                <h1 className="max-w-3xl text-balance font-serif text-4xl font-semibold tracking-tight">{project.title}</h1>
              </div>
              <Badge variant="secondary">{project.stage}</Badge>
            </div>
            <p className="max-w-2xl leading-6 text-muted-foreground">A provenance-first workspace for organizing evidence, drafting arguments, and keeping every claim traceable to a source.</p>
          </header>
          <section className="grid gap-4 md:grid-cols-3">
            <Card><CardHeader><CardTitle>Documents</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{documents.length}</p><p className="text-sm text-muted-foreground">Drafts and working notes</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Sources</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{sources.length}</p><p className="text-sm text-muted-foreground">Evidence in this project</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Citations</CardTitle></CardHeader><CardContent><p className="text-3xl font-semibold">{citations.length}</p><p className="text-sm text-muted-foreground">Traceable references</p></CardContent></Card>
          </section>
          <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <Card><CardHeader><CardTitle>Working documents</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{documents.map((document) => <div className="flex items-center justify-between border-b py-3 last:border-0" key={document.id}><div><p className="font-medium">{document.title}</p><p className="text-sm text-muted-foreground">{document.kind} · {document.wordCount} words</p></div><Badge variant="outline">Open</Badge></div>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Research integrity</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><p className="text-sm leading-6 text-muted-foreground">Keep source notes, citations, and AI-assisted passages linked as you work.</p><Separator /><div className="flex items-center justify-between"><span className="text-sm">Citation coverage</span><Badge variant="secondary">{citations.length ? 'In progress' : 'Start adding sources'}</Badge></div></CardContent></Card>
          </section>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
