import { useFormStatus } from 'react-dom';

const FormContent = () => {
  const { pending } = useFormStatus();

  return (
    <fieldset
      disabled={pending}
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
        disabled={false}
        className={`text-white rounded-md w-fit px-6 py-1 mt-4 ${
          pending ? 'bg-blue-400' : 'bg-blue-600'
        }`}
      >
        {pending ? 'Loading...' : 'Submit'}
      </button>
    </fieldset>
  );
};

export default FormContent;
