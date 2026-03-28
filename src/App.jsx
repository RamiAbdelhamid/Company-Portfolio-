import { useEffect, useMemo, useState } from 'react';

const routeMap = { '/': 'home', '/services': 'services', '/projects': 'projects', '/contact': 'contact' };
const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];
const services = [
  { title: 'Product design systems', text: 'A scalable visual language with tokens, components, and layout rules that keep your product consistent as it grows.', outcome: 'Faster design decisions' },
  { title: 'High-conversion landing pages', text: 'Focused SaaS pages designed to explain value quickly, reduce friction, and push the right action forward.', outcome: 'Stronger signup flow' },
  { title: 'React front-end builds', text: 'Production-ready interfaces built with maintainable structure, responsive layouts, and performance in mind.', outcome: 'Clean implementation' },
  { title: 'Dashboard interfaces', text: 'Operational screens, analytics views, and client portals that make dense data feel readable and calm.', outcome: 'Clear product UX' },
  { title: 'Brand refresh packages', text: 'A tighter brand expression for founders who need to look credible, modern, and ready to scale.', outcome: 'Sharper first impression' },
  { title: 'Conversion audits', text: 'Structure, content, and UI review to uncover the gaps between attention and action on your current site.', outcome: 'Better page performance' },
];
const projects = [
  {
    name: 'PulseStack',
    client: 'Seed-stage analytics platform',
    type: 'Analytics SaaS',
    result: '+41% trial signups',
    timeline: '5 weeks',
    role: 'Product positioning + UX',
    deliverables: ['Homepage rewrite', 'Dashboard preview', 'Signup flow'],
    summary: 'A cleaner onboarding path, stronger hero messaging, and a sharper dashboard preview for fast product adoption.',
    challenge: 'Users were dropping before they reached the first meaningful dashboard view.',
    approach: 'We simplified the narrative, added a guided preview, and tightened the action hierarchy.',
    impact: ['+41% trial signups', '18% faster activation', '2x clearer CTA flow'],
    stack: ['Strategy', 'UI system', 'React'],
  },
  {
    name: 'Northgrid',
    client: 'Operations team for B2B logistics',
    type: 'Operations platform',
    result: '-28% support tickets',
    timeline: '4 weeks',
    role: 'Workflow UX + IA',
    deliverables: ['Task structure', 'State management', 'Support cleanup'],
    summary: 'Reorganized product information architecture so teams could find actions faster and understand workflows immediately.',
    challenge: 'The product was powerful, but the interface buried critical actions under too many layers.',
    approach: 'We rebuilt the task structure around the most common operator flows and surfaced key states.',
    impact: ['-28% support tickets', '34% faster task completion', 'Reduced onboarding friction'],
    stack: ['Workflow UX', 'Dashboard', 'Accessibility'],
  },
  {
    name: 'LatticePay',
    client: 'Fintech launch campaign',
    type: 'Fintech launch site',
    result: '+36% demo requests',
    timeline: '3.5 weeks',
    role: 'Landing page strategy',
    deliverables: ['Trust signals', 'Pricing section', 'CTA hierarchy'],
    summary: 'A premium landing experience with a polished pricing narrative, trust signals, and clearer CTA hierarchy.',
    challenge: 'The old page felt generic and did not communicate trust quickly enough for finance buyers.',
    approach: 'We reframed the page around trust, proof, and conversion-friendly sequencing.',
    impact: ['+36% demo requests', 'Higher pricing engagement', 'Stronger trust signals'],
    stack: ['Landing page', 'Motion', 'Conversion'],
  },
  {
    name: 'AsterCare',
    client: 'Healthcare portal for patient services',
    type: 'Healthcare portal',
    result: '4.9 avg user rating',
    timeline: '6 weeks',
    role: 'Portal UI refresh',
    deliverables: ['Booking flow', 'Account area', 'Support center'],
    summary: 'A calmer interface for booking, follow-up, and account management with a softer visual rhythm.',
    challenge: 'Patients needed a simpler path through sensitive, repetitive tasks and support interactions.',
    approach: 'We reduced clutter, softened the visual rhythm, and built clearer status-based interactions.',
    impact: ['4.9 avg user rating', 'More repeat usage', 'Calmer support flow'],
    stack: ['Portal UI', 'Design tokens', 'React'],
  },
];
const metrics = [
  { label: 'Launch time', value: '4-6 weeks' },
  { label: 'Typical uplift', value: '+32%' },
  { label: 'Systems delivered', value: '40+' },
];
const logos = ['Aster', 'Nuvio', 'Orbit', 'Mosaic', 'Flux'];

