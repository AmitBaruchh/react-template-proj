import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'

const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
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

    function onSelectBook(bookId) {
        bookService.getById(bookId).then(setSelectedBook)
    }

    function onUpdateBook(bookToSave) {
        bookService.save(bookToSave).then(savedBook => {
            setSelectedBook(savedBook)
            setIsEdit(false)
            setBooks(prevBooks => prevBooks.map(book => (book.id === savedBook.id ? savedBook : book)))
        })
    }

    if (!books) return <div>Loading..</div>
    return (
        <main className="book-index">
            {!selectedBook && (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    {!!books.length && (
                        <BookList books={books} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />
                    )}
                    {!books.length && <div> No Books found...</div>}
                </React.Fragment>
            )}

            {selectedBook && (
                <section>
                    {isEdit ? (
                        <BookEdit book={selectedBook} onUpdate={onUpdateBook} onCancelEdit={() => setIsEdit(false)} />
                    ) : (
                        <BookDetails
                            book={selectedBook}
                            onBack={() => setSelectedBook(null)}
                            onEdit={() => setIsEdit(true)}
                        />
                    )}
                </section>
            )}
        </main>
    )
}
