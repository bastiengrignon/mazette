import { Skeleton } from 'antd';
import sanitizeHtml from 'sanitize-html';
import React, { useEffect, useState } from 'react';

import { IText, TextService, TextType } from '../../../services';

interface FormattedTextProps {
  textType: TextType;
  skeletonRows?: number;
}

const sanitizeConfig = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
  transformTags: {
    a: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        href: attribs.href,
        target: '_blank',
        class: 'link',
      },
    }),
    ul: sanitizeHtml.simpleTransform('ul', { class: 'list-disc' }),
    iframe: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        class: 'absolute inset-0 w-full h-full',
      },
    }),
    h1: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        class: 'text-3xl w-full',
      },
    }),
    h2: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        class: 'text-2xl w-full',
      },
    }),
    h3: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        class: 'text-xl w-full',
      },
    }),
    img: (tagName: string, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        alt: attribs.alt || 'Cloudinary image',
      },
    }),
  },
  allowedAttributes: {
    p: ['style'],
    ul: ['class'],
    a: ['href', 'target', 'alt', 'class'],
    iframe: ['src', 'class', 'allow', 'allowfullscreen'],
    img: ['src', 'alt', 'class', 'width', 'height', 'style'],
    span: ['style'],
    div: ['class', 'style'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  allowedSchemes: ['http', 'https', 'data'],
};

const FormattedText: React.FC<FormattedTextProps> = ({ textType, skeletonRows = 3 }) => {
  const [texts, setTexts] = useState<IText[]>([]);
  const [isTextsLoading, setTextsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTextsLoading(true);
    TextService.getAll()
      .then(setTexts)
      .finally(() => setTextsLoading(false));
  }, []);

  return (
    <>
      {texts
        .filter((value) => value.type === textType)
        .map((text, key) => {
          const sanitizedHTML = sanitizeHtml(text.text, sanitizeConfig).replaceAll(
            /<iframe(.+)<\/iframe>/g,
            '<div class="aspect-w-16 aspect-h-9 relative">$&</div>'
          );
          return (
            <Skeleton key={key} loading={isTextsLoading} active={true} paragraph={{ rows: skeletonRows }}>
              <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            </Skeleton>
          );
        })}
    </>
  );
};
export default FormattedText;
