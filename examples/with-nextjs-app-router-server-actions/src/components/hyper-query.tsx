'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { getHyperString } from '@/actions/hyper';
import FormContent from './form-content';

const HyperQuery = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(getHyperString, {
    data: '',
    error: '',
  });

  return (
    <>
      <form
        ref={formRef}
        action={(formData) => {
          if (!formData.get('query')) return;

          formRef.current?.reset();
          formAction(formData);
        }}
      >
        <FormContent />
      </form>

      {!!formState.data && (
        <div className="mt-4">
          <p className="font-semibold">Result:</p>
          <p>{formState.data}</p>
        </div>
      )}

      {!!formState.error && (
        <div className="mt-4">
          <p className="font-semibold">Error:</p>
          <p>{formState.error}</p>
        </div>
      )}
    </>
  );
};

export default HyperQuery;
