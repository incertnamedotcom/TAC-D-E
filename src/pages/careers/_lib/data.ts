export type CareerPath = { 
  slug: string; 
  branch: string; 
  title: string; 
  image: string; 
  description: string; 
  requirements: string[] 
};

export type BranchCard = { 
  slug: string; 
  label: string; 
  href: string;
  logo: string;
};

export const branchCards: BranchCard[] = [
  { 
    slug: "navy", 
    label: "U.S. NAVY", 
    href: "/careers/navy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Emblem_of_the_United_States_Navy.png"
  },
  { 
    slug: "airforce", 
    label: "U.S. AIR FORCE", 
    href: "/careers/airforce",
    logo: "https://i.imgur.com/AVdhzvR.png"
  },
  { 
    slug: "army", 
    label: "U.S. ARMY", 
    href: "/careers/army",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/160th_SOAR_emblem.svg/960px-160th_SOAR_emblem.svg.png"
  },
];