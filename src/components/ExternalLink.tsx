import React from 'react';

const isValidExternalLink = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

export type ExternalLinkProps = React.HTMLProps<HTMLLinkElement>;

export const ExternalLink = (props: ExternalLinkProps) => {
  if (isValidExternalLink(props.href ?? '')) {
    return (
      <a {...(props as any)} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  } else return <>"Invalid external URL."</>;
};
