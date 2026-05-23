import { Helmet } from 'react-helmet-async';

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://office-aynal.netlify.app';

function Seo({
  title = 'Aynal Haque | MERN Stack Developer',
  description = 'Full-stack MERN developer portfolio featuring projects, skills, and contact information.',
  noindex = false,
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aynal Haque',
    jobTitle: 'MERN Stack Developer',
    url: siteUrl,
    email: 'mailto:aynalhaque7411@gmail.com',
    knowsAbout: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

export default Seo;
