import { useNote } from "./NoteLayout";
import { Badge, Row, Col, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Note = () => {
  const note = useNote();

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-secondary">Delete</Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </>
  );
};
