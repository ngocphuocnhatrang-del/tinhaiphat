export type Language = "vi" | "en";

export const translations = {
  vi: {
    language: "VI",

    nav: {
      home: "TRANG CHỦ",
      about: "GIỚI THIỆU",
      services: "DỊCH VỤ",
      projects: "DỰ ÁN",
      process: "QUY TRÌNH",
      news: "TIN TỨC",
      contact: "LIÊN HỆ",
    },

    hero: {
      eyebrow: "TÍN HẢI PHÁT CONSTRUCTION",
      line1: "KIẾN TẠO",
      line2: "KHÔNG GIAN",
      line3: "XÂY DỰNG GIÁ TRỊ",
      line4: "BỀN VỮNG",
      description:
        "Chúng tôi kiến tạo nên những công trình bền vững, thẩm mỹ và tối ưu công năng, mang lại giá trị thật cho cuộc sống.",
      quote: "NHẬN BÁO GIÁ",
      projects: "XEM DỰ ÁN",
      experience: "NĂM KINH NGHIỆM",
      completed: "CÔNG TRÌNH HOÀN THÀNH",
      engineers: "KỸ SƯ & KIẾN TRÚC SƯ",
      customers: "KHÁCH HÀNG TIN TƯỞNG",
    },

    services: {
      eyebrow: "TÍN HẢI PHÁT CONSTRUCTION",
      title: "DỊCH VỤ CỦA CHÚNG TÔI",
      description:
        "Cung cấp giải pháp toàn diện từ thiết kế, thi công đến hoàn thiện công trình, đảm bảo chất lượng, tiến độ và giá trị bền vững.",
      detail: "XEM CHI TIẾT",

      items: [
        {
          title: "THIẾT KẾ KIẾN TRÚC",
          description:
            "Thiết kế sáng tạo, tối ưu công năng và chi phí xây dựng.",
        },
        {
          title: "XÂY NHÀ TRỌN GÓI",
          description:
            "Chìa khóa trao tay, đồng hành từ thiết kế đến bàn giao.",
        },
        {
          title: "THI CÔNG PHẦN THÔ",
          description:
            "Thi công đúng kỹ thuật, đảm bảo kết cấu và chất lượng công trình.",
        },
        {
          title: "THI CÔNG HOÀN THIỆN",
          description:
            "Hoàn thiện tỉ mỉ, đúng tiến độ và cam kết chất lượng.",
        },
        {
          title: "CẢI TẠO - SỬA CHỮA",
          description:
            "Nâng cấp không gian sống, tối ưu công năng và giá trị sử dụng.",
        },
        {
          title: "THIẾT KẾ & NỘI THẤT",
          description:
            "Thiết kế và thi công nội thất đồng bộ, sang trọng và tiện nghi.",
        },
      ],
    },
    projects: {
  eyebrow: "CÔNG TRÌNH THỰC TẾ",
  title: "DỰ ÁN TIÊU BIỂU",
  viewProject: "XEM DỰ ÁN",
  viewAll: "XEM TẤT CẢ DỰ ÁN",

  filters: [
    "TẤT CẢ",
    "NHÀ PHỐ",
    "BIỆT THỰ",
    "KHÁCH SẠN",
    "NHÀ HÀNG",
    "NỘI THẤT",
  ],

  items: [
    {
      title: "Nhà phố hiện đại",
      location: "Thủ Đức, TP.HCM",
      type: "Nhà phố",
    },
    {
      title: "Biệt thự sân vườn",
      location: "Bình Chánh, TP.HCM",
      type: "Biệt thự",
    },
    {
      title: "Khách sạn The Light",
      location: "Quận 7, TP.HCM",
      type: "Khách sạn",
    },
    {
      title: "Biệt thự tân cổ điển",
      location: "Nhà Bè, TP.HCM",
      type: "Biệt thự",
    },
  ],
},
process: {
  eyebrow: "QUY TRÌNH CHUYÊN NGHIỆP",
  title: "QUY TRÌNH LÀM VIỆC",
  description:
    "Quy trình triển khai rõ ràng, minh bạch từ khâu tiếp nhận nhu cầu đến khi hoàn thiện và bàn giao công trình.",

  items: [
    {
      title: "TIẾP NHẬN NHU CẦU",
      description:
        "Lắng nghe nhu cầu, ngân sách và mong muốn của khách hàng.",
    },
    {
      title: "KHẢO SÁT HIỆN TRẠNG",
      description:
        "Khảo sát thực tế công trình, đo đạc và đánh giá hiện trạng.",
    },
    {
      title: "THIẾT KẾ PHƯƠNG ÁN",
      description:
        "Đề xuất phương án kiến trúc, công năng và giải pháp phù hợp.",
    },
    {
      title: "BÁO GIÁ CHI TIẾT",
      description:
        "Lập dự toán minh bạch theo từng hạng mục và vật tư.",
    },
    {
      title: "KÝ HỢP ĐỒNG THI CÔNG",
      description:
        "Thống nhất tiến độ, phạm vi công việc và cam kết thực hiện.",
    },
    {
      title: "THI CÔNG XÂY DỰNG",
      description:
        "Triển khai thi công đúng kỹ thuật, tiến độ và tiêu chuẩn.",
    },
    {
      title: "NGHIỆM THU & BÀN GIAO",
      description:
        "Kiểm tra chất lượng, bàn giao công trình và bảo hành.",
    },
  ],
},
costEstimator: {
  eyebrow: "CÔNG CỤ DỰ TOÁN NHANH",
  title: "ƯỚC TÍNH CHI PHÍ XÂY DỰNG",
  description:
    "Nhập thông tin cơ bản để tham khảo chi phí dự kiến cho công trình của bạn.",

  area: "DIỆN TÍCH MỖI TẦNG",
  floors: "SỐ TẦNG",
  package: "GÓI THI CÔNG",

  floorUnit: "tầng",

  packages: {
    rough: "Thi công phần thô",
    standard: "Trọn gói tiêu chuẩn",
    premium: "Trọn gói cao cấp",
  },

  estimatedCost: "CHI PHÍ DỰ KIẾN",
  estimatedArea: "Diện tích xây dựng dự kiến",
  referencePrice: "Đơn giá tham khảo",

  billion: "tỷ",
  million: "triệu",
  currencyUnit: "đ/m²",

  note:
    "* Chi phí trên chỉ mang tính tham khảo. Giá thực tế phụ thuộc vào thiết kế, kết cấu, vật tư, vị trí thi công và điều kiện công trình.",

  quote: "NHẬN BÁO GIÁ CHI TIẾT",
},
about: {
  years: "NĂM KIẾN TẠO GIÁ TRỊ",
  eyebrow: "VỀ CHÚNG TÔI",
  title: "TÍN HẢI PHÁT",
  slogan: "KIẾN TẠO TỪ CHỮ TÍN",

  paragraph1:
    "Tín Hải Phát hoạt động trong lĩnh vực thiết kế và thi công xây dựng, hướng đến những công trình có giá trị bền vững về chất lượng, công năng và thẩm mỹ.",

  paragraph2:
    "Chúng tôi đồng hành cùng khách hàng từ những ý tưởng đầu tiên, khảo sát, thiết kế, lập dự toán đến thi công và bàn giao công trình hoàn thiện.",

  button: "TÌM HIỂU VỀ TÍN HẢI PHÁT",

  strengths: [
    {
      title: "CHẤT LƯỢNG",
      description:
        "Kiểm soát chặt chẽ từ vật tư đến từng hạng mục thi công.",
    },
    {
      title: "MINH BẠCH",
      description:
        "Báo giá rõ ràng, quy trình minh bạch và hạn chế phát sinh.",
    },
    {
      title: "ĐÚNG TIẾN ĐỘ",
      description:
        "Kế hoạch thi công cụ thể và cam kết tiến độ công trình.",
    },
    {
      title: "BẢO HÀNH",
      description:
        "Đồng hành cùng khách hàng sau khi công trình được bàn giao.",
    },
  ],
},
commitments: {
  eyebrow: "GIÁ TRỊ CHÚNG TÔI THEO ĐUỔI",
  title: "CAM KẾT TỪ",
  brand: "TÍN HẢI PHÁT",

  description:
    "Mỗi công trình là một cam kết về chất lượng, tính minh bạch và trách nhiệm lâu dài với khách hàng.",

  items: [
    {
      title: "ĐÚNG VẬT TƯ",
      description:
        "Sử dụng đúng chủng loại, thương hiệu và quy cách vật tư đã thống nhất trong hợp đồng.",
    },
    {
      title: "ĐÚNG KỸ THUẬT",
      description:
        "Thi công theo đúng hồ sơ thiết kế, tiêu chuẩn kỹ thuật và quy trình kiểm soát chất lượng.",
    },
    {
      title: "ĐÚNG TIẾN ĐỘ",
      description:
        "Lập kế hoạch rõ ràng, kiểm soát từng giai đoạn và cam kết tiến độ bàn giao công trình.",
    },
    {
      title: "MINH BẠCH CHI PHÍ",
      description:
        "Báo giá rõ ràng theo từng hạng mục, hạn chế tối đa phát sinh ngoài phạm vi đã thống nhất.",
    },
    {
      title: "BẢO HÀNH CÔNG TRÌNH",
      description:
        "Tiếp tục đồng hành sau bàn giao với chính sách bảo hành và hỗ trợ kỹ thuật rõ ràng.",
    },
  ],

  ctaText:
    "Bạn đang chuẩn bị xây nhà, cải tạo công trình hoặc cần một đơn vị thiết kế và thi công đồng hành từ đầu đến cuối?",

  ctaButton: "NHẬN TƯ VẤN MIỄN PHÍ",
},
board: {
  eyebrow: "ĐỘI NGŨ LÃNH ĐẠO",
  title: "BAN GIÁM ĐỐC",
  description:
    "Đội ngũ lãnh đạo Tín Hải Phát trực tiếp đồng hành, quản lý và chịu trách nhiệm trong từng dự án.",

  positions: {
    executiveDirector: "GIÁM ĐỐC ĐIỀU HÀNH",
    generalDirector: "TỔNG GIÁM ĐỐC",
  },
},
news: {
  eyebrow: "GÓC CHIA SẺ",
  title: "TIN TỨC & KIẾN THỨC XÂY DỰNG",
  description:
    "Cập nhật kiến thức thực tế về thiết kế, thi công, chi phí và kinh nghiệm xây dựng dành cho chủ đầu tư tại TP.HCM.",

  readMore: "XEM BÀI VIẾT",
  viewAll: "XEM TẤT CẢ BÀI VIẾT",

  items: [
    {
      title: "Chi phí xây nhà trọn gói tại TP.HCM gồm những gì?",
      excerpt:
        "Tìm hiểu các yếu tố ảnh hưởng đến đơn giá xây nhà trọn gói tại TP.HCM và cách kiểm soát ngân sách hiệu quả.",
    },
    {
      title: "Xây nhà 2 tầng 100m² cần chuẩn bị ngân sách bao nhiêu?",
      excerpt:
        "Phân tích diện tích xây dựng, phần móng, phần mái, vật tư và mức hoàn thiện để dự toán chi phí sát thực tế.",
    },
    {
      title: "Kinh nghiệm chọn nhà thầu xây dựng uy tín tại TP.HCM",
      excerpt:
        "Những tiêu chí cần kiểm tra trước khi ký hợp đồng nhằm hạn chế phát sinh chi phí, chậm tiến độ và rủi ro thi công.",
    },
    {
      title: "Thi công phần thô và xây nhà trọn gói khác nhau thế nào?",
      excerpt:
        "So sánh phạm vi công việc, vật tư, chi phí và trách nhiệm giữa hai hình thức thi công phổ biến hiện nay.",
    },
  ],
},
contact: {
  eyebrow: "LIÊN HỆ TÍN HẢI PHÁT",
  line1: "BẠN ĐANG CÓ",
  line2: "KẾ HOẠCH XÂY DỰNG?",
  description:
    "Hãy để Tín Hải Phát đồng hành cùng bạn từ bước khảo sát, thiết kế, dự toán đến thi công và bàn giao công trình hoàn thiện.",

  hotline: "HOTLINE",
  email: "EMAIL",
  area: "KHU VỰC HOẠT ĐỘNG",
  areaValue: "TP.HCM và khu vực lân cận",

  freeConsultation: "NHẬN TƯ VẤN MIỄN PHÍ",
  quoteTitle: "GỬI YÊU CẦU BÁO GIÁ",
  quoteDescription:
    "Điền thông tin bên dưới, Tín Hải Phát sẽ liên hệ để tư vấn và khảo sát nhu cầu của bạn.",

  fullName: "HỌ VÀ TÊN",
  fullNamePlaceholder: "Nguyễn Văn A",

  phone: "SỐ ĐIỆN THOẠI",
  phonePlaceholder: "09xx xxx xxx",

  location: "KHU VỰC XÂY DỰNG",
  locationPlaceholder: "TP.HCM",

  need: "NHU CẦU",

  services: [
    "Xây nhà trọn gói",
    "Thiết kế kiến trúc",
    "Thi công phần thô",
    "Thi công hoàn thiện",
    "Cải tạo - sửa chữa",
    "Thiết kế & nội thất",
  ],

  message: "NỘI DUNG CẦN TƯ VẤN",
  messagePlaceholder:
    "Mô tả sơ bộ diện tích, số tầng, nhu cầu và thời gian dự kiến...",

  submit: "GỬI YÊU CẦU TƯ VẤN",

  privacy:
    "* Thông tin của bạn chỉ được sử dụng để liên hệ tư vấn và báo giá.",
},
footer: {
  description:
    "Kiến tạo không gian - xây dựng giá trị bền vững. Đồng hành cùng khách hàng từ thiết kế đến thi công hoàn thiện.",

  quickLinksTitle: "LIÊN KẾT NHANH",
  servicesTitle: "DỊCH VỤ",
  contactTitle: "THÔNG TIN LIÊN HỆ",

  quickLinks: [
    { label: "Trang chủ", href: "#home" },
    { label: "Giới thiệu", href: "#about" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Dự án", href: "#projects" },
    { label: "Quy trình", href: "#process" },
    { label: "Tin tức", href: "#news" },
    { label: "Liên hệ", href: "#contact" },
  ],

  services: [
    "Thiết kế kiến trúc",
    "Xây nhà trọn gói",
    "Thi công phần thô",
    "Thi công hoàn thiện",
    "Cải tạo - sửa chữa",
    "Thiết kế & nội thất",
  ],

  hotline: "HOTLINE",
  email: "EMAIL",
  serviceArea: "KHU VỰC HOẠT ĐỘNG",
  serviceAreaValue: "TP.HCM và khu vực lân cận",

  copyright:
    "© 2026 Tín Hải Phát Construction. All rights reserved.",

  privacy: "CHÍNH SÁCH BẢO MẬT",
  terms: "ĐIỀU KHOẢN SỬ DỤNG",
},
  },

  en: {
    language: "EN",

    nav: {
      home: "HOME",
      about: "ABOUT",
      services: "SERVICES",
      projects: "PROJECTS",
      process: "PROCESS",
      news: "NEWS",
      contact: "CONTACT",
    },

    hero: {
      eyebrow: "TIN HAI PHAT CONSTRUCTION",
      line1: "CREATING",
      line2: "SPACES",
      line3: "BUILDING LASTING",
      line4: "VALUE",
      description:
        "We create durable, aesthetically refined and functional spaces that deliver lasting value for everyday life.",
      quote: "GET A QUOTE",
      projects: "VIEW PROJECTS",
      experience: "YEARS OF EXPERIENCE",
      completed: "COMPLETED PROJECTS",
      engineers: "ENGINEERS & ARCHITECTS",
      customers: "TRUSTED CLIENTS",
    },

    services: {
      eyebrow: "TIN HAI PHAT CONSTRUCTION",
      title: "OUR SERVICES",
      description:
        "Comprehensive solutions from design and construction to project completion, ensuring quality, schedule and lasting value.",
      detail: "VIEW DETAILS",

      items: [
        {
          title: "ARCHITECTURAL DESIGN",
          description:
            "Creative architectural solutions optimized for functionality and construction cost.",
        },
        {
          title: "TURNKEY CONSTRUCTION",
          description:
            "A complete turnkey solution from initial design through final handover.",
        },
        {
          title: "STRUCTURAL CONSTRUCTION",
          description:
            "Professional structural construction with strict technical and quality standards.",
        },
        {
          title: "FINISHING WORKS",
          description:
            "Meticulous finishing delivered on schedule with a strong commitment to quality.",
        },
        {
          title: "RENOVATION & REMODELING",
          description:
            "Transforming existing spaces to improve functionality, comfort and long-term value.",
        },
        {
          title: "INTERIOR DESIGN & BUILD",
          description:
            "Integrated interior design and construction for elegant, functional and comfortable spaces.",
        },
      ],
    },
    projects: {
  eyebrow: "BUILT PROJECTS",
  title: "FEATURED PROJECTS",
  viewProject: "VIEW PROJECT",
  viewAll: "VIEW ALL PROJECTS",

  filters: [
    "ALL",
    "TOWNHOUSES",
    "VILLAS",
    "HOTELS",
    "RESTAURANTS",
    "INTERIORS",
  ],

  items: [
    {
      title: "Modern Townhouse",
      location: "Thu Duc, Ho Chi Minh City",
      type: "Townhouse",
    },
    {
      title: "Garden Villa",
      location: "Binh Chanh, Ho Chi Minh City",
      type: "Villa",
    },
    {
      title: "The Light Hotel",
      location: "District 7, Ho Chi Minh City",
      type: "Hotel",
    },
    {
      title: "Neoclassical Villa",
      location: "Nha Be, Ho Chi Minh City",
      type: "Villa",
    },
  ],
},
process: {
  eyebrow: "PROFESSIONAL PROCESS",
  title: "OUR WORK PROCESS",
  description:
    "A clear and transparent process from initial consultation through construction completion and final handover.",

  items: [
    {
      title: "REQUIREMENT CONSULTATION",
      description:
        "We listen carefully to the client's needs, budget and expectations.",
    },
    {
      title: "SITE SURVEY",
      description:
        "We inspect the site, take measurements and assess existing conditions.",
    },
    {
      title: "DESIGN PROPOSAL",
      description:
        "We develop suitable architectural, functional and technical solutions.",
    },
    {
      title: "DETAILED QUOTATION",
      description:
        "We prepare a transparent cost estimate for each construction item and material.",
    },
    {
      title: "CONSTRUCTION CONTRACT",
      description:
        "We agree on scope, schedule, responsibilities and project commitments.",
    },
    {
      title: "CONSTRUCTION",
      description:
        "We execute the project according to technical, quality and schedule standards.",
    },
    {
      title: "INSPECTION & HANDOVER",
      description:
        "We inspect project quality, complete the handover and provide warranty support.",
    },
  ],
},
costEstimator: {
  eyebrow: "QUICK COST ESTIMATOR",
  title: "CONSTRUCTION COST ESTIMATE",
  description:
    "Enter some basic project information to receive an estimated construction cost.",

  area: "FLOOR AREA",
  floors: "NUMBER OF FLOORS",
  package: "CONSTRUCTION PACKAGE",

  floorUnit: "floor",

  packages: {
    rough: "Structural Construction",
    standard: "Standard Turnkey Package",
    premium: "Premium Turnkey Package",
  },

  estimatedCost: "ESTIMATED COST",
  estimatedArea: "Estimated construction area",
  referencePrice: "Reference unit price",

  billion: "billion VND",
  million: "million VND",
  currencyUnit: "VND/m²",

  note:
    "* This estimate is for reference only. Actual costs depend on design, structural requirements, materials, construction location and site conditions.",

  quote: "GET A DETAILED QUOTE",
},
about: {
  years: "YEARS OF CREATING VALUE",
  eyebrow: "ABOUT US",
  title: "TIN HAI PHAT",
  slogan: "BUILT ON TRUST",

  paragraph1:
    "Tin Hai Phat specializes in architectural design and construction, creating projects that deliver lasting value through quality, functionality and aesthetics.",

  paragraph2:
    "We accompany our clients from the initial concept through site survey, design, cost estimation, construction and final project handover.",

  button: "DISCOVER TIN HAI PHAT",

  strengths: [
    {
      title: "QUALITY",
      description:
        "Strict quality control from materials to every stage of construction.",
    },
    {
      title: "TRANSPARENCY",
      description:
        "Clear quotations, transparent processes and controlled project costs.",
    },
    {
      title: "ON-TIME DELIVERY",
      description:
        "Detailed construction planning with a strong commitment to schedule.",
    },
    {
      title: "WARRANTY",
      description:
        "Ongoing support for our clients after the project has been handed over.",
    },
  ],
},
commitments: {
  eyebrow: "THE VALUES WE STAND FOR",
  title: "OUR COMMITMENT",
  brand: "TIN HAI PHAT",

  description:
    "Every project represents our commitment to quality, transparency and long-term responsibility to our clients.",

  items: [
    {
      title: "SPECIFIED MATERIALS",
      description:
        "We use the exact material types, brands and specifications agreed upon in the contract.",
    },
    {
      title: "TECHNICAL STANDARDS",
      description:
        "Construction follows approved designs, technical standards and strict quality control procedures.",
    },
    {
      title: "ON-TIME DELIVERY",
      description:
        "We maintain a clear construction plan, monitor every stage and commit to the agreed handover schedule.",
    },
    {
      title: "TRANSPARENT COSTS",
      description:
        "Clear quotations for every work item help minimize unexpected costs beyond the agreed scope.",
    },
    {
      title: "PROJECT WARRANTY",
      description:
        "Our support continues after handover through a clear warranty policy and technical assistance.",
    },
  ],

  ctaText:
    "Planning to build a new home, renovate a property or looking for a trusted design and construction partner from start to finish?",

  ctaButton: "GET A FREE CONSULTATION",
},
board: {
  eyebrow: "LEADERSHIP TEAM",
  title: "BOARD OF DIRECTORS",
  description:
    "The leadership team of Tin Hai Phat directly oversees, manages and takes responsibility for every project.",

  positions: {
    executiveDirector: "EXECUTIVE DIRECTOR",
    generalDirector: "GENERAL DIRECTOR",
  },
},
news: {
  eyebrow: "INSIGHTS",
  title: "CONSTRUCTION NEWS & INSIGHTS",
  description:
    "Practical insights on design, construction, costs and building experience for property owners in Ho Chi Minh City.",

  readMore: "READ ARTICLE",
  viewAll: "VIEW ALL ARTICLES",

  items: [
    {
      title: "What is included in turnkey construction costs in Ho Chi Minh City?",
      excerpt:
        "Learn what affects turnkey construction pricing in Ho Chi Minh City and how to manage your budget effectively.",
    },
    {
      title: "How much should you budget for a 100m² two-story house?",
      excerpt:
        "A practical look at floor area, foundation, roofing, materials and finishing levels to estimate construction costs.",
    },
    {
      title: "How to choose a reliable construction contractor in Ho Chi Minh City",
      excerpt:
        "Key criteria to review before signing a contract to reduce unexpected costs, delays and construction risks.",
    },
    {
      title: "Structural construction vs. turnkey construction: what is the difference?",
      excerpt:
        "A comparison of scope, materials, costs and responsibilities between two common construction methods.",
    },
  ],
},
contact: {
  eyebrow: "CONTACT TIN HAI PHAT",
  line1: "PLANNING",
  line2: "A CONSTRUCTION PROJECT?",
  description:
    "Let Tin Hai Phat support you from site survey and design to cost estimation, construction and final project handover.",

  hotline: "HOTLINE",
  email: "EMAIL",
  area: "SERVICE AREA",
  areaValue: "Ho Chi Minh City and surrounding areas",

  freeConsultation: "FREE CONSULTATION",
  quoteTitle: "REQUEST A QUOTATION",
  quoteDescription:
    "Fill in the information below and Tin Hai Phat will contact you to discuss your needs and arrange a consultation.",

  fullName: "FULL NAME",
  fullNamePlaceholder: "Your full name",

  phone: "PHONE NUMBER",
  phonePlaceholder: "Your phone number",

  location: "CONSTRUCTION LOCATION",
  locationPlaceholder: "Ho Chi Minh City",

  need: "SERVICE REQUIRED",

  services: [
    "Turnkey Construction",
    "Architectural Design",
    "Structural Construction",
    "Finishing Works",
    "Renovation & Remodeling",
    "Interior Design & Build",
  ],

  message: "PROJECT DETAILS",
  messagePlaceholder:
    "Briefly describe the area, number of floors, requirements and expected timeline...",

  submit: "SEND CONSULTATION REQUEST",

  privacy:
    "* Your information will only be used for consultation and quotation purposes.",
},
footer: {
  description:
    "Creating spaces and building lasting value. Supporting our clients from design through complete construction delivery.",

  quickLinksTitle: "QUICK LINKS",
  servicesTitle: "SERVICES",
  contactTitle: "CONTACT INFORMATION",

  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "News", href: "#news" },
    { label: "Contact", href: "#contact" },
  ],

  services: [
    "Architectural Design",
    "Turnkey Construction",
    "Structural Construction",
    "Finishing Works",
    "Renovation & Remodeling",
    "Interior Design & Build",
  ],

  hotline: "HOTLINE",
  email: "EMAIL",
  serviceArea: "SERVICE AREA",
  serviceAreaValue: "Ho Chi Minh City and surrounding areas",

  copyright:
    "© 2026 Tin Hai Phat Construction. All rights reserved.",

  privacy: "PRIVACY POLICY",
  terms: "TERMS OF USE",
},
  },
} as const;