import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Banner from 'components/banner/banner';

interface BlogPost {
  id: string;
  date: string;
  author: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    date: "10 Aug 2016",
    author: "demongo",
    title: "Pourquoi vous ne devriez pas aller dans l'industrie",
    description: "Découvrez les raisons pour lesquelles choisir le secteur de la menuiserie aluminium et PVC peut transformer vos projets de rénovation.",
    content: `
      <p>La menuiserie aluminium et PVC représente aujourd'hui l'un des secteurs les plus innovants et prometteurs dans le domaine de la construction et de la rénovation. Voici pourquoi ce secteur se démarque :</p>
      
      <h3>1. Innovation et Durabilité</h3>
      <p>Les matériaux modernes comme l'aluminium et le PVC offrent des performances exceptionnelles en termes d'isolation thermique et acoustique. Leur durabilité et leur résistance aux intempéries en font des choix privilégiés pour les constructions contemporaines.</p>
      
      <h3>2. Personnalisation et Esthétique</h3>
      <p>La flexibilité de ces matériaux permet une personnalisation poussée, répondant aux exigences architecturales les plus diverses. Les finitions et les couleurs disponibles sont pratiquement illimitées.</p>
      
      <h3>3. Efficacité Énergétique</h3>
      <p>Les menuiseries modernes contribuent significativement à l'efficacité énergétique des bâtiments, réduisant les coûts de chauffage et de climatisation.</p>
    `,
    image: "/images/Blog/blog3.jpg",
    tags: ["Menuiserie", "Innovation", "Construction"]
  },
  {
    id: "2",
    date: "10 Aug 2016",
    author: "AARON",
    title: "Sept doutes que vous devriez clarifier à propos de",
    description: "Explorez les questions essentielles concernant l'industrie de la menuiserie aluminium et PVC pour prendre des décisions éclairées.",
    content: `
      <p>Dans le domaine de la menuiserie aluminium et PVC, certaines questions reviennent fréquemment. Voici les principaux points à éclaircir :</p>
      
      <h3>1. Durabilité des Matériaux</h3>
      <p>L'aluminium et le PVC sont parmi les matériaux les plus durables du marché, avec une durée de vie pouvant dépasser 30 ans avec un entretien minimal.</p>
      
      <h3>2. Rapport Qualité-Prix</h3>
      <p>Bien que l'investissement initial puisse sembler important, les économies d'énergie et la durabilité des installations en font un choix économiquement avantageux à long terme.</p>
      
      <h3>3. Impact Environnemental</h3>
      <p>Ces matériaux sont recyclables et contribuent à l'efficacité énergétique des bâtiments, réduisant ainsi leur empreinte carbone.</p>
    `,
    image: "/images/Blog/blog2.jpg",
    tags: ["Menuiserie", "Guide", "Conseils"]
  },
  {
    id: "3",
    date: "10 Aug 2016",
    author: "AARON",
    title: "Les dernières innovations en menuiserie",
    description: "Explorez les dernières innovations dans le domaine de la menuiserie aluminium et PVC.",
    content: `
      <p>Le secteur de la menuiserie est en constante évolution, avec des innovations régulières qui améliorent les performances et le confort :</p>
      
      <h3>1. Systèmes Connectés</h3>
      <p>Les nouvelles menuiseries intègrent des systèmes domotiques permettant un contrôle intelligent de l'ouverture et de la ventilation.</p>
      
      <h3>2. Performance Thermique</h3>
      <p>Les dernières technologies permettent d'atteindre des performances thermiques exceptionnelles, dépassant les normes actuelles.</p>
      
      <h3>3. Design Innovant</h3>
      <p>Les nouveaux profils permettent des designs de plus en plus minimalistes tout en maintenant d'excellentes performances.</p>
    `,
    image: "/images/Blog/blog.jpg",
    tags: ["Innovation", "Technologie", "Design"]
  }
];

const BlogDetailsPage = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  if (!post) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div>
      <Banner title={post.title} />
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="section-full content-inner section-bg-image bg-pattern-2"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 m-b30">
            <div className="blog-post blog-single">
              <div className="dlab-post-media dlab-img-effect zoom-slow">
                <img src={post.image} alt={post.title} className="w-100" />
              </div>
              <div className="dlab-post-info">
                <div className="dlab-post-meta">
                  <ul>
                    <li className="post-date">
                      <strong>{post.date.split(" ")[0]}</strong>{" "}
                      <span>{post.date.split(" ")[1]}</span>
                    </li>
                    <li className="post-author">Par {post.author}</li>
                  </ul>
                </div>
                <div className="dlab-post-title">
                  <h2 className="post-title">{post.title}</h2>
                </div>
                <div className="dlab-post-text" dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="dlab-post-tags">
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <a key={index} href="#" className="site-button btnhover20 m-1">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 sticky-top">
            <aside className="side-bar">
              <div className="widget widget_archive">
                <h5 className="widget-title">Articles Récents</h5>
                <ul>
                  {blogPosts.map((otherPost) => (
                    <li key={otherPost.id}>
                      <a href={`/blog/${otherPost.id}`} className={otherPost.id === post.id ? 'active' : ''}>
                        {otherPost.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="widget widget_tag_cloud">
                <h5 className="widget-title">Tags</h5>
                <div className="tagcloud">
                  {Array.from(new Set(blogPosts.flatMap(p => p.tags))).map((tag, index) => (
                    <a key={index} href="#" className="site-button btnhover20 m-1">
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default BlogDetailsPage;
