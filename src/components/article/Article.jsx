import '../../App.css'
import './Article.css'
import parce from 'react-html-parser'

function Article({article, ...props}) {

    return (
        <div className="ctn">
            <div className="article-reader">
                <div className="article-info">
                    <p className="author main-text">{article.user_name}</p>
                    <p className="date main-text">{article.date.replaceAll('-', '.')}</p>
                </div>
                <div
                    className={['article-visual', 'article-visual-' + article.theme].join(' ')}>
                    {parce(`<h1>${article.title}</h1>` + article.description.replaceAll('subtitle', 'h2').replaceAll('main', 'p'))}</div>
            </div>
        </div>
    )
}

export default Article