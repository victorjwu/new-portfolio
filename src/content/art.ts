export type Photo = {
  id: string;
  cap: string;
  span: { col: number; row: number };
  real?: string;
  seed?: number;
};

export const PHOTOS: Photo[] = [
  { real: "/assets/photos/kyodo-station.jpg",    cap: "KYODO STATION",    id: "06", span: { col: 8, row: 5 } },
  { real: "/assets/photos/phone-booth.jpg",      cap: "PHONE BOOTH",      id: "05", span: { col: 4, row: 5 } },
  { real: "/assets/photos/sf-bridge.jpg",        cap: "SF BRIDGE",        id: "04", span: { col: 4, row: 5} },
  { real: "/assets/photos/meydenbauer.jpg",      cap: "MEYDENBAUER",      id: "03", span: { col: 8, row: 5 } },
  { real: "/assets/photos/mom-hawaii.jpg",       cap: "HAWAII — MOM",     id: "09", span: { col: 8, row: 5 } },
  { real: "/assets/photos/shinjuku.jpg",         cap: "SHINJUKU",         id: "01", span: { col: 4, row: 5 } },
  { real: "/assets/photos/boston-commons.jpg",   cap: "BOSTON COMMONS",   id: "02", span: { col: 4, row: 5 } },
  { real: "/assets/photos/hawaii-one.jpg",       cap: "HAWAII",           id: "07", span: { col: 8, row: 5 } },



];

export type DesignWork = { year: string; title: string; desc: string };

export const DESIGN_WORK: DesignWork[] = [
  {
    year: "2025",
    title: "Interior Design",
    desc: "TBD",
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
    meta: "Daily life, personal instagram",
    stat: "Personal feed",
    tag: "PERSONAL",
    href: "https://instagram.com/victorjwu",
  },
  {
    platform: "Photography",
    handle: "@vjwuphotos",
    meta: "Photography account, unfortunately not updated",
    stat: "Film only",
    tag: "PHOTO",
    href: "https://instagram.com/vjwuphotos",
  },
  {
    platform: "TikTok",
    handle: "@victorjwu",
    meta: "Interior design and life",
    stat: "Occasional posts",
    tag: "VIDEO",
    href: "https://tiktok.com/victorjwu",
  },
  {
    platform: "YouTube",
    handle: "@victorwu",
    meta: "TBD",
    stat: "In progress",
    tag: "LONG-FORM",
    href: "https://youtube.com",
  },
];
