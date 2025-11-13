import { useState } from 'react';
import useApiHandler from './useApiHandler';
import { useReplyInquiryMutation } from '../redux/store';
import { extractErrorMessage } from '../utils/errorHandlers';

/**
 * useReplyForm - Custom hook for managing reply form state
 * 
 * @param {string} defaultSubject - Default subject for the reply
 * @returns {Object} Form state and handlers
 */
const useReplyForm = ( defaultSubject ) => {
  const [ handleMutation ] = useApiHandler();
  const [ replyToInquiry, { isLoading: isReplying } ] = handleMutation(
    useReplyInquiryMutation
  );

  const [ formState, setFormState ] = useState( {
    subject: defaultSubject,
    message: "",
    isSending: false,
    isSent: false,
  } );

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setFormState( prev => ( {
      ...prev,
      [ name ]: value,
      isSent: false,
    } ) );
  };

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setFormState( prev => ( { ...prev, isSending: true } ) );
    await replyToInquiry( id, {
      onSuccess: () => "Deleted successfully",
      onError: ( err ) =>
        extractErrorMessage( err, "Failed to delete the product. Please try again" )
    } );
    // Simulate API call
    setTimeout( () => {
      setFormState( prev => ( {
        ...prev,
        isSending: false,
        isSent: true,
        message: "",
      } ) );
    }, 1500 );
  };

  const resetForm = () => {
    setFormState( prev => ( {
      ...prev,
      isSent: false,
      subject: defaultSubject,
    } ) );
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    resetForm, isReplying
  };
};

export default useReplyForm;