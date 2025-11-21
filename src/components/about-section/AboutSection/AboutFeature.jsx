import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AboutFeature({Icon, Title}) {
  return (
    <div className="w-full px-1  md:mb-0 hover:scale-105 transDuration-300">
      <FontAwesomeIcon
        className="text-primary text-4xl"
        icon={Icon}
      />
      <p className="mt-6">{Title}</p>
    </div>
  );
}
export default AboutFeature;
