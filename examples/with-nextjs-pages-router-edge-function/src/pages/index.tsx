import Head from 'next/head';
import { useState, type FormEvent } from 'react';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const query = new FormData(e.currentTarget).get('query');
    e.currentTarget.reset();

    try {
      const res = await fetch('/api/hyper', {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await res.json();

      setResult(data);
    } catch (error) {
      console.error(error);
      setResult('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Hypercode demo with Next.js pages router with Edge function
        </title>
      </Head>

      <main className="min-h-screen flex justify-center items-center">
        <div className="shadow-lg rounded-md px-6 py-4 border max-w-md mx-4">
          <h1 className="text-2xl font-semibold">
            Hypercode demo with Next.js pages router with Edge function
          </h1>

          <p className="mt-4 text-lg">
            Type a query in the search bar and press enter to get result of
            &quot;string&quot; type
          </p>

          <form onSubmit={handleSubmit}>
            <fieldset
              disabled={isLoading}
              className="flex flex-col justify-start gap-2 mt-6 group"
            >
              <label htmlFor="query">Query</label>

              <input
                type="text"
                id="query"
                name="query"
                className="ring-2 ring-gray-600 border-gray-600 rounded-md px-2 py-1"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white rounded-md w-fit px-6 py-1 mt-4"
              >
                Search
              </button>
            </fieldset>
          </form>

          {isLoading && <p className="mt-4">Loading...</p>}

          {result && !isLoading && (
            <div className="mt-4">
              <p className="font-semibold">Result:</p>
              <p>{result}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
