import { ReactElement } from "react";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  date: string;
  author: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    date: "10 Aug 2016",
    author: "demongo",
    title: "Pourquoi vous ne devriez pas aller dans l'industrie",
    description:
      "Découvrez les raisons pour lesquelles choisir le secteur de la menuiserie aluminium et PVC peut transformer vos projets de rénovation.",
    image: "/images/Blog/blog3.jpg",
    link: "/blog/1",
  },
  {
    id: "2",
    date: "10 Aug 2016",
    author: "AARON",
    title: "Sept doutes que vous devriez clarifier à propos de",
    description:
      "Explorez les questions essentielles concernant l'industrie de la menuiserie aluminium et PVC pour prendre des décisions éclairées.",
    image: "/images/Blog/blog2.jpg",
    link: "/blog/2",
  },
  {
    id: "3",
    date: "10 Aug 2016",
    author: "AARON",
    title: "Sept doutes que vous devriez clarifier à propos de",
    description:
      "Explorez les questions essentielles concernant l'industrie de la menuiserie aluminium et PVC pour prendre des décisions éclairées.",
    image: "/images/Blog/blog.jpg",
    link: "/blog/3",
  },
];

const Blog = (): ReactElement => {
  const extendedBlogPosts = blogPosts.length <= 3 
    ? [...blogPosts, ...blogPosts, ...blogPosts].slice(0, Math.max(3, blogPosts.length * 3))
    : blogPosts;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="section-full content-inner section-bg-image bg-pattern-1"
    >
      <div className="container">
        <div className="section-head style2 text-center">
          <h2 className="title">Latest blog post</h2>
          <p>
            Explorez nos dernières actualités, conseils et tendances dans le
            domaine de la menuiserie aluminium et PVC. Restez informé avec nos
            articles détaillés et inspirants.
          </p>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 3,
            }
          }}
        >
          {extendedBlogPosts.map((post, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="blog-post post-style-2">
                  <div className="dlab-post-media dlab-img-effect">
                    <a href={post.link}>
                      <img src={post.image} alt={post.title} />
                    </a>
                  </div>
                  <div className="dlab-post-info">
                    <div className="dlab-post-meta">
                      <ul>
                        <li className="post-date">
                          <strong>{post.date.split(" ")[0]}</strong>{" "}
                          <span>{post.date.split(" ")[1]}</span>
                        </li>
                        <li className="post-author">
                          By <a href={post.link}>{post.author}</a>
                        </li>
                      </ul>
                    </div>
                    <div className="dlab-post-title">
                      <h4 className="post-title">
                        <a href={post.link}>{post.title}</a>
                      </h4>
                    </div>
                    <p>{post.description}</p>
                    <div className="dlab-post-readmore">
                      <Link to={post.link} className="site-button btnhover20">
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Blog;
