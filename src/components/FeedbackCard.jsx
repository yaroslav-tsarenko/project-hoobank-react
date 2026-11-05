import { quotes } from "../assets";

const FeedbackCard = ({ content, name, title, img }) => (
  <figure className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
    <img src={quotes} alt="" loading="lazy" className="w-[42.6px] h-[27.6px] object-contain" />
    <blockquote className="font-poppins font-normal text-[18px] leading-[32.4px] text-white my-10">{content}</blockquote>

    <figcaption className="flex flex-row">
      <img src={img} alt="" loading="lazy" width="48" height="48" className="w-[48px] h-[48px] rounded-full" />
      <div className="flex flex-col ml-4">
        <p className="font-poppins font-semibold text-[20px] leading-[32px] text-white">{name}</p>
        <p className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite">{title}</p>
      </div>
    </figcaption>
  </figure>
);

export default FeedbackCard;
