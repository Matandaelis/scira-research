'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { and, desc, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { academicCitation, academicDocument, academicProject, academicSource } from '@/lib/db/schema';

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error('Unauthorized');
  return session.user.id;
}

export async function getAcademicProjects() {
  const userId = await getUserId();
  return db.select().from(academicProject).where(eq(academicProject.userId, userId)).orderBy(desc(academicProject.updatedAt));
}

export async function createAcademicProject(input: {
  title: string;
  type: 'thesis' | 'dissertation' | 'literature_review' | 'research_paper' | 'research_question';
  discipline?: string;
}) {
  const userId = await getUserId();
  const title = input.title.trim();
  if (title.length < 3 || title.length > 160) throw new Error('Project title must be between 3 and 160 characters.');
  const [project] = await db.insert(academicProject).values({ userId, title, type: input.type, discipline: input.discipline?.trim() || null }).returning();
  await db.insert(academicDocument).values({ userId, projectId: project.id, title: 'Working outline', kind: 'outline' });
  revalidatePath('/');
  revalidatePath('/new');
  return project;
}

export async function getAcademicProject(projectId: string) {
  const userId = await getUserId();
  const [project] = await db.select().from(academicProject).where(and(eq(academicProject.id, projectId), eq(academicProject.userId, userId))).limit(1);
  if (!project) throw new Error('Project not found.');
  const [documents, sources, citations] = await Promise.all([
    db.select().from(academicDocument).where(and(eq(academicDocument.projectId, projectId), eq(academicDocument.userId, userId))).orderBy(desc(academicDocument.updatedAt)),
    db.select().from(academicSource).where(and(eq(academicSource.projectId, projectId), eq(academicSource.userId, userId))).orderBy(desc(academicSource.createdAt)),
    db.select().from(academicCitation).where(and(eq(academicCitation.projectId, projectId), eq(academicCitation.userId, userId))).orderBy(desc(academicCitation.createdAt)),
  ]);
  return { project, documents, sources, citations };
}
