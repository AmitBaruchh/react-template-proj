import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        loadBook()
    }, [filterBy])

    function loadBook() {
        bookService
            .query(filterBy)
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

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    if (!books) return <div>Loading..</div>
    return (
        <main className="book-index">
            <React.Fragment>
                <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                {!!books.length && <BookList books={books} onRemoveBook={onRemoveBook} />}
                {!books.length && <div> No Books found...</div>}
            </React.Fragment>
        </main>
    )
}
