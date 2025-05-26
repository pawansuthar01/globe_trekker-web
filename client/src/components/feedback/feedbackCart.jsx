import { Quote, Star } from "lucide-react";

const TestimonialCard = ({ name, email, text, rating }) => {
  return (
    <div className="flex flex-col bg-white/60 rounded-xl border-2 shadow-sm border-teal-300 h-full">
      <div className="relative p-6 flex flex-col justify-between flex-1">
        <Quote className="text-teal-500 w-5 h-5 mb-4 opacity-30 absolute top-4 left-4" />
        <div className="relative z-10 mt-8">
          <p className="text-gray-800 text-lg sm:text-md max-sm:text-sm mt-2 font-medium leading-relaxed mb-2">
            {text}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center mt-4">
            <img
              src={`https://ui-avatars.com/api/?name=${name}&background=4DB6AC&color=fff`}
              alt={name}
              className="h-14 w-14 rounded-full object-cover border-2 border-teal-500"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-gray-600 text-sm">{email}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={`${
                      index < rating ? "text-amber-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
