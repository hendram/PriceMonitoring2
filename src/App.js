import React, { useState } from "react";

export default function App() {
  const [names, setNames] = useState(["jane", "john", "james"]);

  return (
    <div className="App">
      <button
        onClick={() =>
          setNames((names) => names.filter((_, i) => i !== names.length - 1))
        }
      >
        delete
      </button>
      <div>{names.join(", ")}</div>
    </div>
  );
}

