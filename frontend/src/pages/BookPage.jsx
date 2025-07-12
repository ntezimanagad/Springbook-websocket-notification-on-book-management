import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectWebSocket, disconnectWebSocket } from "../utils/websocket";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", yearPublished: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
  const client = connectWebSocket({
    onBookReceived: (book) => {
      setBooks((prev) => [book, ...prev]);
    }
  });

  return () => {
    if (client) disconnectWebSocket();
  };
}, []);


  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books/getBook");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:8080/api/books/update/${editingId}`, form);
    } else {
      await axios.post("http://localhost:8080/api/books/create", form);
    }
    setForm({ title: "", author: "", yearPublished: "" });
    setEditingId(null);
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditingId(book.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/books/${id}`);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h2>Books</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={form.yearPublished}
          onChange={(e) => setForm({ ...form, yearPublished: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Book</button>
      </form>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author} ({book.yearPublished})
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookPage;
