import { Link} from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;