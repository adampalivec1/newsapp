import type { DigestData } from "@/lib/ai/types";

export const MOCK_DIGEST: DigestData = {
  date: "Friday, 25 April 2026",
  topStories: [
    {
      headline: "EU leaders reach emergency agreement on joint defence bonds",
      summary:
        "After an overnight summit in Brussels, EU heads of state agreed in principle to issue €500bn in common defence bonds over the next five years — the bloc's most significant fiscal step since the Covid recovery fund. The deal came after weeks of German resistance, with Berlin ultimately accepting shared issuance in exchange for strict conditionality on spending targets. Politico sources describe the breakthrough as fragile, contingent on parliamentary ratification in at least four member states before June. The Financial Times notes bond markets reacted positively, with spreads on southern European debt tightening overnight.",
      category: "EU Politics",
      importance: 5,
      sources: ["Politico Brussels Playbook", "Euractiv Reporter", "Financial Times"],
    },
    {
      headline: "ECB cuts rates by 25bp and signals further easing ahead",
      summary:
        "The European Central Bank lowered its deposit facility rate to 1.75%, its fourth cut since September, citing persistent weakness in Eurozone manufacturing and a faster-than-expected decline in services inflation. President Christine Lagarde struck a notably dovish tone in the press conference, dropping previous language about decisions being 'meeting by meeting'. The Economist notes this marks a decisive pivot from the post-pandemic tightening cycle, with markets now pricing a terminal rate of 1.25% by year-end. German 10-year Bund yields fell 12bp on the announcement.",
      category: "Macro & Markets",
      importance: 5,
      sources: ["Financial Times", "The Economist Espresso"],
    },
    {
      headline: "G7 agrees joint export controls on advanced AI chips",
      summary:
        "G7 finance and technology ministers issued a joint communiqué backing coordinated export restrictions on AI accelerator chips above a defined compute threshold. The agreement, reached at a closed-door meeting in Tokyo, is designed to close loopholes that allowed re-export through third countries. The Financial Times reports the controls target chips equivalent to or exceeding Nvidia H100 performance and would cover sales to a list of twenty-two jurisdictions. Implementation timelines remain unresolved, with the US pushing for Q3 enforcement while Japan and South Korea seek a longer transition. The Economist flags significant enforcement challenges.",
      category: "Global Affairs",
      importance: 4,
      sources: ["Financial Times", "The Economist Espresso"],
      crossReference: "See also: Microsoft shelves AI project in Business & Tech section",
    },
    {
      headline: "Parliament and Council reach deal on revised methane regulation",
      summary:
        "After a 14-hour trilogue session, EU negotiators agreed on a revised methane emissions regulation requiring oil and gas operators to measure, report, and verify emissions at well level by 2028. The text includes — for the first time — import standards that will require non-EU suppliers to meet equivalent monitoring requirements, a provision strongly opposed by the US and Gulf producers during negotiations. Euractiv reports the compromise weakened the import standard timeline by two years compared to Parliament's original position. Environmental groups called the result 'a step forward but not fast enough'.",
      category: "Energy & Climate",
      importance: 4,
      sources: ["Euractiv Reporter", "Politico Brussels Playbook"],
    },
    {
      headline: "Microsoft shelves European AI infrastructure project after DMA ruling",
      summary:
        "Microsoft has quietly withdrawn from a €2.1bn European AI infrastructure joint venture following a European Commission ruling that the arrangement would breach Digital Markets Act obligations. The project, announced in late 2025 with three national sovereign wealth funds, would have built dedicated AI training clusters in Germany, France, and Poland. The Financial Times obtained an internal memo indicating Microsoft believes the DMA's interoperability requirements make the economics unworkable. The Commission declined to comment beyond confirming a preliminary finding was issued.",
      category: "Business & Tech",
      importance: 3,
      sources: ["Financial Times"],
      crossReference: "See also: G7 AI chip export controls in Global Affairs section",
    },
  ],
  sections: [
    {
      category: "EU Politics",
      stories: [
        {
          headline: "Hungary blocks new Ukraine aid tranche, triggering Article 7 threat",
          summary:
            "Budapest used its veto in the Council to block disbursement of the latest €3bn Ukraine Facility tranche, accusing Kyiv of failing to meet anti-corruption benchmarks. Five member states responded with a joint letter threatening to invoke Article 7 proceedings against Hungary, a step that could ultimately suspend its voting rights. Politico's Brussels Playbook reports the Commission is exploring qualified majority workarounds for future tranches that would legally exclude Hungary from the vote — a legally contested but politically appealing route.",
          category: "EU Politics",
          importance: 4,
          sources: ["Politico Brussels Playbook", "Euractiv Reporter"],
        },
        {
          headline: "Commission delays digital services tax proposal after US pressure",
          summary:
            "The European Commission has quietly delayed the long-awaited digital services tax legislative proposal by at least two quarters, following intense lobbying from Washington and warnings of retaliatory tariffs. The delay, first reported by Euractiv, contradicts public statements by Commissioner Vestager as recently as March. Politico notes the move has frustrated progressive MEPs who argue the Commission is surrendering competence under trade pressure, while business groups welcomed the pause.",
          category: "EU Politics",
          importance: 3,
          sources: ["Euractiv Reporter", "Politico Brussels Playbook"],
        },
        {
          headline: "Parliament's civil liberties committee approves facial recognition restrictions",
          summary:
            "The European Parliament's LIBE committee voted 42–11 to adopt a report calling for strict limits on real-time facial recognition in public spaces, going further than the AI Act's existing carve-outs for law enforcement. The report, non-binding but politically significant, calls on the Commission to bring forward an amendment by Q1 2027. Several member state governments have already signalled opposition, complicating prospects for a legislative follow-up.",
          category: "EU Politics",
          importance: 2,
          sources: ["Euractiv Reporter"],
        },
      ],
    },
    {
      category: "Macro & Markets",
      stories: [
        {
          headline: "German industrial output falls for fifth consecutive month",
          summary:
            "German factory output declined 1.2% month-on-month in March, the fifth straight contraction and worse than the 0.6% consensus forecast. The Bundesbank attributed the weakness to sustained energy cost disadvantages versus US and Asian competitors, alongside weak Chinese demand for capital goods. The Financial Times notes the figures add pressure on the new coalition government to accelerate its €80bn industrial policy package, whose parliamentary passage remains uncertain after coalition tensions over borrowing rules.",
          category: "Macro & Markets",
          importance: 3,
          sources: ["Financial Times", "The Economist Espresso"],
        },
        {
          headline: "IMF revises Eurozone growth forecast down to 0.8% for 2026",
          summary:
            "The International Monetary Fund cut its 2026 Eurozone growth projection to 0.8% from 1.3% in its January World Economic Outlook update, citing tighter financial conditions, weak external demand, and lingering uncertainty around trade policy. The fund singled out Germany and Italy as particular drags, while noting Spain and Portugal continue to outperform. The report urged the ECB to move quickly on rate cuts and called on fiscal authorities to avoid premature consolidation.",
          category: "Macro & Markets",
          importance: 3,
          sources: ["Financial Times", "The Economist Espresso"],
        },
      ],
    },
    {
      category: "Energy & Climate",
      stories: [
        {
          headline: "EU carbon price hits €97 as compliance deadline approaches",
          summary:
            "EUA carbon allowances touched €97 per tonne on Thursday, the highest level since February, as companies scramble to cover positions ahead of the April 30 compliance deadline. Analysts at BloombergNEF cited a combination of cold weather increasing gas demand and reduced supply from delayed renewables capacity as driving the spike. At current prices, the carbon cost adds roughly €40 per MWh to gas-fired generation, widening the competitiveness gap with wind and solar across most of northwest Europe.",
          category: "Energy & Climate",
          importance: 3,
          sources: ["Financial Times", "Euractiv Reporter"],
        },
        {
          headline: "Norway commits €18bn to North Sea offshore wind by 2030",
          summary:
            "The Norwegian government announced a NOK 200bn (€18bn) commitment to offshore wind capacity in the North Sea, targeting 30GW by 2030 — a threefold increase from current plans. The announcement comes partly in response to EU energy security concerns following Russian gas cutoffs, and includes provisions for undersea cable connections to Germany and the UK. Environmental groups raised concerns over the location of several proposed sites within protected marine areas.",
          category: "Energy & Climate",
          importance: 2,
          sources: ["Financial Times"],
        },
      ],
    },
    {
      category: "Global Affairs",
      stories: [
        {
          headline: "India and EU initial framework trade agreement after decade of talks",
          summary:
            "Indian Prime Minister Modi and Commission President von der Leyen signed a framework agreement in New Delhi covering goods, services, and investment — though not yet a full free trade deal. The framework commits both sides to finalising tariff schedules within 18 months. Key unresolved issues include EU market access for Indian generic pharmaceuticals and Indian concerns over the EU's Carbon Border Adjustment Mechanism. Analysts called it a politically meaningful step that falls short of the comprehensive deal originally envisioned when talks reopened in 2022.",
          category: "Global Affairs",
          importance: 3,
          sources: ["Financial Times", "The Economist Espresso"],
        },
        {
          headline: "China conducts largest Taiwan Strait exercises since 2024",
          summary:
            "China's People's Liberation Army launched multi-day naval and air exercises in the Taiwan Strait, deploying an unprecedented 45 vessels including two carrier groups. Taiwan's defence ministry called the drills 'a serious provocation' and placed forces on heightened alert. The exercises coincide with a US congressional visit to Taipei and come weeks after Washington approved a new arms package. The Economist notes Chinese state media described the drills as a 'regular' exercise, a framing analysts say is intended to normalise the military presence.",
          category: "Global Affairs",
          importance: 4,
          sources: ["The Economist Espresso", "Financial Times"],
        },
      ],
    },
    {
      category: "Business & Tech",
      stories: [
        {
          headline: "OpenAI announces European data residency offering amid regulatory pressure",
          summary:
            "OpenAI launched a European data residency tier for ChatGPT Enterprise, allowing business customers to ensure their data is processed and stored exclusively within the EU. The move follows pressure from several data protection authorities and a formal inquiry by the Irish DPC. The Financial Times reports the offering comes at a 15% price premium and is initially limited to Germany, France, and the Netherlands. Competitors including Anthropic and Google have offered similar residency options since 2025.",
          category: "Business & Tech",
          importance: 2,
          sources: ["Financial Times"],
        },
        {
          headline: "Spotify reports first full quarter of profitability in company history",
          summary:
            "Spotify posted net income of €127m in Q1 2026, its first profitable quarter since going public in 2018, driven by a 22% increase in premium subscriber average revenue and significant cost reductions in its podcast division following 2024 restructuring. Monthly active users grew 14% year-on-year to 810 million. CEO Daniel Ek told analysts the company would now prioritise margin expansion over growth investment, a strategic shift that sent shares up 11% in after-hours trading.",
          category: "Business & Tech",
          importance: 2,
          sources: ["Financial Times", "The Economist Espresso"],
        },
      ],
    },
    {
      category: "Opinion & Analysis",
      stories: [
        {
          headline: "Defence bonds are a historic step — and a test the Commission may fail",
          summary:
            "Politico's Brussels Playbook argues that while last night's defence bond agreement represents a genuine political breakthrough, the Commission's implementation track record on complex fiscal instruments should temper optimism. The piece points to delays and governance failures in the Recovery and Resilience Facility as a cautionary tale, and warns that conditionality mechanisms — the price of German consent — could become a political flashpoint if disbursements are contested. The author concludes the real test will come not at the summit table but in the quiet bureaucratic grind of the months ahead.",
          category: "Opinion & Analysis",
          importance: 3,
          sources: ["Politico Brussels Playbook"],
        },
        {
          headline: "The ECB's pivot carries risks that markets are not pricing",
          summary:
            "The Economist Espresso's daily column argues the ECB's accelerating rate-cut cycle risks underestimating services inflation persistence, particularly in labour-intensive sectors where wage growth remains above 4% in France, Spain, and the Netherlands. The author contends Lagarde's press conference language — implicitly committing to further cuts — has front-loaded expectations in a way that will be costly to unwind if Q2 inflation data surprises to the upside. The piece draws a parallel with the Fed's 2021–22 'transitory' misjudgement.",
          category: "Opinion & Analysis",
          importance: 3,
          sources: ["The Economist Espresso"],
        },
      ],
    },
  ],
};
