export function BookPreview({ book }) {
    const { title, listPrice, thumbnail } = book

    const { amount, currencyCode } = listPrice
    return (
        <article className="book-preview">
            <h2> {title}</h2>
            <h4>
                {currencyCode} {amount}
            </h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
        </article>
    )
}
