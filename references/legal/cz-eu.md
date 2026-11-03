# Czech/EU legal readiness profile

Use only when established operator, audience and market facts justify a Czech/EU review. This profile routes research for small websites, applications and ordinary SaaS projects. It is not a verified current ruleset or a fixed list of obligations for every project. It does not establish complete coverage of other EU countries' national rules.

## Confirm scope

Establish the operator and country of establishment, target countries, consumer/business roles, paid/free model, launch date and any relevant age or sector features. Determine the relevant processing and contractual roles from actual activities, not only contract labels. Record other markets or specialist topics as scope gaps requiring the appropriate sources.

Load `../legal-review.md` for the method. The source links below are starting points, not proof of their contents or current applicability. Retrieve the relevant official text during each audit, choose the version applicable at the review/launch date and record the exact provisions, exceptions, dates and supporting facts. Verify current authority guidance separately from the legislation it discusses. Official portals may need a browser or another official format; a blocked or empty response must not be recorded as verified text.

## Source routing

| Candidate area | Primary starting points | Questions to resolve before finding a gap |
| --- | --- | --- |
| Personal data | [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [Czech Act No. 110/2019](https://e-sbirka.gov.cz/sb/2019/110) | Material/territorial scope and roles; purposes and lawful bases; transparency, rights, retention, processor arrangements, security and transfer rules relevant to the actual flows. |
| Cookies and similar technologies | [Electronic Communications Act No. 127/2005](https://e-sbirka.gov.cz/sb/2005/127), starting with section 89(3); [UOOU cookie guidance](https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies) | What is stored/accessed, for what purpose, whether an exception applies, and the separate basis for any subsequent personal-data processing. Treat the FAQ as authority guidance, not legislation. |
| Marketing communications | [Act No. 480/2004](https://e-sbirka.gov.cz/sb/2004/480), starting with section 7; [UOOU guidance](https://uoou.gov.cz/cinnost/obchodni-sdeleni/casto-kladene-otazky-k-zakonu-c-4802004-sb) | Service versus promotional messages, consent or a supported customer exception, proof and effective opt-out. Check the actual message content and recipient relationship. |
| Operator information and consumer contracts | [Civil Code, Act No. 89/2012](https://e-sbirka.gov.cz/sb/2012/89), [Consumer Protection Act No. 634/1992](https://e-sbirka.gov.cz/sb/1992/634), [COI digital content/service guidance](https://coi.gov.cz/faq/smlouvy-o-poskytovani-digitalniho-obsahu-ci-sluzby/) | Operator/business/consumer roles, type of supply, applicable information and language requirements, payment/renewal, complaints, withdrawal and termination. Verify current national provisions; authority summaries do not replace them. |
| Rights in software and content | [Copyright Act No. 121/2000](https://e-sbirka.gov.cz/sb/2000/121), exact upstream license texts and relevant executed rights agreements | Actual rights and license version for code, fonts, images and content; distribution/network use model, attribution/notices and other applicable conditions. A dependency listing is only an inventory. |
| Supplier agreements and permitted use | Relevant supplier's official terms, processing agreement, subprocessor list and transfer documents, matched to the operator's actual agreement | Accepted version, roles, account settings and data practices. Public availability does not prove execution or coverage; do not assume a data region excludes other access/transfers. |
| Service accessibility, if relevant | [Act No. 424/2023](https://e-sbirka.gov.cz/sb/2023/424) and applicable implementing/EU sources identified from it | Covered service/operator, dates, exceptions and transition rules. A Lighthouse result is technical evidence, not a decision that a statutory accessibility regime applies or is satisfied. |

For material interpretation, locate relevant official court or authority decisions and explain why their facts and reasoning apply. Do not substitute an unrelated judgment or a nonbinding authority FAQ for the governing rule. For EU directives, verify the applicable national implementation and timing rather than treating every directive provision as a direct launch obligation.

## Practical small-project checks

- Trace real registration, contact, analytics and supplier flows. Compare disclosures with the actual purpose, retention and sharing. Verify rights-handling processes and available agreements without collecting production personal data.
- Test necessary and optional browser storage/access in an isolated environment before consent, after rejection and after withdrawal where relevant. UOOU guidance distinguishes necessary-function uses from other purposes; verify the statutory exception and actual behavior before requiring a banner.
- Review newsletters separately from transaction/service mail. Evaluate any claimed customer exception and its conditions; do not presume that every recipient is a customer or that a checked box proves valid consent.
- Identify whether the offering is digital content, a digital service, another service or a mixed supply before selecting consumer checks. Investigate relevant data-use arrangements even where no money changes hands. Do not apply a blanket withdrawal exception to every app or subscription.
- Match operator information and contract language to applicable market requirements. An English toolkit or report does not imply that English notices are sufficient for every audience.
- Verify licenses and supplier permitted use against the actual artifact, usage and accepted terms. Reuse `SCE-` or security findings for the same root cause instead of duplicating them.

## Scope limits and unresolved questions

Screen actual features for additional requirements involving minors, sensitive data, profiling, regulated advice or payments, user-generated content/intermediary roles, AI or other jurisdictions. Load the relevant official sources in a separately scoped review when needed. Do not assume that all such regimes apply, or that a project without this profile's listed gaps is cleared for those areas.

Record unresolved scope, source-access and legal interpretation questions in the report with the missing facts or exact clarification needed. The initial profile does not cover tax, accounting, employment, every foreign-market rule or specialist sectors. Recheck affected conclusions when the business model, audience, features, suppliers or legal sources change.
