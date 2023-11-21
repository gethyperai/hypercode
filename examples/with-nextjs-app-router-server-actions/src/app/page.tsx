import HyperQuery from '@/components/hyper-query';

const Home = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="shadow-lg rounded-md px-6 py-4 border max-w-md mx-4">
        <h1 className="text-2xl font-semibold">
          Hypercode demo with Next.js app router and server actions
        </h1>

        <p className="mt-4 text-lg">
          Type a query in the search bar and press enter to get result of
          &quot;string&quot; type
        </p>

        <HyperQuery />
      </div>
    </main>
  );
};

export default Home;
