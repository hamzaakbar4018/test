/* eslint-disable react/prop-types */
import '../../CSS/Card.css'; // Adjusted path

const Card = ({ title, price }) => {
  return (
    <div className='h-[120px] w-[120px] ml-8 flex flex-col gap-4 justify-center items-start '>
      <h3 className='title'>{title}</h3>
      <h1 className='price text-2xl font-bold'>{price}</h1>
    </div>
  );
}

export default Card;
