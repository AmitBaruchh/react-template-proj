import { bookService } from '../services/book.service.js'

export function BookPreview({ book }) {
    const { title, listPrice, thumbnail, pageCount, publishedDate } = book
    const { amount, currencyCode } = listPrice

    const readingType = bookService.getReadingType(pageCount)
    const publicationType = bookService.getPublicationType(publishedDate)

    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <h4>
                {currencyCode} {amount}
            </h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
            <p>{readingType}</p>
            <p>{publicationType}</p>
        </article>
    )
}
