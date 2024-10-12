const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

const { useEffect, useState } = React

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
                showErrorMsg('Failed to load the book details')
            })
    }

    function onBack() {
        navigate('/book')
    }

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
    const publicationType = bookService.getPublicationType(publishedDate)
    const bookLanguage = bookService.getBookLng(language)
    const priceClass = amount > 150 ? 'price-red' : amount < 20 ? 'price-green' : ''

    return (
        <section className="book-details">
            <div className="book-details-titles">
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </div>
            <div className="book-details-content">
                <div className="text-content">
                    <h4>
                        Price:
                        <span className={priceClass}>
                            {' '}
                            {currencyCode} {amount}
                        </span>
                        {isOnSale && <span>(On Sale!)</span>}
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
                        <p>{`${publishedDate} - ${publicationType}`}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Language:</h5>
                        <p>{bookLanguage}</p>
                    </div>
                </div>
                <img src={thumbnail} alt={`Cover of ${title}`} />
            </div>
            <div className="book-details-button">
                <button onClick={onBack}>⬅ Back</button>
                {/* <button className="on-edit-btn" onClick={onEdit}>
                    Edit ➡
                </button> */}
            </div>
        </section>
    )
}
