import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
}

function query() {
    return storageService.query(BOOK_KEY)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        book.id = makeId()
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = { amount: 0, currencyCode: 'USD' }) {
    return { title, listPrice }
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Book 1', { amount: 20, currencyCode: 'USD' }),
            _createBook('Book 2', { amount: 35, currencyCode: 'EUR' }),
            _createBook('Book 3', { amount: 50, currencyCode: 'ILS' }),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = makeId()
    return book
}
