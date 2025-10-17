export default function ProjectCard({ image, index }) {
  return (
    <div className="">
      <img src={image} alt={`Project slide ${index}`} className="" />
    </div>
  );
}
