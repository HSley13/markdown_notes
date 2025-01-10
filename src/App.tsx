import { Routes, Route, Navigate } from "react-router-dom";
import { Note } from "./components/Note";
import { Container } from "react-bootstrap";
import { NewNote } from "./components/NewNote";
import { Tag, NoteData, RawNote } from "./components/NoteForm";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";

function App() {
  const [Notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS ", []);

  const noteWithTags = useMemo(() => {
    return Notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [Notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        {
          ...data,
          id: crypto.randomUUID(),
          tagIds: tags.map((tag) => tag.id),
        },
        ...prevNotes,
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={noteWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
