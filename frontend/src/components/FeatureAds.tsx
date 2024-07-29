import FeatureAdIcon1 from "./svgs/FeatureAdIcon1";
import FeatureAdIcon2 from "./svgs/FeatureAdIcon2";
import FeatureAdIcon3 from "./svgs/FeatureAdIcon3";

const features = [
  {
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    img: <FeatureAdIcon1 />,
  },
  {
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    img: <FeatureAdIcon2 />,
  },
  {
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    img: <FeatureAdIcon3 />,
  },
];

export default function FeatureAds() {
  return (
    <ul className="flex flex-row gap-4">
      {features.map((feature, index) => (
        <li key={index}>
          <div className="flex gap-3 justify-center items-center bg-white p-4 rounded-lg border border-[#F4F4F4]">
            {feature.img}
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-xs 2xl:text-sm">{feature.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
