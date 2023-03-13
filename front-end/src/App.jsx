import React from 'react';
import './App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotesListPage } from './pages/NotesListPage';
import { EditNotePage } from './pages/EditNotePage';
import { CreateNotePage } from './pages/CreateNotePage';
import { ArchivedNotesPage } from './pages/ArchivedNotesPage';
import SimpleSidebar from './components/Navigation/SimpleSidebar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <BrowserRouter>
        <SimpleSidebar>
          <div className="container p-4">
            <Routes>
              <Route path="/" element={<NotesListPage />} />
              <Route path="/edit/:id" element={<EditNotePage />} />
              <Route path="/create" element={<CreateNotePage />} />
              <Route path="/archived" element={<ArchivedNotesPage />} />
            </Routes>
          </div>
        </SimpleSidebar>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
