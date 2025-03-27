import { useState } from 'react';

/**
 * useReplyForm - Custom hook for managing reply form state
 * 
 * @param {string} defaultSubject - Default subject for the reply
 * @returns {Object} Form state and handlers
 */
const useReplyForm = (defaultSubject) => {
  const [formState, setFormState] = useState({
    subject: defaultSubject,
    message: "",
    isSending: false,
    isSent: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      isSent: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSending: true }));

    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({
        ...prev,
        isSending: false,
        isSent: true,
        message: "",
      }));
    }, 1500);
  };

  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      isSent: false,
      subject: defaultSubject,
    }));
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useReplyForm;