import { bookService } from '../services/book.service.js'

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService
            .get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }, [])

    if (!book) return <div>Loading...</div>

    const {
        title,
        subtitle,
        authors,
        description,
        pageCount,
        categories,
        publishedDate,
        language,
        listPrice,
        thumbnail,
    } = book
    const { amount, currencyCode, isOnSale } = listPrice

    const readingType = bookService.getReadingType(pageCount)

    return (
        <section className="book-details">
            <div className="book-details-titles">
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </div>
            <div className="book-details-content">
                <div className="text-content">
                    <h4>
                        Price: {currencyCode} {amount} {isOnSale && <span>(On Sale!)</span>}
                    </h4>
                    <div className="detail-item">
                        <h5>Authors:</h5>
                        <p>{authors.join(', ')}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Description:</h5>
                        <p>{description}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Page Count:</h5>
                        <p>
                            {pageCount} pages - {readingType}
                        </p>
                    </div>
                    <div className="detail-item">
                        <h5>Categories:</h5>
                        <p>{categories.join(', ')}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Published Date:</h5>
                        <p>{publishedDate}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Language:</h5>
                        <p>{language}</p>
                    </div>
                </div>
                <img src={thumbnail} alt={`Cover of ${title}`} />
            </div>
            <div className="book-details-button">
                <button onClick={onBack}>Back</button>
            </div>
        </section>
    )
}
