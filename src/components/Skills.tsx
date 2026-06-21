const primarySkills = [
  {
    name: "Unreal Engine 5",
    years: "2023 - Present",
    image: "/skills/unreal.png",
    sections: [
      {
        title: "Technical Art",
        items: [
          "Materials and Shaders",
          "Procedural Generation",
          "Procedural Animation",
          "Niagara & VFX",
          "Pipeline Tools",
        ],
      },
      {
        title: "Game Development",
        items: [
        "Blueprints",
        "Experience across a variety of game systems",
        "Multiple finished demos/student projects",
        ],
      },
    ],
  },
  {
    name: "Blender",
    years: "2022 - Present",
    image: "/skills/blender.png",
    sections: [
      {
        title: "",
        items: [
          "Hard Surface Modelling",
          "Game-ready assets",
          "Engine asset optimization",
          "UV Unwrapping and Texturing",
          "Procedural Shaders",
        ],
      },
    ],
  },
];

const secondarySkills = [
  {
    name: "Adobe Substance Painter",
    image: "/skills/substance.png",
  },
  {
    name: "C++",
    image: "/skills/cpp.png",
  },
  {
    name: "Python",
    image: "/skills/python.png",
  },
];

export default function Skills() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-3xl font-semibold">Skills</h2>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        {primarySkills.map((skill) => (
          <article
            key={skill.name}
            className="rounded-lg border border-white/10 bg-[#11151a] p-6"
          >
            <div className="flex items-center gap-5">
              <img
                src={skill.image}
                alt={`${skill.name} logo`}
                className="h-20 w-20 rounded-xl object-cover"
              />

              <div>
                <h3 className="text-3xl font-semibold leading-tight">
                  {skill.name}
                </h3>
                <p className="text-xl font-semibold text-zinc-300">
                  {skill.years}
                </p>
              </div>
            </div>

            <div
              className={
                skill.name === "Unreal Engine 5"
                  ? "mt-8 grid gap-8 md:grid-cols-2"
                  : "mt-8"
              }
            >
              {skill.sections.map((section) => (
                <div key={section.title || skill.name}>
                  {section.title && (
                    <h4 className="text-2xl font-semibold leading-tight">
                      {section.title}
                    </h4>
                  )}

                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-lg leading-snug text-zinc-200">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {secondarySkills.map((skill) => (
          <article
            key={skill.name}
            className="flex items-center gap-5 rounded-lg border border-white/10 bg-[#11151a] p-5"
          >
            <img
              src={skill.image}
              alt={`${skill.name} logo`}
              className="h-16 w-16 rounded-xl object-cover"
            />

            <h3 className="text-2xl font-semibold leading-tight">
              {skill.name}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}