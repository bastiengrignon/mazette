import loadable from '@loadable/component';
import React, { useEffect } from 'react';

import { staticImgFolder } from '../../constants';
import { IText, TextService, TextType } from '../../services';

const Image = loadable(() => import('../../components/Image'));
const FormattedText = loadable(() => import('../../components/Admin/FormattedText'));

const Home: React.FC = () => {
  const [text, setText] = React.useState<IText>();

  useEffect(() => {
    TextService.getByTextType(TextType.info).then(setText);
  }, []);

  return (
    <div className="page-content mt-0 sm:mt-10 2xl:mt-5">
      <div className="font-avenirBL">
        {text?.isShowed && <FormattedText textType={TextType.info} skeletonRows={1} />}
      </div>
      {text?.isShowed && <hr className="my-3 sm:my-10" />}
      <div className="flex md:inline-flex flex-col md:flex-row items-center justify-center">
        <Image src={`${staticImgFolder}/transat`} alt="Transat" className="flex-none h-24 md:h-32 w-auto" />
        <div className="text-base md:text-xl lg:text-2xl text-justify w-full md:w-2/3">
          <FormattedText textType={TextType.home} />
        </div>
        <Image src={`${staticImgFolder}/transat`} alt="Transat" className="flex-none h-24 md:h-32 w-auto" />
      </div>
    </div>
  );
};

export default Home;
