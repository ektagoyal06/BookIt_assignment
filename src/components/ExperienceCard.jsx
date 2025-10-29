import { Link } from "react-router-dom";

const ExperienceCard = ({ exp }) => (
  <div className="rounded-2xl shadow-md overflow-hidden hover:scale-105 transition bg-white">
    <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{exp.title}</h3>
        <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
          {exp.location}
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-3">{exp.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-800">From ₹{exp.price}</p>
        <Link
          to={`/experience/${exp._id}`}
          className="bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-md font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default ExperienceCard;
