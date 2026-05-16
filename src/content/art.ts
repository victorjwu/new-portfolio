export type Photo = {
  id: string;
  cap: string;
  span: { col: number; row: number };
  real?: string;
  seed?: number;
};

export const PHOTOS: Photo[] = [
  { real: "/assets/kyodo-station.jpg", cap: "KYODO    07/24", id: "01", span: { col: 7, row: 5 } },
  { seed: 1, cap: "YANAKA   04/24", id: "02", span: { col: 5, row: 5 } },
  { seed: 2, cap: "NAKAMEGURO 04/24", id: "03", span: { col: 4, row: 4 } },
  { seed: 3, cap: "KOENJI   04/24", id: "04", span: { col: 4, row: 4 } },
  { seed: 4, cap: "KICHIJOJI 04/24", id: "05", span: { col: 4, row: 4 } },
  { seed: 5, cap: "KYOTO    05/24", id: "06", span: { col: 7, row: 5 } },
  { seed: 6, cap: "ARASHIYAMA 05/24", id: "07", span: { col: 5, row: 5 } },
  { seed: 7, cap: "OSAKA    05/24", id: "08", span: { col: 5, row: 4 } },
  { seed: 8, cap: "TERAMACHI 05/24", id: "09", span: { col: 7, row: 4 } },
];

export type DesignWork = { year: string; title: string; desc: string };

export const DESIGN_WORK: DesignWork[] = [
  {
    year: "2025",
    title: "mise — visual system",
    desc: "Type, color, and motion grammar for a quiet restaurant recommendation engine.",
  },
  {
    year: "2024",
    title: "Field Notes vol. 1",
    desc: "Editorial zine on patience and software. Riso-printed in two colors.",
  },
  {
    year: "2024",
    title: "Junior Design — identity",
    desc: "Marks and signage for Georgia Tech's senior capstone showcase.",
  },
  {
    year: "2023",
    title: "Kissaten — type study",
    desc: "A specimen for a custom display face inspired by tearoom signage.",
  },
];

export type Social = {
  platform: string;
  handle: string;
  meta: string;
  stat: string;
  tag: string;
  href: string;
};

export const SOCIALS: Social[] = [
  {
    platform: "Instagram",
    handle: "@victorjwu",
    meta: "Daily life, mostly streets and meals.",
    stat: "Personal feed",
    tag: "PERSONAL",
    href: "https://instagram.com/victorjwu",
  },
  {
    platform: "Photography",
    handle: "@victorwu.film",
    meta: "35mm + medium format, Japan series.",
    stat: "Film only",
    tag: "PHOTO",
    href: "https://instagram.com",
  },
  {
    platform: "TikTok",
    handle: "@victorjwu",
    meta: "Behind the scenes, prints, process.",
    stat: "Occasional posts",
    tag: "VIDEO",
    href: "https://tiktok.com",
  },
  {
    platform: "YouTube",
    handle: "@victorwu",
    meta: "Long-form essays on craft & travel.",
    stat: "In progress",
    tag: "LONG-FORM",
    href: "https://youtube.com",
  },
];
