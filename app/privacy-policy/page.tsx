import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wonderhub",
  description:
    "Learn how Wonderhub collects, uses, stores, and protects your personal information when you visit our website or submit a service enquiry.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <p>
        Wonderhub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects
        your privacy and is committed to protecting your personal information.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We may collect personal information when you visit our website,
          contact us, request a quote, submit an enquiry, or interact with our
          advertisements and lead forms.
        </p>

        <h3 className="mt-6 font-semibold text-zinc-900">
          Information you provide directly
        </h3>
        <p>Depending on your interaction with us, this may include:</p>
        <ul>
          <li>Full name, phone number, and email address.</li>
          <li>Business name and relevant business information.</li>
          <li>Website address, if applicable.</li>
          <li>Type of service or website project you require.</li>
          <li>Estimated project budget and preferred timeline.</li>
          <li>
            Details you provide in messages, enquiries, or project briefs.
          </li>
        </ul>

        <h3 className="mt-6 font-semibold text-zinc-900">
          Information collected automatically
        </h3>
        <p>
          Depending on the technologies enabled on our website, we may collect
          your IP address, general location information, browser type, device
          information, pages visited, referral sources, and website usage data.
        </p>

        <h3 className="mt-6 font-semibold text-zinc-900">
          Information from advertising platforms
        </h3>
        <p>
          If you submit a lead form through Facebook, Instagram, or another
          advertising platform, we may receive the information you provide
          through that form, subject to the platform&apos;s privacy settings and
          applicable policies.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We may use your personal information to:</p>
        <ul>
          <li>Respond to enquiries and quotation requests.</li>
          <li>Contact you about your website or development project.</li>
          <li>Understand your requirements and recommend suitable services.</li>
          <li>Prepare proposals, estimates, and project plans.</li>
          <li>Provide, manage, and improve our services.</li>
          <li>Communicate with you about projects and support requests.</li>
          <li>Manage advertising campaigns and assess their effectiveness.</li>
          <li>Maintain website security and troubleshoot technical issues.</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
        <p>
          We will not use your information for unrelated purposes that are
          incompatible with the purposes for which it was collected, unless
          permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "4. Marketing Communications",
    content: (
      <p>
        We may contact you in response to an enquiry or to discuss services you
        have requested. We will only send promotional communications where we
        have an appropriate lawful basis or any consent required by applicable
        law. You can ask us to stop sending marketing communications at any time
        by replying to the message or contacting us. Opting out of promotional
        messages will not prevent essential communications about an active
        project or existing business relationship.
      </p>
    ),
  },
  {
    id: "legal-basis",
    title: "5. Legal Basis for Processing",
    content: (
      <>
        <p>
          Where applicable, we process personal information on one or more of
          the following bases:
        </p>
        <ul>
          <li>Your consent.</li>
          <li>
            Taking steps at your request before entering into a contract or
            performing a contract with you.
          </li>
          <li>
            Our legitimate interests, where those interests are not overridden
            by your rights.
          </li>
          <li>Compliance with legal obligations.</li>
        </ul>
        <p>
          Where processing relies on consent, you may withdraw your consent,
          subject to applicable legal requirements. Withdrawal does not affect
          processing carried out lawfully before consent was withdrawn.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "6. How We Share Your Information",
    content: (
      <>
        <p>We do not sell your personal information.</p>
        <p>
          We may share relevant information with trusted service providers where
          reasonably necessary to operate our business, including:
        </p>
        <ul>
          <li>Website hosting and infrastructure providers.</li>
          <li>Business communication and email service providers.</li>
          <li>Customer relationship and lead-management tools.</li>
          <li>Advertising and analytics providers, where enabled.</li>
          <li>Payment service providers, where applicable.</li>
          <li>
            Professional advisers, regulators, or public authorities when
            legally required.
          </li>
        </ul>
        <p>
          For example, if you submit a lead form through Meta, information may
          be processed by Meta and transferred to us according to applicable
          platform terms and privacy policies. We take appropriate steps to
          protect information handled by service providers where required by
          law.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies and Similar Technologies",
    content: (
      <p>
        Our website may use cookies and similar technologies to support
        functionality, understand website usage, measure advertising
        performance, and improve user experience. Depending on the tools
        enabled, these may include analytics or advertising technologies such as
        the Meta Pixel. You can manage cookies through your browser settings
        and, where available, our website&apos;s cookie preferences. Disabling
        certain cookies may affect functionality. Where required by law, we will
        obtain consent before using non-essential cookies or similar
        technologies.
      </p>
    ),
  },
  {
    id: "security",
    title: "8. Data Storage and Security",
    content: (
      <p>
        We take reasonable technical and organisational measures to protect
        personal information against unauthorised access, disclosure,
        alteration, loss, or misuse. Measures may include access controls,
        secure hosting, and limiting access to authorised persons who need the
        information for legitimate business purposes. However, no method of
        electronic transmission or storage is completely secure, and we cannot
        guarantee absolute security. We retain personal information only for as
        long as reasonably necessary for the purposes described in this policy,
        including legal, accounting, contractual, and dispute-resolution
        requirements.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "9. International Data Transfers",
    content: (
      <p>
        Some of our service providers may process or store personal information
        outside Nigeria or outside your country of residence. Where personal
        information is transferred internationally, we will take steps to ensure
        that the transfer and subsequent processing comply with applicable data
        protection laws and that appropriate safeguards are in place where
        required.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "10. Your Privacy Rights",
    content: (
      <>
        <p>Depending on applicable law, you may have the right to:</p>
        <ul>
          <li>Request access to personal information we hold about you.</li>
          <li>Request correction of inaccurate or incomplete information.</li>
          <li>
            Request deletion of your personal information where applicable.
          </li>
          <li>Request restriction of certain processing activities.</li>
          <li>Object to certain processing, including direct marketing.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>
            Request a copy of your personal information in a portable format
            where applicable.
          </li>
          <li>
            Lodge a complaint with the relevant data protection authority.
          </li>
        </ul>
        <p>
          To exercise these rights, contact us using the details below. We may
          need to verify your identity before responding.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "11. Third-Party Websites and Services",
    content: (
      <p>
        Our website or communications may contain links to third-party websites
        and services. Those websites operate under their own privacy policies
        and practices. We are not responsible for third-party privacy practices
        and encourage you to review their policies before providing personal
        information.
      </p>
    ),
  },
  {
    id: "children",
    title: "12. Children’s Privacy",
    content: (
      <p>
        Our services are intended for businesses and individuals who are legally
        able to enquire about or enter into the relevant services. We do not
        knowingly collect personal information from children where doing so
        would be unlawful. If you believe a child has provided personal
        information to us inappropriately, please contact us so we can assess
        and address the matter.
      </p>
    ),
  },
  {
    id: "changes",
    title: "13. Changes to This Privacy Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our services, business practices, technology, or legal requirements.
        Changes will be published on this page together with an updated “Last
        updated” date. Where required by law, we will provide additional notice
        or obtain consent for material changes.
      </p>
    ),
  },
  {
    id: "contact",
    title: "14. Contact Us",
    content: (
      <>
        <p>
          If you have questions about this Privacy Policy, wish to exercise your
          privacy rights, or have concerns about how we handle your personal
          information, please contact us:
        </p>
        <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="font-semibold text-zinc-950">Wonderhub</p>
          <p>
            Website:{" "}
            <a
              href="https://wonderhub.com.ng"
              className="text-violet-700 underline underline-offset-4"
            >
              wonderhub.com.ng
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@wonderhub.com.ng?subject=Privacy%20Request"
              className="text-violet-700 underline underline-offset-4"
            >
              info@wonderhub.com.ng
            </a>
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            Please include “Privacy Request” in your email subject so we can
            identify your request promptly.
          </p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-700">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-10">
          <div className="mt-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
              Legal &amp; Privacy
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              Your privacy matters to us. Learn how we handle your information
              when you visit our website, contact us, or enquire about our
              services.
            </p>
            <p className="mt-5 text-sm text-zinc-500">
              Last updated: 26 October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-8">
          <div className="rounded-2xl border border-zinc-200 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
              On this page
            </h2>
            <nav aria-label="Privacy policy sections" className="mt-4">
              <ol className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-lg px-3 py-2 text-sm leading-5 text-zinc-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="mt-5 rounded-2xl bg-violet-50 p-5">
            <h3 className="font-semibold text-zinc-950">
              Have a privacy question?
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Our team can help with questions about your personal information.
            </p>
            <a
              href="mailto:info@wonderhub.com.ng?subject=Privacy%20Request"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
            >
              Contact us <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>

        {/* Policy sections */}
        <article className="min-w-0 max-w-3xl">
          <div className="mb-10 rounded-2xl border border-violet-100 bg-violet-50/60 p-5 sm:p-6">
            <p className="text-sm leading-7 text-zinc-700">
              This policy explains what personal information we collect, why we
              collect it, how we use and protect it, and the choices and rights
              available to you under applicable data protection laws.
            </p>
          </div>

          <div className="divide-y divide-zinc-200">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8 py-8 first:pt-0"
              >
                <h2 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">
                  {section.title}
                </h2>

                <div className="policy-content mt-4 space-y-4 text-[15px] leading-8 text-zinc-600 sm:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-zinc-950">
              Need help or have a concern?
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              Contact Wonderhub if you have questions about this policy or would
              like to make a privacy-related request.
            </p>
            <a
              href="mailto:info@wonderhub.com.ng?subject=Privacy%20Request"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2"
            >
              Email Wonderhub
            </a>
          </div>
        </article>
      </div>

      {/* Typography for policy content */}
      <style>{`
        .policy-content p {
          margin: 0;
        }

        .policy-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.75rem;
        }

        .policy-content li {
          padding-left: 0.25rem;
          margin-top: 0.35rem;
        }

        .policy-content li::marker {
          color: #8b5cf6;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
