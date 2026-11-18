import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PORTAL_DISCLAIMER } from '../data/iiserInstitutionsData';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Class 11–12 Aspirant');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setFeedback(data.error || 'Could not submit inquiry. Please check all fields.');
        return;
      }
      setStatus('success');
      setFeedback('Your inquiry or correction note has been recorded. Thank you for helping keep IISER GUIDE accurate.');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setFeedback('Network error while submitting form.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-blue-800 uppercase">
          About, Privacy &amp; Contact
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 font-display">
          About IISER GUIDE &amp; Verification Policy
        </h1>
        <p className="text-base text-slate-700 leading-relaxed">
          IISER GUIDE is an independent educational knowledge portal dedicated to helping Class 9–12 students, parents, researchers, and job seekers navigate India&apos;s seven IISER institutions with verified, transparent data.
        </p>
      </div>

      {/* Mandatory Disclaimer */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-2">
        <h2 className="text-lg font-semibold text-amber-950 font-display">
          Official Disclaimer &amp; Non-Affiliation Notice
        </h2>
        <p className="text-sm text-amber-900 leading-relaxed">{PORTAL_DISCLAIMER}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-semibold text-slate-900 font-display">
            Submit a Query or Official Data Correction
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="contact-role" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Role
              </label>
              <select
                id="contact-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Class 11–12 Aspirant">Class 11–12 Aspirant</option>
                <option value="Parent / Guardian">Parent / Guardian</option>
                <option value="IISER Student / Alumni">IISER Student / Alumni</option>
                <option value="PhD / Faculty Applicant">Ph.D. / Faculty Applicant</option>
                <option value="Educator / Counsellor">Educator / Counsellor</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                Message or Data Source Link
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your question or official circular URL for portal updates..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  status === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                {status === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />}
                <span>{feedback}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-5 py-2.5 bg-slate-900 hover:bg-blue-900 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Message'}
            </button>
          </form>
        </section>

        {/* Privacy & Editorial Policy */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 text-sm text-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 font-display mb-2">
              Privacy Policy
            </h2>
            <p className="leading-relaxed text-xs">
              Interactive tools (Eligibility Checker, Study Planner, Course Finder, Scholarship Finder) run locally in your browser without storing personal academic profiles. Contact form submissions are stored solely to review portal inquiries or official data corrections.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-base font-semibold text-slate-900 font-display mb-2">
              Editorial Accuracy Standards
            </h3>
            <ul className="list-disc pl-4 space-y-1.5 text-xs">
              <li>Primary citations from iiseradmission.in, NIRF, DST, and official IISER sites.</li>
              <li>Explicit distinction between verified govt pay scales and estimated industry ranges.</li>
              <li>Unannounced dates and undisclosed placement metrics are never fabricated.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
