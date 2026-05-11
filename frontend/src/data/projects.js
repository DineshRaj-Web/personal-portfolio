export const projects = [
    {
        id: 1,
        title: "Shopify App Developer – OTP Authentication System",
        category: "Full-Stack Development",
        problem: "Many Shopify stores require a secure and reliable OTP-based authentication system to verify users during login or sensitive actions such as checkout or account updates. Default authentication methods may not fully support customizable OTP verification workflows tailored to merchant requirements.",
        solution: "Built a custom Shopify app that implements secure OTP (One-Time Password) authentication. The application generates, sends, and validates OTPs while integrating seamlessly with Shopify stores. Merchants can configure authentication settings through a clean and intuitive admin interface.",
        outcome: "Strengthened store security with OTP-based verification, reduced unauthorized login attempts, delivered a scalable and reusable authentication solution, and improved merchant control and user trust.",
        tech: ["React Router 7", "Remix", "Prisma ORM", "PostgreSQL", "Shopify Polaris", "Shopify Admin API"],
        link: "https://zoketoapps.com/en",
        color: "from-cyan-500 to-blue-500"
    },
    {
        id: 2,
        title: "Backend Developer – REST API Development Using Strapi",
        category: "Backend Development",
        problem: "Modern web applications require a scalable and flexible backend to manage dynamic content, user data, and business logic. Building APIs from scratch can be time-consuming and difficult to maintain without a structured CMS-based backend solution.",
        solution: "Developed a RESTful API using Strapi as a headless CMS to manage content and application data efficiently. Designed structured content models, implemented secure authentication and role-based access control, and integrated the API with a React frontend for dynamic data rendering.",
        outcome: "Delivered a scalable and maintainable backend system, Enabled efficient content management through an admin dashboard, Reduced development time using Strapi’s built-in API generation, Improved frontend performance with optimized REST endpoints",
        tech: ["React JS", "Strapi", "MySQL"],
        link: "https://www.tropicaisland.com/",
        color: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        title: "Full-Stack Developer – Personal Portfolio Website",
        category: "Full-Stack Development",
        problem: "As a developer, I needed a professional online presence to showcase my projects, technical skills, and experience in a structured and modern way. Traditional resume formats do not effectively demonstrate real-world development capabilities or interactive UI skills.",
        solution: "Built a responsive and modern portfolio website using React JS with smooth animations powered by Motion. The frontend highlights projects, skills, and experience in a clean UI. Backend integration using Strapi API and MySQL is being implemented to manage dynamic content.",
        outcome: "Established a strong personal brand and professional online presence, Showcased full-stack capabilities with scalable architecture, Improved UI/UX skills through animation and responsive design, Built a foundation for dynamic content management",
        tech: ["React JS", "Motion", "Strapi API", "MySQL"],
        link: "https://dinesh-dev.vercel.app/",
        color: "from-green-400 to-emerald-600"
    },
    {
        id: 4,
        title: "Full-Stack Developer – Sri Ramakrishna Institutions Website Support",
        category: "Full-Stack Development",
        problem: "The Sri Ramakrishna group of institutions manages multiple educational websites that required regular content updates, UI improvements, and technical fixes to ensure consistency and performance across all platforms.",
        solution: "Handled full website modifications including layout changes, page restructuring, and backend content management. Ensured consistent branding and improved user experience across multiple institutional live production websites.",
        outcome: "Improved website structure and user navigation, Ensured consistent branding across all institutional sites, Enhanced performance and content accuracy, Maintained and updated multiple live production websites",
        tech: ["Frontend Development", "Backend Optimization", "UI/UX Design", "Content Management"],
        link: "/",
        institutions: [
            { name: "Sri Ramakrishna (Main Website)", url: "https://sriramakrishna.com/" },
            { name: "SREC (Engineering College)", url: "https://srec.ac.in" },
            { name: "SRIT (Institute of Technology)", url: "https://srit.org" },
            { name: "SRCAS (College of Arts and Science)", url: "https://srcas.ac.in" },
            { name: "SRCASW (Arts and Science for Women)", url: "https://srcasw.ac.in" },
            { name: "SRDCH (Dental College and Hospital)", url: "https://srdch.ac.in" },
            { name: "SRIPSCP (College of Pharmacy)", url: "https://sripscp.ac.in" },
            { name: "SRIPMSCN (College of Nursing)", url: "https://sripmscn.ac.in" },
            { name: "SRIPMSCP (College of Physiotherapy)", url: "https://sripmscp.ac.in" },
            { name: "SRPTC (Polytechnic College)", url: "https://srptc.ac.in" },
            { name: "SRATI (Advanced Training Institute)", url: "https://srati.org" },
            { name: "SRMHSS (Avarampalayam)", url: "https://srmhssavp.org" },
            { name: "SRMHSS (Vattamalaipalayam)", url: "https://srmhssvmp.org" },
            { name: "SRCS (Central School)", url: "https://srcs.ac.in" },
            { name: "SRHIAHS (Allied Health Sciences)", url: "https://srhiahscbe.org" }
        ],
        color: "from-orange-400 to-red-500"
    },
];
