import { useEffect, useState } from 'react'
import '../../App.css'
import './Article.css'
import parce from 'react-html-parser'
import { getPhotos } from '../actions'

function Article({article, ...props}) {

    const [zip, setZip] = useState ();
    
    useEffect(() => {
        const fun = async () => {
            const newZip = await getPhotos(article.title);
            setZip(newZip.data)
        }
        fun()
    }, [])

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