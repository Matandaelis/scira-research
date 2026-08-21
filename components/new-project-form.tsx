'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAcademicProject } from '@/app/actions/academic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const types = [
  ['thesis', 'Thesis'],
  ['dissertation', 'Dissertation'],
  ['literature_review', 'Literature review'],
  ['research_paper', 'Research paper'],
  ['research_question', 'Research question'],
] as const;

export function NewProjectForm({ initialType = 'thesis' }: { initialType?: (typeof types)[number][0] }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [type, setType] = useState(initialType);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');
    try {
      const project = await createAcademicProject({ title, discipline, type });
      router.push(`/projects/${project.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to create project.');
    } finally {
      setPending(false);
    }
  }

  return <form className="flex flex-col gap-5 rounded-xl border bg-card p-6" onSubmit={submit}>
    <div className="flex flex-col gap-2"><Label htmlFor="project-title">Project title</Label><Input id="project-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. The role of trust in online communities" required /></div>
    <div className="flex flex-col gap-2"><Label htmlFor="project-discipline">Discipline <span className="text-muted-foreground">(optional)</span></Label><Input id="project-discipline" value={discipline} onChange={(event) => setDiscipline(event.target.value)} placeholder="e.g. Sociology, Computer Science" /></div>
    <div className="flex flex-col gap-2"><Label>Project type</Label><Select value={type} onValueChange={(value) => setType(value as typeof type)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{types.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent></Select></div>
    {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
    <Button type="submit" disabled={pending}>{pending ? 'Creating project…' : 'Create research project'}</Button>
  </form>;
}
