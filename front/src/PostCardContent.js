import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ content }) => (
  <div>
    {content.split(/(#[^\s]+)/g).map((t, i) => {
      if (t.match(/#[^\s]+/)) {
        return (
          <Link
            href={{ pathname: '/hashtag', query: { tag: t.slice(1) } }}
            as={`/hashtag/${t.slice(1)}`}
            key={t.slice(1) + String(i)}
          >
            {t}
          </Link>
        );
      }
      return t;
    })}
  </div>
);

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
