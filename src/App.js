import React, {useState, useEffect} from 'react';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState('everything');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
    try {
      
        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=oBbosWF3D5w2uUk8s6M8sTNLGvC2OEDa`);
        const articles = await res.json();
        console.log(articles);
        setArticles(articles.response.docs);
    } catch (error) {
      console.log(error);
    }
  }

    fetchArticles();
  }, [])

  return (
    <>
      <section>
        {articles.map((article) => {
          const {abstract, headline: { main }, byline: { original }, lead_paragraph, news_desk, section_name, web_url, _id, word_count} = article;

          return (
            <article key={_id}>
              <h2>{main}</h2>
              <p>{abstract}</p>
              <a href={web_url} target="_blank">Web Resource</a>
              <p>{lead_paragraph}</p>

              <ul>
                <li>{original}</li>
                <li>{news_desk}</li>
                <li>{section_name}</li>
                <li>{word_count}</li>
              </ul>
            </article>
          )
        })}
      </section>
    </>
  );
}

export default App;
