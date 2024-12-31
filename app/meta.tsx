// app/meta.tsx
interface MetaProps {
  title: string;
  description: string;
  ogDescription: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, ogDescription }) => {
  return (
   <>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta property="og:title" content={title} />
   <meta property="og:description" content={ogDescription} />
   <meta property="og:image" content="/path-to-your-image.jpg" />
   </>

  );
};

export default Meta;
