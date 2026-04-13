function createGrid(n) {
  if (n < 1 || n > 100) {
    alert(
      "No. of rows and columns should be in range [1, 100]. Falling back to default value 16.",
    );
    n = 16;
  }
  const container = document.querySelector("#grid-container");

  document.querySelectorAll(".grid-row").forEach((row) => row.remove());

  for (let i = 0; i < n; i++) {
    const gridRow = document.createElement("div");

    gridRow.classList.add("grid-row");
    gridRow.setAttribute(
      "style",
      "display: flex; flex-direction: row; flex: 1;",
    );

    for (let j = 0; j < n; j++) {
      const gridColumn = document.createElement("div");

      gridColumn.classList.add("grid-column");
      gridColumn.setAttribute("style", "flex: 1; border: 1px solid black");

      gridRow.appendChild(gridColumn);
    }

    container.appendChild(gridRow);
  }
}

const gridSize = document.querySelector("#grid-size");
gridSize.addEventListener("click", () => {
  createGrid(prompt("Enter No. of rows and columns: ", 16));
});

createGrid(16);
