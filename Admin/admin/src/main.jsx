import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookingForm from "./components/BookingForm.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingForm />
  </StrictMode>,
)

