import React from "react";

interface HTMLRendererProps {
  content: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ content }) => {
  return (
    <div
      className="2xl:px-52 lg:px-20 md:px-4"
      dangerouslySetInnerHTML={{ __html: content }} // Be cautious with this
    />
  );
};

export default HTMLRenderer;
