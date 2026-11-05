const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading1: "font-poppins font-semibold ss:text-[64px] text-[44px] text-white ss:leading-[84px] leading-[58px] w-full",
  heading2: "font-poppins font-semibold xs:text-[48px] text-[36px] text-white xs:leading-[76.8px] leading-[50px] w-full",
  heading3: "font-poppins font-semibold text-white xs:text-[28px] text-[24px] xs:leading-[40px] leading-[34px]",
  heading4: "font-poppins font-semibold text-white text-[18px] leading-[23.4px]",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",
  small: "font-poppins font-normal text-dimWhite text-[14px] leading-[22px]",
  eyebrow: "font-poppins font-medium text-[14px] tracking-[0.18em] uppercase",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  card: "rounded-[20px] bg-black-gradient box-shadow",
  glassCard: "rounded-[20px] glass",
  input:
    "w-full rounded-[10px] bg-surface border border-white/10 px-4 py-3 font-poppins text-[16px] text-white placeholder:text-white/40 outline-none transition focus:border-secondary/70 focus:ring-2 focus:ring-secondary/20 aria-[invalid=true]:border-red-400/70",
  label: "font-poppins font-medium text-[14px] text-white/90 mb-2 block",
  chip: "inline-flex items-center gap-2 rounded-full px-4 py-2 font-poppins text-[14px] transition border",
  chipActive: "bg-blue-gradient text-primary border-transparent",
  chipIdle: "border-white/10 text-dimWhite hover:text-white hover:border-white/30",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
