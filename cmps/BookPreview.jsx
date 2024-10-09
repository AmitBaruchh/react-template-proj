import { bookService } from '../services/book.service.js'

export function BookPreview({ book }) {
    const { title, listPrice, thumbnail, pageCount } = book
    const { amount, currencyCode } = listPrice

    const readingType = bookService.getReadingType(pageCount)

    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <h4>
                {currencyCode} {amount}
            </h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
            <p>{readingType}</p>
        </article>
    )
}
