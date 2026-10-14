import { site } from '../config';

export const privacyIntro = `${site.brandName} takes your privacy seriously. Client trust is central to our commercial brokerage and professional services. This policy summarises what personal information we may collect, why we use it, who we may share it with, how long we keep it, and the choices available to you when you use our website or work with our team in the United Arab Emirates.`;

export const privacySections = [
  {
    id: 'data-collection',
    letter: 'A',
    shortLabel: 'Collection',
    title: 'Data collection',
    paragraphs: ['We typically handle two broad categories of information:'],
    bullets: [
      'Identity and contact details you give us—such as your name, postal or business address, ID or passport details, date of birth, email, telephone number, employment or company information, service requirements, and documents submitted for brokerage, clearing, or related work (together, “Personal Data”).',
      'Technical information about how our site is used—pages visited, session duration, browser and device type, referral source, and similar analytics that may be aggregated or anonymised (“Usage Data”).',
    ],
    afterBullets: [
      'We collect Personal Data when you request a quote, submit our contact form, email or call us, engage our services, or sign up for updates where offered. We only collect what we reasonably need to respond, deliver services, and meet legal duties.',
      'From time to time we may invite feedback or surveys to improve quality. Data from the website may be matched with information you provide offline so we maintain one consistent record.',
      'Where allowed by law, we may retain records of calls or electronic correspondence for training, dispute handling, or compliance. Usage Data helps us understand traffic patterns; it is not used to identify you unless combined with Personal Data. Cookies are described in section (J).',
    ],
  },
  {
    id: 'purpose',
    letter: 'B',
    shortLabel: 'Purpose',
    title: 'Purpose for collection, processing and disclosure',
    subsections: [
      {
        subtitle: 'Why we collect and use information',
        paragraphs: ['Personal Data and aggregated Usage Data may be processed for purposes that include:'],
        bullets: [
          'Delivering and administering the services you ask for—commercial brokerage support, document clearing, facilities services, consulting, and other categories listed on our website.',
          'Carrying out instructions you authorise, maintaining enquiry or client files, and closing matters when work is complete.',
          'Improving site content, performance, and security, and telling you about material changes where appropriate.',
          'Sharing updates, guides, or information about services similar to those you have used (you may opt out of marketing at any time).',
          'Running satisfaction surveys and internal reviews to raise service standards.',
          'Meeting legal, licensing, and regulatory obligations in the UAE and applicable free zones—including customer due diligence, monitoring, accounting, audit reporting, and cooperation with authorities where required.',
          'Handling questions, applications, complaints, and feedback you send us.',
          'Any other purpose you were informed of when the data was provided.',
        ],
      },
      {
        subtitle: 'When we share information',
        paragraphs: [
          'We disclose Personal Data only where there is a legitimate need— for example to perform your instructions, operate our business safely, or comply with law. Recipients may include:',
        ],
        bullets: [
          'Related companies or affiliates, where needed for coordinated service delivery.',
          'Professional advisers such as lawyers, accountants, or auditors under confidentiality duties.',
          'IT hosts, email providers, document processors, and other vendors who support our operations on a limited, contracted basis.',
          'Counterparties, registries, or clearing bodies involved in a transaction you direct us to support.',
          'Representatives you appoint, or parties with a legal interest in a matter, where disclosure is appropriate.',
          'Regulators, courts, or law enforcement when the law requires it or to investigate fraud or unlawful conduct.',
        ],
        afterBullets: [
          'We do not sell your Personal Data. We do not allow third parties to use your Personal Data for their own unrelated marketing without your consent. We may share statistics that do not identify individuals.',
        ],
      },
    ],
  },
  {
    id: 'transfer',
    letter: 'C',
    shortLabel: 'Transfers',
    title: 'Transfer of personal information overseas',
    paragraphs: [
      'We prefer to store and process Personal Data within the United Arab Emirates. If data must be sent abroad—for example to a cloud provider or group office—we will apply safeguards consistent with applicable UAE data protection requirements, such as contractual protections or transfers to locations recognised as offering adequate protection.',
    ],
  },
  {
    id: 'consent',
    letter: 'D',
    shortLabel: 'Consent',
    title: 'Consent',
    paragraphs: [
      'Our staff and representatives must treat Personal Data as confidential. Unless this policy describes otherwise, or the law permits, we do not collect, use, or disclose Personal Data without a valid basis— which may include your consent, contractual necessity, legal obligation, or legitimate interests that are not overridden by your rights.',
      'When you voluntarily provide information to obtain a service, you understand it is needed for us to proceed. Where the law requires explicit consent—for a new or sensitive purpose—we will ask separately.',
      'If you supply information about another individual, you confirm you have their permission or authority to do so for the purposes set out here.',
      'You may withdraw consent or object to certain processing by writing to us. Withdrawal might limit the services we can provide; we will explain the impact before finalising your request and allow reasonable time to process it.',
    ],
  },
  {
    id: 'retention',
    letter: 'E',
    shortLabel: 'Retention',
    title: 'Retention',
    paragraphs: [
      'We keep Personal Data only for as long as the original purpose remains relevant, our relationship requires it, or law and regulation (including licensing and tax rules) oblige us to retain records. When those reasons no longer apply, we delete or anonymise data using methods appropriate to the medium in which it is held.',
    ],
  },
  {
    id: 'accuracy',
    letter: 'F',
    shortLabel: 'Accuracy',
    title: 'Accuracy, access and correction',
    paragraphs: [
      `We take reasonable steps to ensure Personal Data is accurate and current. If your details change, or you believe we hold incorrect information, please contact us so we can update our records. For corporate clients, authorised signatories may request corrections to business information. You may use section (L) or email ${site.support.email}.`,
    ],
  },
  {
    id: 'access-rights',
    letter: 'G',
    shortLabel: 'Access',
    title: 'Access rights',
    paragraphs: [
      'Depending on applicable law, you may request a copy of Personal Data we hold about you or ask how it has been used. Send your request using the details in section (L). We aim to acknowledge promptly and respond within thirty (30) days where feasible. If we cannot fulfil a request, we will explain why. A reasonable administrative charge may apply where the law allows; we will tell you before proceeding.',
    ],
  },
  {
    id: 'security',
    letter: 'H',
    shortLabel: 'Security',
    title: 'Security safeguards',
    paragraphs: [
      'We maintain administrative, technical, and physical measures designed to reduce the risk of unauthorised access, loss, or misuse—including access controls, monitoring, and staff training on confidentiality and information security.',
      'Despite these measures, no internet transmission or storage system is completely secure. We cannot guarantee absolute security of data sent to or from us online. Please protect your devices, passwords, and any credentials used to communicate with us.',
    ],
  },
  {
    id: 'updates',
    letter: 'I',
    shortLabel: 'Updates',
    title: 'Effect of and updates to this Privacy Policy',
    paragraphs: [
      'This document works together with any service terms, notices, or consent forms that apply to you. We may revise this policy when our practices or legal requirements change. The current version will always appear on this page. Continued use of the website after an update indicates acceptance, except where fresh consent is required for new processing activities.',
    ],
  },
  {
    id: 'cookies',
    letter: 'J',
    shortLabel: 'Cookies',
    title: 'Use of cookies',
    paragraphs: [
      'Cookies are small text files placed on your device when you browse our site. They help us recognise returning visitors, remember preferences, and measure anonymous usage trends.',
      'Some cookies are session-based; others persist for a defined period. Third-party tools we use may set their own cookies subject to their policies. You can block or delete cookies in your browser; doing so may affect site features. We do not use cookies to pull data that was never supplied through that cookie, and we do not use cookie-based data for unrelated advertising without consent.',
    ],
  },
  {
    id: 'governing-law',
    letter: 'K',
    shortLabel: 'Law',
    title: 'Governing law',
    paragraphs: [
      'This Privacy Policy is written for compliance with the laws of the United Arab Emirates and rules applicable in the Ras Al Khaimah Economic Zone (RAKEZ). It is not a statement that identical standards apply in every country; if you access our services from elsewhere, local laws may also apply to you.',
    ],
  },
  {
    id: 'contact',
    letter: 'L',
    shortLabel: 'Contact',
    title: 'Contact us',
    paragraphs: [
      'For privacy questions, to exercise your rights, or to raise a concern about how we handle Personal Data, please contact:',
    ],
    contactBlock: true,
  },
  {
    id: 'disclaimer',
    letter: 'M',
    shortLabel: 'Disclaimer',
    title: 'Disclaimer',
    paragraphs: [
      'Links on our website or in our messages may lead to external sites operated by others. This policy does not govern those sites. We encourage you to review the privacy statements of any third-party site before submitting personal information there.',
    ],
  },
];

export const privacyContact = {
  subject: 'Privacy Policy',
  attention: 'Data Protection Committee',
  email: site.support.email,
  address: site.address,
};
