import Section from "./Section";
import StageLineAnimation from "./StageLineAnimation";
import DotPattern from "@/components/ui/DotPattern";
import "./figma.css";

export function WhoWeAre() {
  return (
    <Section id="about" className="rcf-who">
      <DotPattern variant="peach" />
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
      <StageLineAnimation />
    </Section>
  );
}