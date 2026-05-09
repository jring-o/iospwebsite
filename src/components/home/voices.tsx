const VOICES: Array<{ q: string; nm: string; aff: string }> = [
  {
    q: "It felt like we started a movement! This event incorporated stakeholders and put us in a better position to build the next system for science and publishing that deliberately incorporates their needs and our values.",
    nm: "Matthew Akamatsu",
    aff: "UW Discourse Graphs",
  },
  {
    q: "Got out of my house and met people; great conversations; lots of creative spitballing; met with some potential funders; made new friends; made some progress on some ideas; had the opportunity to make first pitch for new project.",
    nm: "Laure Haak",
    aff: "Mighty Red Barn",
  },
  {
    q: "Great discussions and valuable connections that would be really hard to have in traditional academic conferences.",
    nm: "Ronen Tamari",
    aff: "Cosmik · Astera Fellow",
  },
  {
    q: "I gained exposure to future technologies, while meeting people who want to change the world of science.",
    nm: "Franck Marchis",
    aff: "SETI Institute",
  },
  {
    q: "Amazing intro to science / research world as someone not deeply in this space. Learned high-level concepts and low-level technical frameworks. As a contractor working in open source, decentralized technologies, there is simply nothing more valuable than a conference like this.",
    nm: "Paul Weidner",
    aff: "Technologist",
  },
  {
    q: "I was exposed to novel technologically based efforts to support open science needs that I was not previously aware of. It was thought provoking and a great networking opportunity.",
    nm: "Doug Schuster",
    aff: "NSF NCAR",
  },
  {
    q: "Contact with developers and representatives of OS projects. A lot of learning about the tools, projects developed and under development. Possibility to participate in new initiatives. Debates about challenges and the future.",
    nm: "Edilson Damasio",
    aff: "Univ. Estadual de Maringá",
  },
  {
    q: "I had the chance to meet and connect with interesting people and learn about exciting initiatives.",
    nm: "Isabel Abedrapo",
    aff: "Remolino",
  },
  {
    q: "Expert opinion across a range of relevant topics including challenges research libraries face when sharing data and very useful guidelines to keep in mind when rolling out new research technologies.",
    nm: "Martin Karlsson",
    aff: "Coordination Network",
  },
  {
    q: "I met some great people with whom I hope to collaborate in the future.",
    nm: "Daniela Saderi",
    aff: "PREreview",
  },
  {
    q: "The connections to others and the chance to have conversations were great.",
    nm: "Beth Duckles",
    aff: "Organizational Mycology",
  },
];

export function Voices() {
  return (
    <section
      className="s voices"
      id="voices"
      data-screen-label="08 In Their Own Words"
    >
      <div className="wrap">
        <div className="s-head">
          <div className="meta">
            <div className="kicker">Letters page</div>
          </div>
          <div>
            <h2>In their own words</h2>
            <p className="dek">What participants said after IOSP 2025.</p>
          </div>
        </div>

        <ol>
          {VOICES.map((v) => (
            <li key={v.nm + v.q.slice(0, 24)}>
              <p className="q">{v.q}</p>
              <div className="by">
                <span className="nm">{v.nm}</span>
                <br />
                {v.aff}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
