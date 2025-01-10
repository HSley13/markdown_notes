import { Note } from "./NoteForm";
import {
  useOutletContext,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

type NoteLayoutProps = {
  notes: Note[];
};

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export const useNote = () => {
  return useOutletContext<Note>();
};
