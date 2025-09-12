const Testimonials = () => {
  const testimonials = [
    {
      name: 'Kwame Mensah',
      role: 'Cocoa Farmer, Western Region',
      quote: 'The SMS calendar reminders have helped me optimize my cocoa farm management. I now get better yields with less effort.',
    },
    {
      name: 'Abena Owusu',
      role: 'Vegetable Farmer, Ashanti Region',
      quote: 'The AI chatbot answered my questions about pest control for my tomato plants. The advice worked perfectly!',
    },
    {
      name: 'Kofi Adu',
      role: 'Rice Farmer, Northern Region',
      quote: 'SmartFarmGH has transformed how I plan my rice planting. The knowledge base has techniques specific to my region.',
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            What Farmers Are Saying
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Hear from farmers across Ghana who have improved their yields with SmartFarmGH.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-background-light rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;