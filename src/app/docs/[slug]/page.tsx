import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentGuides,
  getGuide,
  getRelatedGuides,
  guides,
  siteConfig,
} from "@/lib/site-data";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {};
  }

  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: `${guide.title} | ${siteConfig.name}`,
      description: guide.description,
      url: `${siteConfig.url}/docs/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const { previous, next } = getAdjacentGuides(slug);
  const relatedGuides = getRelatedGuides(slug, guide.category);
  const articleLdJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    inLanguage: "zh-CN",
    mainEntityOfPage: `${siteConfig.url}/docs/${guide.slug}`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLdJson) }}
      />
      <Link href="/docs" className="text-sm text-orange-200 transition hover:text-white">
        返回教程列表
      </Link>

      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-orange-100">
            {guide.category}
          </span>
          <span>{guide.readingTime}</span>
          <span>{guide.publishedAt}</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {guide.title}
        </h1>
        <p className="text-lg leading-8 text-slate-300">{guide.description}</p>
      </section>

      <section className="space-y-6 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 md:p-6">
        {guide.sections.map((section, index) => (
          <article
            key={section.title}
            className="rounded-[24px] border border-white/10 bg-slate-950/35 p-5 md:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-300/30 bg-orange-300/10 text-sm font-semibold text-orange-100">
                {index + 1}
              </span>
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            </div>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.links ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-4 py-2 text-sm font-medium text-orange-100 transition hover:border-orange-200/50 hover:bg-orange-300/15 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {section.steps ? (
              <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                {section.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-orange-100">
                      {stepIndex + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            {section.note ? (
              <p className="mt-5 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4 text-sm leading-7 text-orange-50">
                {section.note}
              </p>
            ) : null}
            {section.image ? (
              <figure className="-mx-2 mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white md:-mx-1">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  width={section.image.width ?? 1400}
                  height={section.image.height ?? 900}
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                  {section.image.caption}
                </figcaption>
              </figure>
            ) : null}
          </article>
        ))}
      </section>

      {guide.source ? (
        <section className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
          <p className="text-sm text-slate-400">出处</p>
          <Link
            href={guide.source.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex text-sm font-medium text-orange-200 transition hover:text-white"
          >
            {guide.source.label}
          </Link>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
          <p className="text-sm text-slate-400">上一篇</p>
          {previous ? (
            <Link
              href={`/docs/${previous.slug}`}
              className="mt-3 block text-xl font-semibold text-white transition hover:text-orange-200"
            >
              {previous.title}
            </Link>
          ) : (
            <p className="mt-3 text-sm text-slate-500">这已经是第一篇。</p>
          )}
        </div>
        <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
          <p className="text-sm text-slate-400">下一篇</p>
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="mt-3 block text-xl font-semibold text-white transition hover:text-orange-200"
            >
              {next.title}
            </Link>
          ) : (
            <p className="mt-3 text-sm text-slate-500">这已经是最后一篇。</p>
          )}
        </div>
      </section>

      {relatedGuides.length > 0 ? (
        <section className="space-y-5">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Related</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">同专题继续读</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.slug}
                href={`/docs/${relatedGuide.slug}`}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-300/40 hover:bg-white/[0.05]"
              >
                <p className="text-sm text-orange-200">{relatedGuide.category}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{relatedGuide.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {relatedGuide.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

    </main>
  );
}
