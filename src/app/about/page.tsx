export const metadata = {
  title: "关于",
  description: "Learn Codex 站点说明、内容更新原则、投稿与内容推荐入口。",
};

const contributionTopics = [
  "Codex App 安装、登录、配置、排错经验",
  "真实项目中使用 Codex 的完整流程和案例",
  "Slash Commands、插件、MCP、自动化的实践教程",
  "适合新手的常见问题、避坑清单和图文指南",
];

const recommendationTypes = [
  "你希望本站补充的教程主题",
  "值得整理的官方文档、工具或开源项目",
  "你遇到过但还没有中文答案的问题",
  "已经验证有效的提示词、工作流或配置方法",
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 md:py-20">
      <section className="max-w-4xl space-y-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">About</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          为什么做 Learn Codex
        </h1>
        <p className="text-lg leading-8 text-slate-300">
          Learn Codex 希望把中文开发者真正需要的 Codex 内容整理清楚：它能做什么、怎么下任务、
          怎么配置、怎么排错，以及怎样把它接进真实项目的日常开发流程。
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">内容原则</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            优先写可落地内容。每篇文章都围绕真实问题展开，尽量给出步骤、判断标准和验证方式。
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">更新方式</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            先补齐高频场景，再逐步扩展到团队协作、复杂工程、插件生态和专项实战案例。
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">内容方向</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            围绕教程、命令、配置、工作流、排错和实战案例持续扩展，优先覆盖真实使用场景。
          </p>
        </div>
      </section>

      <section className="rounded-[32px] border border-orange-300/20 bg-orange-300/10 p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-orange-100">Contribute</p>
          <h2 className="text-3xl font-semibold text-white">欢迎投稿与内容推荐</h2>
          <p className="text-base leading-8 text-orange-50/90">
            如果你有 Codex 使用经验、踩坑记录、配置方法、工具推荐，或者希望本站补充某个主题，
            都可以整理成投稿或内容建议。越具体、越贴近真实场景，越适合沉淀成教程。
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
            <h3 className="text-xl font-semibold text-white">适合投稿的内容</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
              {contributionTopics.map((topic) => (
                <li key={topic} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-200" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-6">
            <h3 className="text-xl font-semibold text-white">也欢迎推荐选题</h3>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
              {recommendationTypes.map((topic) => (
                <li key={topic} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-200" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold text-white">建议怎么提交</h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            推荐带上主题标题、适合的人群、你遇到的问题、解决步骤、截图或命令输出、最终验证结果。
            如果只是推荐选题，也可以直接说明“希望看到什么内容”和“为什么它对新手有帮助”。
          </p>
        </div>
      </section>
    </main>
  );
}
