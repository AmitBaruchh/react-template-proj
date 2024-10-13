import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { AddGoogleBook } from '../cmps/AddGoogleBook.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadBook()
    }, [filterBy])

    function loadBook() {
        bookService
            .query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Failed to load the books')
            })
            .finally(() => setIsLoading(false))
    }

    function onRemoveBook(bookId) {
        bookService
            .remove(bookId)
            .then(() => setBooks(books => books.filter(book => book.id !== bookId)))
            .then(() => showSuccessMsg('Book removed successfully'))
            .catch(err => {
                console.log('Problems removing book', err)
                showErrorMsg(`Problems removing book ${bookId}`)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onSetBooks(newBook) {
        setBooks(prevBooks => [...prevBooks, newBook])
    }

    if (isLoading) return <div>Loading..</div>
    if (!books || !books.length) {
        showErrorMsg('No books found for the given filter')
        return <div> No Books found...</div>
    }
    return (
        <main className="book-index">
            <React.Fragment>
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <AddGoogleBook onSetBooks={onSetBooks} />
                {!!books.length && <BookList books={books} onRemoveBook={onRemoveBook} />}
                {!books.length && <div> No Books found...</div>}
            </React.Fragment>
        </main>
    )
}
