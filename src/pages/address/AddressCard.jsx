import React from 'react'

const AddressCard = ({firstName,lastName,phoneNumber,street,town,state,country,zipCode}) => {
  return (
    <div className="p-4 border rounded-lg w-full flex-shrink-0">
    <p className="font-medium">{`${firstName} ${lastName}`}</p>
    <p className="text-sm text-gray-600">{`${street}, ${town}`}</p>
    <p className="text-sm text-gray-600">{`${state}, ${country}, ${zipCode}`}</p>
    <p className="text-sm text-gray-600">{phoneNumber}</p>
  </div>
  
  )
}

export default AddressCard