function App() {
  const [path, setPath] = useState(() => (typeof window === 'undefined' ? '/' : window.location.pathname));
  const [theme, setTheme] = useState('dark');
  const current = routeMap[path] || 'home';

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!routeMap[path]) {
      window.history.replaceState({}, '', '/');
      setPath('/');
    }
  }, [path]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('theme-light', theme !== 'dark');
  }, [theme]);

  const go = (next) => {
    window.history.pushState({}, '', next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <>
      <div className="fixed right-4 top-4 z-50 group">
        <button
          type="button"
          onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle dark mode"
          aria-pressed={theme === 'dark'}
          className={`gold-hover flex h-8 w-8 items-center justify-center rounded-full border shadow-lg transition ${
            theme === 'dark'
              ? 'border-amber-200/30 bg-[rgba(245,196,81,0.14)] text-amber-200 shadow-amber-500/10'
              : 'border-slate-800/20 bg-[rgba(10,10,10,0.88)] text-amber-100 shadow-black/20'
          }`}
        >
          {theme === 'dark' ? '🌙' : '☀'}
        </button>
        <span
          className={`pointer-events-none absolute right-0 top-10 mt-2 rounded-full border px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] opacity-0 shadow-lg transition group-hover:opacity-100 ${
            theme === 'dark'
              ? 'border-amber-200/20 bg-[rgba(10,10,10,0.9)] text-amber-100'
              : 'border-slate-800/20 bg-[rgba(245,196,81,0.95)] text-slate-950'
          }`}
        >
          Dark Mode
        </span>
      </div>
      <main className={`relative min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-[#090909] text-stone-100' : 'bg-[#f7f1e4] text-slate-950'}`}>
        <div className={`pointer-events-none absolute inset-0 ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_top_left,_rgba(245,196,81,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(184,134,11,0.14),_transparent_28%),linear-gradient(to_bottom,_rgba(20,20,20,0.88),_rgba(9,9,9,0.98))]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(217,164,73,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(245,208,126,0.18),_transparent_28%),linear-gradient(to_bottom,_rgba(255,252,245,0.86),_rgba(255,248,236,0.98))]'}`} />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-[28rem] ${theme === 'dark' ? 'bg-[linear-gradient(180deg,rgba(245,196,81,0.12),transparent_75%)]' : 'bg-[linear-gradient(180deg,rgba(217,164,73,0.1),transparent_75%)]'}`} />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <Header current={current} go={go} />
          <div key={current} className="page-enter flex-1">
            {current === 'home' && <HomePage go={go} />}
            {current === 'services' && <ServicesPage go={go} />}
            {current === 'projects' && <ProjectsPage go={go} />}
            {current === 'contact' && <ContactPage go={go} />}
          </div>
          <Footer go={go} />
        </div>
      </main>
    </>
  );
}

function Header({ current, go, theme, setTheme }) {
  return (
    <header className="glass-panel relative sticky top-4 z-20 rounded-[1.75rem] border border-white/70 px-4 py-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button type="button" onClick={() => go('/')} className="flex items-center gap-3 text-left">
          <div className="gold-hover flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#b8860b,#f5c451)] text-white shadow-lg shadow-amber-500/20"><Mark /></div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.42em] text-slate-500">Codexa</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">Modern SaaS studio</p>
          </div>
        </button>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => go(item.path)} className={`gold-hover rounded-full border px-4 py-2 text-sm font-medium transition ${current === item.id ? 'border-amber-200 bg-amber-600 text-white shadow-lg shadow-amber-500/20' : 'border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'}`}>{item.label}</button>
          ))}
          <button type="button" onClick={() => go('/contact')} className="gold-hover rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">Book a call</button>
        </nav>
      </div>
    </header>
  );
}

function HomePage({ go }) {
  return (
    <div className="mt-8 space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
        <div className="panel relative overflow-hidden rounded-[2.5rem] border border-white/70 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(184,134,11,0.06),transparent_28%,rgba(245,196,81,0.08)_72%,transparent)]" />
          <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-amber-300/20 blur-3xl motion-float" />
          <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-yellow-300/20 blur-3xl motion-float delay-1" />
          <div className="absolute -bottom-8 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl motion-float delay-2" />
          <div className="absolute inset-y-0 right-0 hidden w-40 bg-[linear-gradient(180deg,transparent,rgba(184,134,11,0.12),transparent)] opacity-70 lg:block" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-700"><Icon name="spark" /> Build better product experiences</div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Codexa designs modern SaaS sites that feel polished, clear, and easy to trust.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">We build launch-ready websites for software teams that need stronger positioning, cleaner UX, and a more premium first impression.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => go('/projects')} className="gold-hover rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-500">See projects</button>
              <button type="button" onClick={() => go('/services')} className="gold-hover rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Explore services</button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">{metrics.map((item, index) => <MetricCard key={item.label} {...item} index={index} />)}</div>
          </div>
        </div>
        <div className="grid gap-4">
          <DashboardCard />
          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title="Product clarity" value="1 focus" note="One story per screen" />
            <MiniCard title="Delivery style" value="Sprint" note="Fast, structured, calm" />
          </div>
          <article className="panel motion-rise rounded-[2rem] border border-white/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Motion system</p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">Subtle movement, not noise</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#b8860b,#f5c451)] motion-float" />
            </div>
            <div className="mt-5 space-y-3">
              <div className="h-2 w-[88%] rounded-full bg-slate-100">
                <div className="h-2 w-[64%] rounded-full bg-[linear-gradient(90deg,#b8860b,#f5c451)]" />
              </div>
              <div className="h-2 w-[74%] rounded-full bg-slate-100">
                <div className="h-2 w-[52%] rounded-full bg-[linear-gradient(90deg,#3b2d10,#d4a84a)]" />
              </div>
              <div className="h-2 w-[84%] rounded-full bg-slate-100">
                <div className="h-2 w-[71%] rounded-full bg-[linear-gradient(90deg,#f5c451,#b8860b)]" />
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="panel rounded-[2rem] border border-white/70 px-6 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-medium text-slate-500">Trusted by early-stage teams and product founders</p>
          <div className="flex flex-wrap gap-3">{logos.map((logo) => <span key={logo} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500">{logo}</span>)}</div>
        </div>
      </section>
      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro eyebrow="What we do" title="Everything a SaaS launch needs, without the noise." copy="The system is built around clarity: a stronger story, cleaner visual hierarchy, and interfaces that make the product feel more credible." />
        <div className="grid gap-4 sm:grid-cols-2">{services.slice(0, 4).map((service, index) => <ServiceTile key={service.title} {...service} index={index + 1} compact />)}</div>
      </section>
      <section className="grid gap-5 lg:grid-cols-3">
        {[
          { title: 'Positioning first', text: 'A sharper homepage narrative that explains what you do and why it matters in seconds.' },
          { title: 'Design system ready', text: 'Reusable patterns and styling choices that help the site scale into product pages later.' },
          { title: 'Performance aware', text: 'Simple React structure, responsive layout rules, and motion used only where it adds value.' },
        ].map((item) => (
          <article key={item.title} className="panel rounded-[2rem] border border-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.title}</div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>
      <Callout go={go} />
    </div>
  );
}

function ServicesPage({ go }) {
  return (
    <div className="mt-8 space-y-8">
      <SectionHero
        eyebrow="Services"
        title="A focused service stack for modern SaaS brands."
        copy="Each service is designed to reduce friction and make the product feel clearer, faster, and more premium."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceTile key={service.title} {...service} index={index + 1} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <Icon name="layers" />
            Delivery flow
          </div>
          <div className="mt-6 space-y-4">
            {[
              '1. Audit the current story, UI structure, and missing conversion points.',
              '2. Shape the visual system and page hierarchy around the product narrative.',
              '3. Build the experience in React with reusable, maintainable components.',
            ].map((step) => (
              <div key={step} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-sm leading-7 text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <Icon name="check" />
            What you get
          </div>
          <div className="mt-6 grid gap-3">
            {[
              'Clear homepage messaging',
              'Modern service presentation',
              'Case-study style project cards',
              'High-trust contact page',
              'Responsive layout system',
              'Easy-to-edit mock content',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-white">
                  <Icon name="check" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <Callout go={go} />
    </div>
  );
}

function ProjectsPage({ go }) {
  return (
    <div className="mt-8 space-y-8">
      <SectionHero
        eyebrow="Projects"
        title="Case studies that read like product wins."
        copy="Each mock project is framed like a real SaaS outcome, so you can swap in your own work later without changing the structure."
      />

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="panel gold-hover rounded-[2.5rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-700">Featured case study</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-slate-950">{projects[0].name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.3em] text-slate-400">{projects[0].client}</p>
            </div>
            <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">{projects[0].result}</div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f7f0dd)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Challenge</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{projects[0].challenge}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Approach</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{projects[0].approach}</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Impact</p>
              <div className="mt-4 space-y-3">
                {projects[0].impact.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[1.1rem] border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#b8860b,#f5c451)]" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {projects[0].stack.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Timeline</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{projects[0].timeline}</p>
                </div>
                <div className="rounded-[1.1rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Role</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{projects[0].role}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">{projects[0].summary}</p>
        </article>

        <div className="grid gap-4">
          {projects.slice(1).map((project, index) => (
            <article key={project.name} className="panel gold-hover rounded-[2.25rem] border border-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">0{index + 2}</p>
                  <h4 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{project.name}</h4>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.28em] text-slate-400">{project.client}</p>
                </div>
                <div className="rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">{project.result}</div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">{project.challenge}</p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Focus</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">{project.role}</p>
                </div>
                <div className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Deliverables</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.deliverables.map((item) => (
                      <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            <Icon name="chart" />
            Delivery snapshot
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">Landing page engagement</p>
              <div className="mt-4 h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[78%] rounded-full bg-[linear-gradient(90deg,#b8860b,#f5c451)]" />
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">CTA conversion</p>
              <div className="mt-4 h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[64%] rounded-full bg-[linear-gradient(90deg,#2d220d,#d4a84a)]" />
              </div>
            </div>
          </div>
        </article>

        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            <Icon name="shield" />
            System notes
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            This layout is meant to feel like a modern SaaS portfolio, not a generic agency brochure. The case studies use metric-first framing, small badges, and plenty of white space.
          </p>
        </article>
      </section>

      <Callout go={go} />
    </div>
  );
}

function ContactPage({ go }) {
  return (
    <div className="mt-8 space-y-8">
      <SectionHero
        eyebrow="Contact"
        title="Start a project that feels more premium."
        copy="Tell us what you are building and we will turn it into a clean, conversion-focused SaaS experience."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            <Icon name="mail" />
            Reach out
          </div>

          <div className="mt-6 space-y-4">
            <InfoRow label="Email" value="hello@codexa.dev" />
            <InfoRow label="Call" value="+1 (555) 010-2000" />
            <InfoRow label="Availability" value="New SaaS builds in Q2" />
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(184,134,11,0.14),rgba(245,196,81,0.16))] p-5">
            <p className="text-sm font-semibold text-slate-900">Best fit</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Founders and product teams who want a sharper website, a cleaner story, and a site that feels ready for scale.
            </p>
          </div>
        </article>

        <article className="panel rounded-[2.25rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            <Icon name="spark" />
            Static contact info
          </div>

          <div className="mt-6 space-y-4">
            <InfoRow label="Email" value="hello@codexa.dev" />
            <InfoRow label="Phone" value="+1 (555) 010-2000" />
            <InfoRow label="Availability" value="Reply within 1 business day" />
            <InfoRow label="Best fit" value="SaaS, dashboards, product sites" />
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">How to start</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Send a short email with your product name, what needs to change, and any links you want us to review.
            </p>
          </div>
        </article>
      </section>

      <Callout go={go} />
    </div>
  );
}

function SectionHero({ eyebrow, title, copy }) {
  return (
    <section className="panel rounded-[2.5rem] border border-white/70 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy}</p>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <article className="panel rounded-[2rem] border border-white/70 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-700">{eyebrow}</p>
      <h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{copy}</p>
    </article>
  );
}

function ServiceTile({ title, text, outcome, index, compact = false }) {
  return (
    <article className={`panel rounded-[2rem] border border-white/70 ${compact ? 'p-5' : 'p-6'} shadow-[0_18px_60px_rgba(15,23,42,0.06)]`}>
      <div className="flex items-center justify-between gap-3">
            <div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">0{index}</div>
        <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{outcome}</div>
      </div>
      <h4 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </article>
  );
}

function DashboardCard() {
  const bars = useMemo(() => [42, 68, 54, 78, 62, 88, 70, 94], []);
  return (
    <section className="panel rounded-[2.5rem] border border-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Live dashboard</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Product performance at a glance</h3>
        </div>
        <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">+18.4% this month</div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">MRR</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">$128k</p>
          <p className="mt-2 text-sm text-amber-700">+9.1% from last cycle</p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Activation</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">72%</p>
          <p className="mt-2 text-sm text-amber-700">Improved onboarding clarity</p>
        </div>
      </div>
      <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">Weekly usage</p>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">This week</p>
        </div>
        <div className="mt-5 flex h-44 items-end gap-2">{bars.map((bar, index) => <div key={`${bar}-${index}`} className="flex-1 rounded-t-2xl bg-[linear-gradient(180deg,rgba(184,134,11,0.95),rgba(245,196,81,0.92))]" style={{ height: `${bar}%` }} />)}</div>
      </div>
      <div className="mt-6 grid gap-3">
        {[
          { label: 'Homepage refresh', state: 'Ready for review' },
          { label: 'Pricing copy', state: 'In progress' },
          { label: 'CTA testing', state: 'Queued' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-medium text-slate-700">{item.label}</p>
            <p className="text-sm text-slate-500">{item.state}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniCard({ title, value, note }) {
  return (
    <article className="panel rounded-[2rem] border border-white/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{note}</p>
    </article>
  );
}

function MetricCard({ label, value }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function Callout({ go }) {
  return (
    <section className="panel rounded-[2.5rem] border border-white/70 bg-[linear-gradient(135deg,rgba(184,134,11,0.12),rgba(245,196,81,0.14))] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-700">Codexa</p>
          <h3 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Ready for a cleaner SaaS presence?</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Start with the page that matches your goal, then swap the mock content for your real offer and projects.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => go('/contact')} className="gold-hover rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Contact</button>
          <button type="button" onClick={() => go('/services')} className="gold-hover rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Services</button>
        </div>
      </div>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">Codexa. Modern SaaS design for founders and product teams.</p>
      <div className="flex flex-wrap gap-2">{navItems.map((item) => <button key={item.id} type="button" onClick={() => go(item.path)} className="gold-hover rounded-full px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">{item.label}</button>)}</div>
    </footer>
  );
}

function Field({ label, textarea = false }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</span>
      <Tag className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-4 focus:ring-amber-100" rows={textarea ? 6 : undefined} placeholder={label} />
    </label>
  );
}

function Icon({ name }) {
  const icons = {
    spark: <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />,
    layers: (<><path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M3.5 12 12 16.5 20.5 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.5 16 12 20.5 20.5 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>),
    check: <path d="m5.5 12 4 4 9-9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />,
    chart: (<><path d="M4 19.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M7 16V9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M12 16V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M17 16v-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>),
    mail: (<><path d="M4.5 7.5h15v9h-15z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>),
    shield: (<><path d="M12 3.5 19 6.5v5.2c0 4.4-3 8.5-7 8.8-4-.3-7-4.4-7-8.8V6.5l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="m9.5 12 1.7 1.7 3.4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></>),
    moon: (<><path d="M15.5 4.5c-3.7.5-6.5 3.7-6.5 7.5 0 4.1 3.4 7.5 7.5 7.5 1.4 0 2.7-.4 3.8-1.1A9 9 0 0 1 8.1 5.6 8 8 0 1 0 15.5 4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></>),
    sun: (<><circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.7" /><path d="M12 2.8v2.6M12 18.6v2.6M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.8 12h2.6M18.6 12h2.6M4.2 19.8 6 18M18 6l1.8-1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>),
  };
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0">{icons[name]}</svg>;
}

function Mark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-7 w-7">
      <path d="M14 32c0-9.9 8.1-18 18-18h18v12H32c-3.3 0-6 2.7-6 6s2.7 6 6 6h18v12H32c-9.9 0-18-8.1-18-18Z" fill="currentColor" />
      <path d="M20 20h10c5.5 0 10 4.5 10 10s-4.5 10-10 10H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default App;


