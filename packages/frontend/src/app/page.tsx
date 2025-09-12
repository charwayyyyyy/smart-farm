import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import WeatherWidget from '@/components/WeatherWidget';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="container mx-auto px-4 mb-8">
          <div className="max-w-sm mx-auto md:ml-auto md:mr-0 mt-4">
            <WeatherWidget location="Accra, Ghana" />
          </div>
        </div>
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </div>
    </Layout>
  );
}
