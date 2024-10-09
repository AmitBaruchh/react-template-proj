import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)

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

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => setBooks(books => books.filter(book => book.id !== bookId)))
            .catch(err => console.log('err:', err))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading..</div>
    return (
        <section className="book-index">
            {!selectedBookId ? (
                <BookList onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} books={books} />
            ) : (
                <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
            )}
        </section>
    )
}
