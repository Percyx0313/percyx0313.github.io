export const personalInfo = {
  name: "KENG-WEI CHANG",
  location: "Hsinchu, Taiwan",
  email: "percyx987654321@gapp.nthu.edu.tw",
  phone: "+886-984-258519",
  github: "https://github.com/Percyx0313",
  linkedin: "https://www.linkedin.com/in/%E8%80%95%E7%B6%AD-%E5%BC%B5-841063260/", 
};

export const workExperience = [
  {
    company: "Mediatek Inc.",
    location: "Hsinchu, Taiwan",
    position: "AI Algorithm Developer, AI algorithm develop Group(CAI2)",
    period: "09/2024 - Present",
    achievements: [
      "Deployed and optimized AI algorithms for edge devices",
      "Integrated AI algorithms into end-to-end systems",
    ],
  },
  {
    company: "Mediatek Inc.",
    location: "Hsinchu, Taiwan",
    position: "Software Engineering Intern, AI algorithm develop Group(CAI2)",
    period: "07/2023 - 09/2023",
    achievements: [
      "Research running NeRF (Neural radiance field) on MediaTek's smartphones",
    ],
  },
  {
    company: "Champtek, Inc.",
    location: "Hsinchu, Taiwan",
    position: "Software Engineering Intern, Computer Vision Algorithm Development Group",
    period: "07/2022 - 09/2022",
    achievements: [
      "Developed a OCR software on machine-readable passport (MRP) that conforms to the ICAO 9303 standard using C++",
    ],
  },
  {
    company: "Champtek, Inc.",
    location: "Hsinchu, Taiwan",
    position: "Software Engineering Intern, Computer Vision Algorithm Development Group",
    period: "07/2020 - 09/2020",
    achievements: [
      "Developed a QR code scanning software that conforms to the ISO/IEC 18004 standard using C++",
    ],
  },
];

export const education = [
  {
    institution: "National Tsing Hua University",
    location: "Hsinchu, Taiwan",
    degree: "Master's, Computer Science",
    period: "09/2022 - Present",
    achievements: [
      "Related Courses: Computer Vision (rank: 1/56, T: 57.26), Computer Graphics (rank: 1/147, T: 52.11)",
    ],
  },
  {
    institution: "National Tsing Hua University",
    location: "Hsinchu, Taiwan",
    degree: "Bachelor's, Mathematics",
    period: "09/2018 - 06/2022",
    achievements: [
      "Honored with the Academic Excellence Award during senior year of college",
      "Related Courses: Numerical Analysis (rank: 1/55, T: 68.77), Python (rank: 1/159, T: 59.22)",
    ],
  },
];

export const researchExperience = [
  {
    institution: "Computer Vision Lab, National Tsing Hua University",
    location: "Hsinchu, Taiwan",
    position: "First Author",
    advisor: "Prof. Shang-Hong Lai",
    period: "06/2024 - 08/2024",
    topic: "KeyGS: A Keyframe-Centric Gaussian Splatting Method For Monocular Image Sequences",
    achievements: [
      "Developed a stable and efficient coarse-to-fine frequency-aware densification technique with theoretical analysis for 3DGS, enabling joint refinement of camera poses and 3D reconstruction",
      "Enhanced the average PSNR 3 dB on both the TNT and CO3Dv2 datasets compared to state-of-the-art methods",
      "Accepted by AAAI 2025",
    ],
  },
  {
    institution: "Computer Vision Lab, National Tsing Hua University",
    location: "Hsinchu, Taiwan",
    position: "Second Author",
    advisor: "Prof. Shang-Hong Lai",
    period: "12/2022 - 06/2023",
    topic: "Fairness-aware Kinship Verification",
    achievements: [
      "Proposed a novel loss function that can be aware of the fairness of different classes in data",
      "Developed a cross-attention module that enhances the model's performance by focusing on facial features",
      "Achieved 7% accuracy improvement compared to the SOTA method in the RFIW dataset",
      "Improved the standard deviation from 2.43 to 0.27 compared to the SOTA method in the RFIW dataset",
      "Accepted by BMVC 2023",
    ],
  },
];

export const teachingExperience = [
  {
    institution: "National Tsing Hua University",
    position: "Teaching Assistant, Course: Introduction to Multimedia",
    instructor: "Prof. Shang-Hong Lai",
    period: "02/2024 - 06/2024",
  },
  {
    institution: "National Tsing Hua University",
    position: "Teaching Assistant, Course: Computer Vision",
    instructor: "Prof. Shang-Hong Lai",
    period: "02/2023 - 06/2023",
  },
  {
    institution: "National Tsing Hua University",
    position: "Teaching Assistant, Course: Python",
    instructor: "Prof. Pai-Hsiang Chou",
    period: "02/2022 - 06/2023",
  },
  {
    institution: "National Tsing Hua University",
    position: "Teaching Assistant, Course: Calculus",
    instructor: "Prof. Jiun-Cheng Chen",
    period: "02/2022 - 06/2022",
  },
];

