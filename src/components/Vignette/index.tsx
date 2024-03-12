import loadable from '@loadable/component';
import { Modal, Skeleton } from 'antd';
import React, { useState } from 'react';

import { AdvancedImage, lazyload } from '@cloudinary/react';
import { cloudinary } from '../../index';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { IMovie, IMusic } from '../../services';

const Link = loadable(() => import('../Link'));

const vignetteCSS =
  'w-11/12 sm:w-7/8 md:w-3/4 h-auto mx-auto cursor-pointer transform transition duration-300 hover:scale-110';

interface VignetteProps<MediaType extends IMovie | IMusic> {
  type: 'music' | 'movie';
  properties: MediaType;
  loading: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Vignette: React.FC<VignetteProps<any>> = ({ properties, ...props }) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  const isMusic = (): boolean => (properties as IMusic).name !== undefined;
  const publicImgId = (): string => (isMusic() ? properties.image : properties.imgThumbnail);
  const altImgName = (): string => (isMusic() ? properties.name : properties.title);

  const formattedModalTitle = (): React.ReactNode => (
    <div className="font-semibold uppercase text-xl sm:text-2xl">
      {isMusic() ? (
        <span>{properties.name}</span>
      ) : (
        <span>
          {properties.title}
          <span className="text-sm sm:text-base italic lowercase"> de {properties.author}</span>
        </span>
      )}
    </div>
  );

  return (
    <>
      {props.loading ? (
        <Skeleton.Avatar active={true} size="large" className="mx-auto" />
      ) : props.type === 'music' ? (
        <div className={`relative ${vignetteCSS}`} onClick={() => setVisibility(true)}>
          <AdvancedImage
            cldImg={cloudinary.image(properties.image)}
            alt={properties.name}
            plugins={[lazyload({ threshold: 0.5 })]}
          />
          <div className="fixed top-0 h-full w-full opacity-0 hover:opacity-100">
            <div className="flex justify-center items-center h-full">
              <span className="w-full font-medium bg-green text-white text-center text-base sm:text-2xl md:text-3xl lg:text-5xl py-2">
                {properties.name}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={`relative ${vignetteCSS}`} onClick={() => setVisibility(true)}>
          <AdvancedImage
            plugins={[lazyload({ threshold: 0.5 })]}
            cldImg={cloudinary.image(properties.imgThumbnail)}
            alt={`${properties.title} ${properties.author}`}
            className="w-full h-full"
          />
        </div>
      )}
      <Modal
        open={visibility}
        onCancel={() => setVisibility(false)}
        footer={null}
        title={formattedModalTitle()}
        centered={true}>
        <div className="text-xl">
          {isMusic() ? `${properties.type}` : `${properties.location}, ${properties.duration} (${properties.date})`}
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-6 sm:col-span-6 md:col-span-2 flex justify-center my-2 md:my-0">
            <AdvancedImage
              plugins={[lazyload({ threshold: 0.5 })]}
              cldImg={cloudinary.image(publicImgId()).resize(fill().width(250).height(250))}
              alt={altImgName()}
              className="rounded"
            />
          </div>
          <div className="col-span-6 sm:col-span-6 md:col-span-4 mx-2 text-base sm:text-lg overflow-y-auto">
            {properties.description}
            {properties.videoLink && (
              <span>
                <br />
                <br />
                {isMusic() ? 'Pour les curieux c’est ici 👇🏼' : 'Bande annonce'} : <br />
                <Link src={properties.videoLink} />
              </span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Vignette;
