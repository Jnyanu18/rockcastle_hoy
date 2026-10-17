import Section from "./Section";
import { CameraDrawing } from "./Drawings";
import StageDrawing from "./StageDrawing";
import ReelCard from "./ReelCard";
export { default as StoriesSection } from "./StoriesSection";
import "./figma.css";

const reels = [
  { kind: "Brand Activation", title: "MG Motor | EV Activation", img: "/rx/service-07-1.jpg" },
  { kind: "Experience", title: "Diablo | Full Cut", img: "/rx/service-07-2.jpg" },
  { kind: "Play Mode", title: "Dave & Buster's | Social Cut", img: "/rx/service-07-3.jpg" },
  { kind: "From the Maker", title: "Optimist | Founder Story", img: "/rx/service-07-4.jpg" },
  { kind: "Food Stories", title: "Daawat Rice | Brand Story", img: "/rx/service-06-1.jpg" },
];

export function WhoWeAre() {
  return (
    <Section id="about" className="rcf-who">
      <span className="rcf-eyebrow">Who we are ?<i /></span>
      <span className="rcf-index">[ 01 ]</span>
      <div className="rcf-who__body">
        <h2>We turn ideas<br />into experiences.</h2>
        <p className="rcf-who__lead">
          Rock Castle Entertainment is an integrated experiential agency transforming ideas into
          meaningful, memorable experiences. From strategy and creative thinking to design,
          production and on-ground execution, we bring brands to life through events, activations,
          exhibitions and immersive experiences. Driven by creativity and backed by execution
          expertise, we create experiences that connect people, spark conversations and leave a
          lasting impact.
        </p>
        <p className="rcf-who__sub">
          Big ideas deserve more than execution.<br />Let&rsquo;s turn yours into an experience. →
        </p>
        <a href="#contact" className="rcf-btn" data-magnetic>Read more <span aria-hidden>↗</span></a>
      </div>
      <StageDrawing className="rcf-who__art" />
    </Section>
  );
}

export function StoriesAndInsta() {
  return (
    <>
      <Section id="insta-feed" className="rcf-stories">
        <span className="rcf-insta__dots" aria-hidden><i /><i /><i /><i /></span>
        <h2 className="rcf-insta__title">
          insta feed <CameraDrawing className="rcf-insta__art" />
        </h2>
        <ul className="rcf-reels">
          {reels.map((r) => (
            <ReelCard key={r.title} kind={r.kind} title={r.title} img={r.img} />
          ))}
        </ul>
      </Section>
    </>
  );
}
