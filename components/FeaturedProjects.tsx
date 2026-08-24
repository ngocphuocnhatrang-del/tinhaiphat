const projects = [
  {
    title: "Nhà phố hiện đại",
    location: "Nha Trang, Khánh Hòa",
    type: "Nhà phố",
    image: "/images/project-1.jpg",
  },
  {
    title: "Biệt thự sân vườn",
    location: "Diên Khánh, Khánh Hòa",
    type: "Biệt thự",
    image: "/images/project-2.jpg",
  },
  {
    title: "Khách sạn The Light",
    location: "Nha Trang, Khánh Hòa",
    type: "Khách sạn",
    image: "/images/project-3.jpg",
  },
  {
    title: "Biệt thự tân cổ điển",
    location: "Cam Lâm, Khánh Hòa",
    type: "Biệt thự",
    image: "/images/project-4.jpg",
  },
];

const filters = [
  "TẤT CẢ",
  "NHÀ PHỐ",
  "BIỆT THỰ",
  "KHÁCH SẠN",
  "NHÀ HÀNG",
  "NỘI THẤT",
];

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="bg-[#0b1118] px-5 py-20 text-white lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.3em] text-[#d7a53a]">
            Công trình thực tế
          </p>

          <h2 className="text-3xl font-extrabold uppercase md:text-4xl">
            Dự án tiêu biểu
          </h2>

          <div className="mx-auto mt-5 h-[3px] w-14 bg-[#d7a53a]" />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.06em] transition ${
                index === 0
                  ? "bg-[#d7a53a] text-[#0b1118]"
                  : "border border-white/15 text-white/70 hover:border-[#d7a53a] hover:text-[#d7a53a]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden border border-white/10 bg-[#111922]"
            >
              <div className="relative h-[330px] overflow-hidden bg-[#1b2530]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 bg-[#d7a53a] px-3 py-1.5 text-[10px] font-bold uppercase text-[#0b1118]">
                  {project.type}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-[17px] font-extrabold">
                  {project.title}
                </h3>

                <p className="mt-2 text-[13px] text-white/55">
                  {project.location}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#d7a53a]"
                >
                  Xem dự án →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-[#d7a53a] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.05em] text-[#d7a53a] transition hover:bg-[#d7a53a] hover:text-[#0b1118]"
          >
            Xem tất cả dự án →
          </a>
        </div>
      </div>
    </section>
  );
}