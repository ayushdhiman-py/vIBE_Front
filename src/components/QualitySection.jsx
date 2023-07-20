import './QualitySection.css';
import { GiClothes } from 'react-icons/gi';
import { BsCashStack } from 'react-icons/bs';
import { MdKeyboardReturn } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
const qualitySection = () => {
  return (
    <div className="quality-wrapper">
      <div className="quality-item">
        <div>
          <span style={{ color: '#8FD4F1' }}>
            <GiClothes size={25}/>
          </span>
          <span className='quality-item-text'>Fashion</span>
        </div>
      </div>
      <div className="quality-item">
        <div>
          <span style={{ color: '#8FD4F1' }}>
            <BsCashStack size={25} />
          </span>
          <span className='quality-item-text'>Secure Payment</span>
        </div>
      </div>
      <div className="quality-item">
        <div>
        <span style={{ color: '#8FD4F1' }}>
          <RiCustomerService2Fill size={25}/>
        </span>
        <span className='quality-item-text'>24 / 7 Support</span>
        </div>
       
      </div>
      <div className="quality-item">
        <div>
        <span style={{ color: '#8FD4F1' }}>
          <MdKeyboardReturn size={25}/>
        </span>
        <span className='quality-item-text'>Easy Return</span>
        </div>
      </div>
    </div>
  );
};

export default qualitySection;
