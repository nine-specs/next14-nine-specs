import IconButton from '@/common/IconButton';
import plus from '../../public/images/Plus_icon.svg';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <h1 className=''>page Component</h1>
      <IconButton size='md' color='black' type='submit'>
        <Image src={plus} alt='플러스 버튼 이미지' />
      </IconButton>
    </>
  );
}
