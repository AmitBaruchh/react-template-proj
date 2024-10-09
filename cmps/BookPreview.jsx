export function BookPreview({ book }) {
    const { title, listPrice } = book

    const { amount, currencyCode } = listPrice
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>
                Price: {currencyCode} {amount}
            </h4>
        </article>
    )
}
