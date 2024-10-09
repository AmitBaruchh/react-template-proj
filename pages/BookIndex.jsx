import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService
            .query()
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!books) return <div>Loading..</div>
    return (
        <section className="book-index">
            <BookList books={books} />
        </section>
    )
}
