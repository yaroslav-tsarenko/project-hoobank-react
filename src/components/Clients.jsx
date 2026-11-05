import { clients } from "../constants";
import Marquee from "./ui/Marquee";

const Clients = () => (
  <section aria-label="Trusted by" className="my-8">
    <p className="font-poppins text-center text-[14px] tracking-[0.18em] uppercase text-dimWhite mb-6">
      Trusted by teams at
    </p>
    <Marquee duration={26}>
      {[...clients, ...clients].map((client, i) => (
        <img
          key={`${client.id}-${i}`}
          src={client.logo}
          alt={i < clients.length ? client.name : ""}
          loading="lazy"
          className="sm:w-[192px] w-[120px] object-contain opacity-70 hover:opacity-100 transition"
        />
      ))}
    </Marquee>
  </section>
);

export default Clients;
