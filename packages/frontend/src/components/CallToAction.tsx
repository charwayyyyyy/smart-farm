import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="bg-primary dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold leading-tight text-white dark:text-white">
            Start improving your farm today
          </h2>
          <p className="mb-6 font-light text-gray-100 dark:text-gray-400 md:text-lg">
            Join thousands of Ghanaian farmers using SmartFarmGH to increase yields and improve farming practices.
          </p>
          <Link href="/register">
            <button className="text-primary bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-light font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;