export const skills = {
  programmingLanguages: [
    "Python",
    "C/C++",
    "Matlab",
    "R",
    "CUDA",
  ],
  technologies: [
    "Unix/Linux",
    "Anaconda",
    "Git",
    "Latex",
    "Docker",
  ],
  specializations: [
    "Computer Vision",
    "Machine Learning",
    "Neural Radiance Fields (NeRF)",
    "3D Gaussian Splatting",
    "OCR Systems",
    "Image Processing",
  ],
};

export const projects = [
  {
    title: "KeyGS: A Keyframe-Centric Gaussian Splatting Method",
    description: [
      "Developed a stable and efficient coarse-to-fine frequency-aware densification technique for 3D Gaussian Splatting",
      "Enabled joint refinement of camera poses and 3D reconstruction with theoretical analysis",
      "Enhanced average PSNR by 3 dB on TNT and CO3Dv2 datasets compared to SOTA methods",
      "Accepted by AAAI 2025 as first author"
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["Python", "PyTorch", "3D Computer Vision", "Neural Rendering"],
    type: "research"
  },
  {
    title: "Fairness-aware Kinship Verification",
    description: [
      "Proposed a novel fairness-aware loss function for kinship verification across different demographic groups",
      "Developed a cross-attention module to enhance model performance on facial features",
      "Achieved 7% accuracy improvement compared to SOTA method on RFIW dataset",
      "Improved fairness metrics with standard deviation from 2.43 to 0.27",
      "Accepted by BMVC 2023 as second author"
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["Python", "PyTorch", "Computer Vision", "Fairness AI"],
    type: "research"
  },
  {
    title: "Machine-Readable Passport OCR System",
    description: [
      "Developed OCR software for machine-readable passports conforming to ICAO 9303 standard",
      "Implemented using C++ with high accuracy text recognition and data extraction",
      "Industrial project completed during internship at Champtek Inc.",
      "Handled complex passport layouts and international character sets"
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["C++", "OCR", "Image Processing", "Computer Vision"],
    type: "industry"
  },
  {
    title: "QR Code Scanning Software",
    description: [
      "Built QR code scanning software conforming to ISO/IEC 18004 standard",
      "Implemented in C++ with robust error correction and detection algorithms",
      "Optimized for real-time performance and various lighting conditions",
      "Completed during internship at Champtek Inc."
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["C++", "Computer Vision", "Image Processing", "Algorithm Design"],
    type: "industry"
  },
  {
    title: "Image Stitching with Deep Learning",
    description: [
      "Developed attention mechanism for U-Net to improve image fusion quality",
      "Created novel data augmentation scheme to extract important image features",
      "Achieved 2nd place in Computer Vision Competition",
      "Outperformed state-of-the-art methods in image stitching benchmarks"
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["Python", "PyTorch", "Deep Learning", "Computer Vision"],
    type: "competition"
  },
  {
    title: "Neural Radiance Fields on Mobile Devices",
    description: [
      "Researched and optimized NeRF implementation for MediaTek smartphones",
      "Developed efficient rendering pipeline for mobile GPU constraints",
      "Achieved real-time performance on edge devices",
      "Internship project at MediaTek Inc."
    ],
    github: "https://github.com/Percyx0313", // Update with actual repo if available
    tech: ["Python", "CUDA", "Mobile Computing", "Neural Rendering"],
    type: "research"
  }
];

export const awards = [
  {
    name: "Computer Vision Competition",
    issuer: "Prof. Shang-Hong Lai and NOVATEK",
    date: "N/A",
    type: "Competition",
    position: "2nd Place",
    description: "Image stitching by Deep Learning. Developed an attention mechanism to make U-Net fuse images better than the SOTA method. Developed a data augmentation scheme to get more important features in images.",
  },
];

export const certificates = [
  {
    name: "Computer Vision Competition",
    issuer: "Prof. Shang-Hong Lai and NOVATEK",
    topic: "Image stitching by Deep Learning",
    rank: "2nd",
    achievements: [
      "Developed an attention mechanism to make U-Net fuse images better than the SOTA method",
      "Developed a data augmentation scheme to get more important features in images",
    ],
  },
];
